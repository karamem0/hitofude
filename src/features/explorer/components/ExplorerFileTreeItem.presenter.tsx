//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { TextDocumentIcon } from '@fluentui/react-icons-mdl2';

import { css } from '@emotion/react';

import TreeItem from '../../../common/components/TreeItem';
import { EventHandler } from '../../../types/Event';
import { File, Folder } from '../../../types/Model';
import { isSupportedFile } from '../../../utils/File';

import ExplorerFileConflictButton from './ExplorerFileConflictButton';
import ExplorerFileMenuButton from './ExplorerFileMenuButton';

interface ExplorerFileTreeItemProps {
  allFiles?: boolean,
  selectedFile?: File,
  selectedFolder?: Folder,
  onClick?: EventHandler<File>
}

function ExplorerFileTreeItem(props: Readonly<ExplorerFileTreeItemProps>) {

  const {
    allFiles,
    selectedFile,
    selectedFolder,
    onClick
  } = props;

  return (
    <React.Fragment>
      {
        selectedFolder?.files?.filter((file) => (allFiles ?? false) || isSupportedFile(file)).map((file) => (
          <TreeItem
            key={file.id}
            menuEnabled={isSupportedFile(file)}
            name={file.fullName}
            selected={selectedFile?.id === file.id}
            icon={(
              <TextDocumentIcon
                css={css`
                  font-size: 1rem;
                  line-height: 1rem;
                `} />
            )}
            info={(
              <ExplorerFileConflictButton file={file} />
            )}
            menu={(
              <ExplorerFileMenuButton file={file} />
            )}
            onClick={(event) => onClick?.(event, file)} />
        ))
    }
    </React.Fragment>
  );

}

export default React.memo(ExplorerFileTreeItem);
