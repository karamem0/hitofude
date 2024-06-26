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
  Hide3Icon,
  PageAddIcon,
  RefreshIcon,
  ViewIcon
} from '@fluentui/react-icons-mdl2';
import {
  FabricNewFolderIcon,
  OneDriveLogoIcon
} from '@fluentui/react-icons-mdl2-branded';

import { css } from '@emotion/react';

import { EventHandler } from '../../../types/Event';
import {
  DialogAction,
  DialogType,
  Folder
} from '../../../types/Model';
import messages from '../messages';

interface ExplorerHeaderMenuProps {
  folder?: Folder,
  allFiles?: boolean,
  onOpenDialog?: EventHandler<DialogAction>,
  onOpenUrl?: EventHandler<string>,
  onRefreshFolder?: EventHandler<Folder>,
  onToggleExploreAllFiles?: EventHandler<boolean>
}

function ExplorerHeaderMenu(props: Readonly<ExplorerHeaderMenuProps>) {

  const {
    allFiles,
    folder,
    onOpenDialog,
    onOpenUrl,
    onRefreshFolder,
    onToggleExploreAllFiles
  } = props;

  return folder ? (
    <MenuList>
      <MenuGroup>
        <MenuItem
          key="RefreshFolder"
          icon={(
            <RefreshIcon
              css={css`
                font-size: 1rem;
                line-height: 1rem;
              `} />
          )}
          onClick={(e) => onRefreshFolder?.(e, folder)}>
          <FormattedMessage {...messages.Refresh} />
        </MenuItem>
      </MenuGroup>
      <MenuDivider />
      <MenuGroup>
        <MenuItem
          key="ToggleExploreAllFiles"
          icon={
            allFiles ? (
              <Hide3Icon
                css={css`
                  font-size: 1rem;
                  line-height: 1rem;
                `} />
            ) : (
              <ViewIcon
                css={css`
                  font-size: 1rem;
                  line-height: 1rem;
                `} />
            )}
          onClick={(e) => onToggleExploreAllFiles?.(e, !allFiles)}>
          {
            allFiles ? (
              <FormattedMessage {...messages.HideUnsupportedFiles} />
            ) : (
              <FormattedMessage {...messages.ShowUnsupportedFiles} />
            )
          }
        </MenuItem>
      </MenuGroup>
      <MenuDivider />
      <MenuGroup>
        <MenuItem
          key="CreateFile"
          icon={(
            <PageAddIcon
              css={css`
                font-size: 1rem;
                line-height: 1rem;
              `} />
          )}
          onClick={(e) => onOpenDialog?.(e, {
            type: DialogType.createFile,
            data: null
          })}>
          <FormattedMessage {...messages.NewFile} />
        </MenuItem>
        <MenuItem
          key="CreateFolder"
          icon={(
            <FabricNewFolderIcon
              css={css`
                font-size: 1rem;
                line-height: 1rem;
              `} />
          )}
          onClick={(e) => onOpenDialog?.(e, {
            type: DialogType.createFolder,
            data: null
          })}>
          <FormattedMessage {...messages.NewFolder} />
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
          onClick={(e) => onOpenUrl?.(e, folder.webUrl)}>
          <FormattedMessage {...messages.OpenWithOneDrive} />
        </MenuItem>
      </MenuGroup>
    </MenuList>
  ) : null;

}

export default React.memo(ExplorerHeaderMenu);
