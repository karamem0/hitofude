//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { File, Folder } from '../../../types/Model';
import { EventHandler } from '../../../types/Event';
import ExplorerFileConflictButton from './ExplorerFileConflictButton';
import ExplorerFileMenuList from './ExplorerFileMenuList';
import { TextDocumentIcon } from '@fluentui/react-icons-mdl2';
import TreeItem from '../../../common/components/TreeItem';
import { css } from '@emotion/react';
import { isSupportedFile } from '../../../utils/File';

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
            menu={
              isSupportedFile(file) ? (
                <ExplorerFileMenuList file={file} />
              ) : null
            }
            onClick={(event) => onClick?.(event, file)} />
        ))
      }
    </React.Fragment>
  );

}

export default React.memo(ExplorerFileTreeItem);
