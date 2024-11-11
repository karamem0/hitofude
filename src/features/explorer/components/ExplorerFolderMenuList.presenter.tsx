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
  DeleteIcon,
  LinkIcon,
  RenameIcon
} from '@fluentui/react-icons-mdl2';
import { ExplorerMenuAction, Folder } from '../../../types/Model';
import {
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList
} from '@fluentui/react-components';
import { EventHandler } from '../../../types/Event';
import { OneDriveLogoIcon } from '@fluentui/react-icons-mdl2-branded';
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
            <LinkIcon
              css={css`
                font-size: 1rem;
                line-height: 1rem;
              `} />
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
            <RenameIcon
              css={css`
                font-size: 1rem;
                line-height: 1rem;
              `} />
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
            <DeleteIcon
              css={css`
                font-size: 1rem;
                line-height: 1rem;
              `} />
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
            <OneDriveLogoIcon
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
