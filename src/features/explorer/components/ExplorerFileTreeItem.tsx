//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { EventHandler } from '../../../types/Event';
import { File } from '../../../types/Model';
import Presenter from './ExplorerFileTreeItem.presenter';
import { useStore } from '../../../providers/StoreProvider';

interface ExplorerFileTreeItemProps {
  onClick?: EventHandler<File>
}

function ExplorerFileTreeItem(props: Readonly<ExplorerFileTreeItemProps>) {

  const { onClick } = props;

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

export default ExplorerFileTreeItem;
