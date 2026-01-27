//
// Copyright (c) 2023-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { css } from '@emotion/react';
import { Button, Text, Tooltip } from '@fluentui/react-components';
import { Add16Regular } from '@fluentui/react-icons';
import { useDropzone } from 'react-dropzone';
import { FormattedMessage, useIntl } from 'react-intl';
import Tree from '../../../common/components/Tree';
import TreeHeader from '../../../common/components/TreeHeader';
import { useTheme } from '../../../providers/ThemeProvider';
import { layouts } from '../../../themes/Layout';
import { EventHandler } from '../../../types/Event';
import { File, Folder } from '../../../types/Model';
import { isEmpty } from '../../../utils/Folder';
import messages from '../messages';
import { DropEventData } from '../types/Event';
import ExplorerFileTreeItem from './ExplorerFileTreeItem';
import ExplorerFolderTreeItem from './ExplorerFolderTreeItem';
import ExplorerHeaderMenuList from './ExplorerHeaderMenuList';

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
  const { theme } = useTheme();
  const {
    getInputProps,
    getRootProps,
    isDragActive
  } = useDropzone({
    accept: {
      'text/markdown': [ '.md' ]
    },
    maxSize: 250 * 1024 * 1024,
    noClick: true,
    onDrop: (acceptedFiles, rejectedFiles) => onDropFiles?.({}, {
      acceptedFiles,
      rejectedFiles
    })
  });

  return selectedFolder ? (
    <div
      css={css`
        display: grid;
        grid-template-rows: 1rem 2rem calc(${layouts.appTab.height} - 5.5rem) 2rem;
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
        tabIndex={-1}
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
        <Tooltip
          content={intl.formatMessage(messages.NewFile)}
          relationship="label">
          <Button
            appearance="outline"
            icon={(
              <Add16Regular />
            )}
            onClick={onCreateFile}>
            <FormattedMessage {...messages.NewFile} />
          </Button>
        </Tooltip>
      </div>
    </div>
  ) : null;

}

export default React.memo(ExplorerTabPanel);
