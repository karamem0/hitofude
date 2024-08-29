//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { EventHandler } from '../../../types/Event';
import { Folder } from '../../../types/Model';
import Presenter from './ExplorerFolderTreeItem.presenter';
import { useStore } from '../../../providers/StoreProvider';

interface ExplorerFolderTreeItemProps {
  onClick?: EventHandler<Folder>
}

function ExplorerFolderTreeItem(props: Readonly<ExplorerFolderTreeItemProps>) {

  const {
    onClick
  } = props;

  const {
    state: {
      explorerProps
    }
  } = useStore();

  return (
    <Presenter
      {...explorerProps}
      onClick={onClick} />
  );

}

export default ExplorerFolderTreeItem;
