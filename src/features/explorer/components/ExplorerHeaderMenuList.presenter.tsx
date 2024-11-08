//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import {
  ExplorerMenuAction,
  ExplorerMenuType,
  Folder
} from '../../../types/Model';
import {
  FabricNewFolderIcon,
  OneDriveLogoIcon
} from '@fluentui/react-icons-mdl2-branded';
import {
  Hide3Icon,
  LinkIcon,
  PageAddIcon,
  RefreshIcon,
  ViewIcon
} from '@fluentui/react-icons-mdl2';
import {
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList
} from '@fluentui/react-components';
import { EventHandler } from '../../../types/Event';
import { FormattedMessage } from 'react-intl';
import { css } from '@emotion/react';
import messages from '../messages';

interface ExplorerHeaderMenuListProps {
  allFiles?: boolean,
  selectedFolder?: Folder,
  onMenuClick?: EventHandler<ExplorerMenuAction>
}

function ExplorerHeaderMenuList(props: Readonly<ExplorerHeaderMenuListProps>) {

  const {
    allFiles,
    selectedFolder,
    onMenuClick
  } = props;

  return selectedFolder ? (
    <MenuList>
      <MenuGroup>
        <MenuItem
          key={ExplorerMenuType.refreshFolder}
          icon={(
            <RefreshIcon
              css={css`
                font-size: 1rem;
                line-height: 1rem;
              `} />
          )}
          onClick={(event) => onMenuClick?.(event, {
            type: ExplorerMenuType.refreshFolder,
            data: selectedFolder
          })}>
          <FormattedMessage {...messages.Refresh} />
        </MenuItem>
      </MenuGroup>
      <MenuDivider />
      <MenuGroup>
        <MenuItem
          key={ExplorerMenuType.toggleAllFiles}
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
            )
          }
          onClick={(event) => onMenuClick?.(event, {
            type: ExplorerMenuType.toggleAllFiles,
            data: !allFiles
          })}>
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
            data: selectedFolder
          })}>
          <FormattedMessage {...messages.CopyLink} />
        </MenuItem>
      </MenuGroup>
      <MenuDivider />
      <MenuGroup>
        <MenuItem
          key={ExplorerMenuType.createFile}
          icon={(
            <PageAddIcon
              css={css`
                font-size: 1rem;
                line-height: 1rem;
              `} />
          )}
          onClick={(event) => onMenuClick?.(event, {
            type: ExplorerMenuType.createFile,
            data: null
          })}>
          <FormattedMessage {...messages.NewFile} />
        </MenuItem>
        <MenuItem
          key={ExplorerMenuType.createFolder}
          icon={(
            <FabricNewFolderIcon
              css={css`
                font-size: 1rem;
                line-height: 1rem;
              `} />
          )}
          onClick={(event) => onMenuClick?.(event, {
            type: ExplorerMenuType.createFolder,
            data: null
          })}>
          <FormattedMessage {...messages.NewFolder} />
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
            data: selectedFolder
          })}>
          <FormattedMessage {...messages.OpenWithOneDrive} />
        </MenuItem>
      </MenuGroup>
    </MenuList>
  ) : null;

}

export default React.memo(ExplorerHeaderMenuList);
