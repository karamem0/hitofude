//
// Copyright (c) 2023-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { FormattedMessage } from 'react-intl';

import { css } from '@emotion/react';
import {
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList
} from '@fluentui/react-components';
import {
  Delete16Regular,
  Link16Regular,
  Rename16Regular
} from '@fluentui/react-icons';
import { GrOnedrive } from 'react-icons/gr';
import { EventHandler } from '../../../types/Event';
import { ExplorerMenuAction, Folder } from '../../../types/Model';
import messages from '../messages';

interface ExplorerFolderMenuListProps {
  folder?: Folder,
  onMenuClick?: EventHandler<ExplorerMenuAction>
}

function ExplorerFolderMenuList(props: Readonly<ExplorerFolderMenuListProps>) {

  const {
    folder,
    onMenuClick
  } = props;

  return folder ? (
    <MenuList>
      <MenuGroup>
        <MenuItem
          key="copyLink"
          icon={(
            <Link16Regular />
          )}
          onClick={(event) => onMenuClick?.(event, {
            data: folder,
            type: 'copyLink'
          })}>
          <FormattedMessage {...messages.CopyLink} />
        </MenuItem>
      </MenuGroup>
      <MenuDivider />
      <MenuGroup>
        <MenuItem
          key="renameFolder"
          icon={(
            <Rename16Regular />
          )}
          onClick={(event) => onMenuClick?.(event, {
            data: folder,
            type: 'renameFolder'
          })}>
          <FormattedMessage {...messages.RenameFolder} />
        </MenuItem>
        <MenuItem
          key="deleteFolder"
          icon={(
            <Delete16Regular />
          )}
          onClick={(event) => onMenuClick?.(event, {
            data: folder,
            type: 'deleteFolder'
          })}>
          <FormattedMessage {...messages.DeleteFolder} />
        </MenuItem>
      </MenuGroup>
      <MenuDivider />
      <MenuGroup>
        <MenuItem
          key="openWithOneDrive"
          icon={(
            <GrOnedrive
              css={css`
                font-size: 1rem;
                line-height: 1rem;
              `} />
          )}
          onClick={(event) => onMenuClick?.(event, {
            data: folder,
            type: 'openWithOneDrive'
          })}>
          <FormattedMessage {...messages.OpenWithOneDrive} />
        </MenuItem>
      </MenuGroup>
    </MenuList>
  ) : null;

}

export default React.memo(ExplorerFolderMenuList);
