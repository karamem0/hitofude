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
import { FolderHorizontalIcon } from '@fluentui/react-icons-mdl2';
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

  return (
    <React.Fragment>
      {
        selectedFolder?.folders?.map((folder) => (
          <TreeItem
            key={folder.id}
            name={folder.name}
            icon={(
              <FolderHorizontalIcon
                css={css`
                font-size: 1rem;
                line-height: 1rem;
              `} />
            )}
            menu={(
              <ExplorerFolderMenu folder={folder} />
            )}
            onClick={(event) => onClick?.(event, folder)} />
        ))
      }
    </React.Fragment>
  );

}

export default React.memo(ExplorerFolderTreeItem);
