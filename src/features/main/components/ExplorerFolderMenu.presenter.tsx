//
// Copyright (c) 2023 karamem0
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
import { DeleteIcon, RenameIcon } from '@fluentui/react-icons-mdl2';
import {
  OneDriveLogoIcon
} from '@fluentui/react-icons-mdl2-branded';

import { EventHandler } from '../../../types/Event';
import {
  DialogAction,
  DialogType,
  Folder
} from '../../../types/Model';
import messages from '../messages';

interface ExplorerFolderMenuProps {
  value?: Folder,
  onOpenDialog?: EventHandler<DialogAction>,
  onOpenUrl?: EventHandler<string>
}

function ExplorerFolderMenu(props: ExplorerFolderMenuProps) {

  const {
    value,
    onOpenDialog,
    onOpenUrl
  } = props;

  return value ? (
    <MenuList>
      <MenuGroup>
        <MenuItem
          key="RenameFolder"
          icon={(
            <RenameIcon
              css={css`
                font-size: 1rem;
                line-height: 1rem;
              `} />
          )}
          onClick={(e) => onOpenDialog?.(e, {
            type: DialogType.renameFolder,
            payload: value
          })}>
          <FormattedMessage {...messages.RenameFolder} />
        </MenuItem>
        <MenuItem
          key="DeleteFolder"
          icon={(
            <DeleteIcon
              css={css`
                font-size: 1rem;
                line-height: 1rem;
              `} />
          )}
          onClick={(e) => onOpenDialog?.(e, {
            type: DialogType.deleteFolder,
            payload: value
          })}>
          <FormattedMessage {...messages.DeleteFolder} />
        </MenuItem>
      </MenuGroup>
      <MenuDivider />
      <MenuGroup>
        <MenuItem
          key="OpenWithOneDrive"
          icon={(
            <OneDriveLogoIcon
              css={css`
                font-size: 1rem;
                line-height: 1rem;
              `} />
            )}
          onClick={(e) => onOpenUrl?.(e, value.webUrl)}>
          <FormattedMessage {...messages.OpenWithOneDrive} />
        </MenuItem>
      </MenuGroup>
    </MenuList>
  ) : null;

}

export default React.memo(ExplorerFolderMenu);