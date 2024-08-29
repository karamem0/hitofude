//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { Button, Text } from '@fluentui/react-components';
import { File, Folder } from '../../../types/Model';
import { FormattedMessage, useIntl } from 'react-intl';
import { AddIcon } from '@fluentui/react-icons-mdl2';
import { DropEventData } from '../types/Event';
import { EventHandler } from '../../../types/Event';
import ExplorerFileTreeItem from './ExplorerFileTreeItem';
import ExplorerFolderTreeItem from './ExplorerFolderTreeItem';
import ExplorerHeaderMenuList from './ExplorerHeaderMenuList';
import Tree from '../../../common/components/Tree';
import TreeHeader from '../../../common/components/TreeHeader';
import { css } from '@emotion/react';
import { isEmpty } from '../../../utils/Folder';
import messages from '../messages';
import { useDropzone } from 'react-dropzone';
import { useTheme } from '../../../providers/ThemeProvider';

interface ExplorerTabPanelProps {
  allFiles?: boolean,
  fileConflicts?: File[],
  selectedFolder?: Folder,
  onCreateFile?: EventHandler,
  onDropFiles?: EventHandler<DropEventData>,
  onSelectFile?: EventHandler<string>,
  onSelectFolder?: EventHandler<string>
}

function ExplorerTabPanel(props: Readonly<ExplorerTabPanelProps>) {

  const {
    allFiles,
    selectedFolder,
    onCreateFile,
    onDropFiles,
    onSelectFile,
    onSelectFolder
  } = props;

  const intl = useIntl();
  const { theme: { theme } } = useTheme();
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
      <Text
        as="h2"
        css={css`
          padding: 0 0.5rem;
          font-size: ${theme.fontSizeBase200};
          line-height: calc(${theme.lineHeightBase200} * 1.25);
          text-transform: uppercase;
        `}>
        <FormattedMessage {...messages.Explorer} />
      </Text>
      <TreeHeader
        name={selectedFolder.parentId ? selectedFolder.name : intl.formatMessage(messages.RootFolder)}
        root={selectedFolder.parentId == null}
        menu={(
          <ExplorerHeaderMenuList />
        )}
        onClick={(event) => onSelectFolder?.(event, selectedFolder?.parentId)} />
      <div
        {...getRootProps()}
        css={css`
          position: relative;
          display: grid;
        `}>
        <input {...getInputProps()} />
        <Tree disabled={isEmpty(selectedFolder, allFiles)}>
          <ExplorerFolderTreeItem onClick={(event, data) => onSelectFolder?.(event, data?.id)} />
          <ExplorerFileTreeItem onClick={(event, data) => onSelectFile?.(event, data?.id)} />
        </Tree>
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
              <FormattedMessage {...messages.DragDropFile} />
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
          onClick={onCreateFile}>
          <FormattedMessage {...messages.NewFile} />
        </Button>
      </div>
    </div>
  ) : null;

}

export default React.memo(ExplorerTabPanel);
