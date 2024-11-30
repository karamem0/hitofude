//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { EventHandler } from '../../../types/Event';
import ExplorerFolderMenu from './ExplorerFolderMenuList';
import { Folder } from '../../../types/Model';
import { Folder16Regular } from '@fluentui/react-icons';
import TreeItem from '../../../common/components/TreeItem';
import { css } from '@emotion/react';

interface ExplorerFolderTreeItemProps {
  selectedFolder?: Folder,
  onClick?: EventHandler<Folder>
}

function ExplorerFolderTreeItem(props: Readonly<ExplorerFolderTreeItemProps>) {

  const {
    selectedFolder,
    onClick
  } = props;

  return selectedFolder?.folders?.map((folder) => (
    <TreeItem
      key={folder.id}
      name={folder.name}
      icon={(
        <Folder16Regular
          css={css`
          font-size: 1rem;
          line-height: 1rem;
        `} />
      )}
      menu={(
        <ExplorerFolderMenu folder={folder} />
      )}
      onClick={(event) => onClick?.(event, folder)} />
  ));

}

export default React.memo(ExplorerFolderTreeItem);
