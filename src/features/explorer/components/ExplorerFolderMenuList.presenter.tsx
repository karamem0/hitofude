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
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList
} from '@fluentui/react-components';
import {
  DeleteIcon,
  LinkIcon,
  RenameIcon
} from '@fluentui/react-icons-mdl2';
import {
  OneDriveLogoIcon
} from '@fluentui/react-icons-mdl2-branded';

import { css } from '@emotion/react';

import { EventHandler } from '../../../types/Event';
import {
  ExplorerMenuAction,
  ExplorerMenuType,
  Folder
} from '../../../types/Model';
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
          key={ExplorerMenuType.copyLink}
          icon={(
            <LinkIcon
              css={css`
                font-size: 1rem;
                line-height: 1rem;
              `} />
          )}
          onClick={(event) => onMenuClick?.(event, {
            type: ExplorerMenuType.copyLink,
            data: folder
          })}>
          <FormattedMessage {...messages.CopyLink} />
        </MenuItem>
      </MenuGroup>
      <MenuDivider />
      <MenuGroup>
        <MenuItem
          key={ExplorerMenuType.renameFolder}
          icon={(
            <RenameIcon
              css={css`
                font-size: 1rem;
                line-height: 1rem;
              `} />
          )}
          onClick={(event) => onMenuClick?.(event, {
            type: ExplorerMenuType.renameFolder,
            data: folder
          })}>
          <FormattedMessage {...messages.RenameFolder} />
        </MenuItem>
        <MenuItem
          key={ExplorerMenuType.deleteFolder}
          icon={(
            <DeleteIcon
              css={css`
                font-size: 1rem;
                line-height: 1rem;
              `} />
          )}
          onClick={(event) => onMenuClick?.(event, {
            type: ExplorerMenuType.deleteFolder,
            data: folder
          })}>
          <FormattedMessage {...messages.DeleteFolder} />
        </MenuItem>
      </MenuGroup>
      <MenuDivider />
      <MenuGroup>
        <MenuItem
          key={ExplorerMenuType.openWithOneDrive}
          icon={(
            <OneDriveLogoIcon
              css={css`
                font-size: 1rem;
                line-height: 1rem;
              `} />
            )}
          onClick={(event) => onMenuClick?.(event, {
            type: ExplorerMenuType.openWithOneDrive,
            data: folder
          })}>
          <FormattedMessage {...messages.OpenWithOneDrive} />
        </MenuItem>
      </MenuGroup>
    </MenuList>
  ) : null;

}

export default React.memo(ExplorerFolderMenuList);
