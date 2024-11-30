//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { FormattedMessage } from 'react-intl';

import {
  Delete16Regular,
  Link16Regular,
  Rename16Regular
} from '@fluentui/react-icons';
import { ExplorerMenuAction, Folder } from '../../../types/Model';
import {
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList
} from '@fluentui/react-components';
import { EventHandler } from '../../../types/Event';
import { SiMicrosoftonedrive } from 'react-icons/si';
import { css } from '@emotion/react';
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
            type: 'copyLink',
            data: folder
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
            type: 'renameFolder',
            data: folder
          })}>
          <FormattedMessage {...messages.RenameFolder} />
        </MenuItem>
        <MenuItem
          key="deleteFolder"
          icon={(
            <Delete16Regular />
          )}
          onClick={(event) => onMenuClick?.(event, {
            type: 'deleteFolder',
            data: folder
          })}>
          <FormattedMessage {...messages.DeleteFolder} />
        </MenuItem>
      </MenuGroup>
      <MenuDivider />
      <MenuGroup>
        <MenuItem
          key="openWithOneDrive"
          icon={(
            <SiMicrosoftonedrive
              css={css`
                font-size: 1rem;
                line-height: 1rem;
              `} />
          )}
          onClick={(event) => onMenuClick?.(event, {
            type: 'openWithOneDrive',
            data: folder
          })}>
          <FormattedMessage {...messages.OpenWithOneDrive} />
        </MenuItem>
      </MenuGroup>
    </MenuList>
  ) : null;

}

export default React.memo(ExplorerFolderMenuList);
