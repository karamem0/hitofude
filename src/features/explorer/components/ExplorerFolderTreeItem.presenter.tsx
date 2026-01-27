//
// Copyright (c) 2023-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { css } from '@emotion/react';
import { Caption1 } from '@fluentui/react-components';
import { Folder16Regular } from '@fluentui/react-icons';
import { useIntl } from 'react-intl';
import TreeItem from '../../../common/components/TreeItem';
import { EventHandler } from '../../../types/Event';
import { Folder } from '../../../types/Model';
import messages from '../messages';
import ExplorerFolderMenu from './ExplorerFolderMenuList';

interface ExplorerFolderTreeItemProps {
  selectedFolder?: Folder,
  onClick?: EventHandler<Folder>
}

function ExplorerFolderTreeItem(props: Readonly<ExplorerFolderTreeItemProps>) {

  const {
    selectedFolder,
    onClick
  } = props;

  const intl = useIntl();

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
      title={(
        <div
          css={css`
            display: flex;
            flex-direction: column;
          `}>
          <Caption1
            css={css`
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            `}>
            {intl.formatMessage(messages.Name)}: {folder.name}
          </Caption1>
          <Caption1>
            {intl.formatMessage(messages.LastModified)}: {intl.formatDate(folder.updatedDate, {
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              month: '2-digit',
              year: 'numeric'
            })}
          </Caption1>
        </div>
      )}
      onClick={(event) => onClick?.(event, folder)} />
  ));

}

export default React.memo(ExplorerFolderTreeItem);
