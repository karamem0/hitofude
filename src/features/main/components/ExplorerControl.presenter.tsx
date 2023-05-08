//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { FormattedMessage, useIntl } from 'react-intl';

import { css } from '@emotion/react';
import { Button, Caption1 } from '@fluentui/react-components';
import {
  AddIcon,
  FolderHorizontalIcon,
  TextDocumentIcon
} from '@fluentui/react-icons-mdl2';

import { EventHandler } from '../../../types/Event';
import {
  DialogAction,
  DialogType,
  File,
  Folder
} from '../../../types/Model';
import { isSupportedFile } from '../../../utils/File';
import { isEmpty } from '../../../utils/Folder';
import messages from '../messages';

import ExplorerFileMenu from './ExplorerFileMenu';
import ExplorerFolderMenu from './ExplorerFolderMenu';
import ExplorerHeaderMenu from './ExplorerHeaderMenu';
import TreeHeaderControl from './TreeHeaderControl';
import TreeItemControl from './TreeItemControl';

interface ExplorerControlProps {
  exploreFile?: File,
  exploreFolder?: Folder,
  includeUnsupportedFiles?: boolean,
  onOpenDialog?: EventHandler<DialogAction>,
  onOpenUrl?: EventHandler<string>,
  onRefreshFolder?: EventHandler<Folder>,
  onSelectFile?: EventHandler<File>,
  onSelectFolder?: EventHandler<string>,
  onToggleIncludeUnsupportedFiles ?: EventHandler<boolean>
}

function ExplorerControl(props: ExplorerControlProps) {

  const {
    exploreFile,
    exploreFolder,
    includeUnsupportedFiles,
    onOpenDialog,
    onOpenUrl,
    onRefreshFolder,
    onSelectFile,
    onSelectFolder,
    onToggleIncludeUnsupportedFiles
  } = props;

  const intl = useIntl();

  return exploreFolder ? (
    <div
      css={css`
        display: grid;
        grid-template-rows: 1rem 2rem calc(100vh - 10.5rem) 2rem;
        grid-template-columns: 1fr;
        grid-gap: 0.5rem;
      `}>
      <Caption1
        css={css`
          padding: 0 0.5rem;
          text-transform: uppercase;
        `}>
        <FormattedMessage {...messages.Explorer} />
      </Caption1>
      <TreeHeaderControl
        disabled={!exploreFolder.parentId}
        name={exploreFolder.parentId ? exploreFolder.name : intl.formatMessage(messages.RootFolder)}
        menu={(
          <ExplorerHeaderMenu
            exploreFolder={exploreFolder}
            includeUnsupportedFiles={includeUnsupportedFiles}
            onOpenDialog={onOpenDialog}
            onOpenUrl={onOpenUrl}
            onRefreshFolder={onRefreshFolder}
            onToggleIncludeUnsupportedFiles={onToggleIncludeUnsupportedFiles} />
        )}
        onClick={(e) => onSelectFolder?.(e, exploreFolder?.parentId)} />
      <div
        role="list"
        css={css`
          display: flex;
          flex-direction: column;
          grid-gap: 0.25rem;
          overflow-x: hidden;
          overflow-y: auto;
        `}>
        {
          isEmpty(exploreFolder, includeUnsupportedFiles) ? (
            <Caption1
              css={css`
                text-align: center;
              `}>
              <FormattedMessage {...messages.NoItemsFound} />
            </Caption1>
          ) : (
            <React.Fragment>
              {
                exploreFolder.folders?.map((item) => (
                  <TreeItemControl
                    key={item.id}
                    name={item.name}
                    icon={(
                      <FolderHorizontalIcon
                        css={css`
                          font-size: 1rem;
                          line-height: 1rem;
                        `} />
                    )}
                    menu={(
                      <ExplorerFolderMenu
                        value={item}
                        onOpenDialog={onOpenDialog}
                        onOpenUrl={onOpenUrl} />
                    )}
                    onClick={(e) => onSelectFolder?.(e, item.id)} />
                ))
              }
              {
                exploreFolder.files?.filter((item) => includeUnsupportedFiles || isSupportedFile(item)).map((item) => (
                  <TreeItemControl
                    key={item.id}
                    menuEnabled={isSupportedFile(item)}
                    name={item.fullName}
                    selected={exploreFile?.id === item.id}
                    icon={(
                      <TextDocumentIcon
                        css={css`
                          font-size: 1rem;
                          line-height: 1rem;
                        `} />
                    )}
                    menu={(
                      <ExplorerFileMenu
                        value={item}
                        onOpenDialog={onOpenDialog}
                        onOpenUrl={onOpenUrl} />
                    )}
                    onClick={(e) => onSelectFile?.(e, item)} />
                ))
              }
            </React.Fragment>
          )
        }
      </div>
      <div
        css={css`
          display: grid;
          padding: 0 0.5rem;
        `}>
        <Button
          appearance="outline"
          aria-label={intl.formatMessage(messages.NewFile)}
          title={intl.formatMessage(messages.NewFile)}
          icon={
            <AddIcon
              css={css`
                font-size: 1rem;
                line-height: 1rem;
              `} />
            }
          onClick={(e) => onOpenDialog?.(e, {
            type: DialogType.createFile,
            payload: null
          })}>
          <FormattedMessage {...messages.NewFile} />
        </Button>
      </div>
    </div>
  ) : null;

}

export default React.memo(ExplorerControl);
