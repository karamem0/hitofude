//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { useDropzone } from 'react-dropzone';
import { FormattedMessage, useIntl } from 'react-intl';

import { Button, Caption1 } from '@fluentui/react-components';
import { AddIcon } from '@fluentui/react-icons-mdl2';

import { css } from '@emotion/react';

import TreeHeader from '../../../common/components/TreeHeader';
import { useTheme } from '../../../providers/ThemeProvider';
import { EventHandler } from '../../../types/Event';
import {
  DialogAction,
  DialogType,
  File,
  Folder
} from '../../../types/Model';
import { isEmpty } from '../../../utils/Folder';
import messages from '../messages';
import { DropEventData } from '../types/Event';

import ExplorerFileTreeItem from './ExplorerFileTreeItem';
import ExplorerFolderTreeItem from './ExplorerFolderTreeItem';
import ExplorerHeaderMenuButton from './ExplorerHeaderMenuButton';

interface ExplorerTabItemProps {
  allFiles?: boolean,
  fileConflicts?: File[],
  selectedFolder?: Folder,
  onDownloadFile?: EventHandler<File>,
  onDropFiles?: EventHandler<DropEventData>,
  onOpenDialog?: EventHandler<DialogAction>,
  onSelectFile?: EventHandler<string>,
  onSelectFolder?: EventHandler<string>
}

function ExplorerTabItem(props: Readonly<ExplorerTabItemProps>) {

  const {
    allFiles,
    selectedFolder,
    onDropFiles,
    onOpenDialog,
    onSelectFile,
    onSelectFolder
  } = props;

  const intl = useIntl();
  const { theme } = useTheme();
  const {
    isDragActive,
    getRootProps,
    getInputProps
  } = useDropzone({
    maxSize: 250 * 1024 * 1024,
    noClick: true,
    onDrop: (acceptedFiles, rejectedFiles, event) => onDropFiles?.(event, {
      acceptedFiles,
      rejectedFiles
    })
  });

  return selectedFolder ? (
    <div
      css={css`
        display: grid;
        grid-template-rows: 1rem 2rem calc(100svh - 10.5rem) 2rem;
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
        name={selectedFolder.parentId ? selectedFolder.name : intl.formatMessage(messages.RootFolder)}
        root={selectedFolder.parentId == null}
        menu={(
          <ExplorerHeaderMenuButton />
        )}
        onClick={(event) => onSelectFolder?.(event, selectedFolder?.parentId)} />
      <div
        {...getRootProps()}
        css={css`
          position: relative;
        `}>
        <input {...getInputProps()} />
        <div
          role="table"
          css={css`
            display: flex;
            flex-direction: column;
            grid-gap: 0.25rem;
            overflow: hidden auto;
          `}>
          {
            isEmpty(selectedFolder, allFiles) ? (
              <Caption1
                css={css`
                  text-align: center;
                `}>
                <FormattedMessage {...messages.NoItemsFound} />
              </Caption1>
            ) : (
              <React.Fragment>
                <ExplorerFolderTreeItem onClick={(event, data) => onSelectFolder?.(event, data?.id)} />
                <ExplorerFileTreeItem onClick={(event, data) => onSelectFile?.(event, data?.id)} />
              </React.Fragment>
            )
          }
        </div>
        {
          isDragActive ? (
            <div
              css={css`
                position: absolute;
                top: 0;
                left: 0;
                z-index: 1000;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 100%;
                padding: 1rem;
                text-align: center;
                background-color: ${theme.colorNeutralBackgroundAlpha};
                border: 2px dotted ${theme.colorBrandForegroundLink};
              `}>
              {
                <FormattedMessage {...messages.DragDropFile} />
              }
            </div>
          ) : null
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
          onClick={(event) => onOpenDialog?.(event, {
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
