//
// Copyright (c) 2023-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { File, Folder } from '../../../types/Model';
import { DocumentOnePage16Regular } from '@fluentui/react-icons';
import { EventHandler } from '../../../types/Event';
import ExplorerFileConflictButton from './ExplorerFileConflictButton';
import ExplorerFileMenuList from './ExplorerFileMenuList';
import TreeItem from '../../../common/components/TreeItem';
import { isMarkdown } from '../../../utils/File';

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

  return selectedFolder?.files?.filter((file) => (allFiles ?? false) || isMarkdown(file)).map((file) => (
    <TreeItem
      key={file.id}
      name={file.fullName}
      selected={selectedFile?.id === file.id}
      icon={(
        <DocumentOnePage16Regular />
      )}
      info={(
        <ExplorerFileConflictButton file={file} />
      )}
      menu={(
        <ExplorerFileMenuList file={file} />
      )}
      onClick={(event) => onClick?.(event, file)} />
  ));

};

export default React.memo(ExplorerFileTreeItem);
