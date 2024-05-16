//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { FormattedMessage, useIntl } from 'react-intl';

import { Button, Caption1 } from '@fluentui/react-components';
import {
  AddIcon,
  FolderHorizontalIcon,
  TextDocumentIcon
} from '@fluentui/react-icons-mdl2';

import { css } from '@emotion/react';

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
import TreeHeader from './TreeHeader';
import TreeItem from './TreeItem';

interface ExplorerTabItemProps {
  allFiles?: boolean,
  file?: File,
  folder?: Folder,
  onDownloadFile?: EventHandler<File>,
  onOpenDialog?: EventHandler<DialogAction>,
  onOpenUrl?: EventHandler<string>,
  onRefreshFolder?: EventHandler<Folder>,
  onSelectFile?: EventHandler<File>,
  onSelectFolder?: EventHandler<string>,
  onToggleExploreAllFiles ?: EventHandler<boolean>
}

function ExplorerTabItem(props: Readonly<ExplorerTabItemProps>) {

  const {
    allFiles,
    file,
    folder,
    onDownloadFile,
    onOpenDialog,
    onOpenUrl,
    onRefreshFolder,
    onSelectFile,
    onSelectFolder,
    onToggleExploreAllFiles
  } = props;

  const intl = useIntl();

  return folder ? (
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
      <TreeHeader
        name={folder.parentId ? folder.name : intl.formatMessage(messages.RootFolder)}
        root={folder.parentId == null}
        menu={(
          <ExplorerHeaderMenu
            allFiles={allFiles}
            folder={folder}
            onOpenDialog={onOpenDialog}
            onOpenUrl={onOpenUrl}
            onRefreshFolder={onRefreshFolder}
            onToggleExploreAllFiles={onToggleExploreAllFiles} />
        )}
        onClick={(e) => onSelectFolder?.(e, folder?.parentId)} />
      <div
        role="list"
        css={css`
          display: flex;
          flex-direction: column;
          grid-gap: 0.25rem;
          overflow: hidden auto;
        `}>
        {
          isEmpty(folder, allFiles) ? (
            <Caption1
              css={css`
                text-align: center;
              `}>
              <FormattedMessage {...messages.NoItemsFound} />
            </Caption1>
          ) : (
            <React.Fragment>
              {
                folder.folders?.map((item) => (
                  <TreeItem
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
                folder.files?.filter((item) => (allFiles ?? false) || isSupportedFile(item)).map((item) => (
                  <TreeItem
                    key={item.id}
                    menuEnabled={isSupportedFile(item)}
                    name={item.fullName}
                    selected={file?.id === item.id}
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
                        onDownload={(e) => onDownloadFile?.(e, item)}
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
          icon={(
            <AddIcon
              css={css`
                font-size: 1rem;
                line-height: 1rem;
              `} />
          )}
          onClick={(e) => onOpenDialog?.(e, {
            type: DialogType.createFile,
            data: null
          })}>
          <FormattedMessage {...messages.NewFile} />
        </Button>
      </div>
    </div>
  ) : null;

}

export default React.memo(ExplorerTabItem);
