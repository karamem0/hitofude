//
// Copyright (c) 2023-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import {
  ArrowClockwise16Regular,
  DocumentAdd16Regular,
  Eye16Regular,
  EyeOff16Regular,
  FolderAdd16Regular,
  Link16Regular
} from '@fluentui/react-icons';
import { ExplorerMenuAction, Folder } from '../../../types/Model';
import {
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList
} from '@fluentui/react-components';
import { EventHandler } from '../../../types/Event';
import { FormattedMessage } from 'react-intl';
import { GrOnedrive } from 'react-icons/gr';
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
          key="refreshFolder"
          icon={(
            <ArrowClockwise16Regular />
          )}
          onClick={(event) => onMenuClick?.(event, {
            type: 'refreshFolder',
            data: selectedFolder
          })}>
          <FormattedMessage {...messages.Refresh} />
        </MenuItem>
      </MenuGroup>
      <MenuDivider />
      <MenuGroup>
        <MenuItem
          key="toggleAllFiles"
          icon={
            allFiles ? (
              <EyeOff16Regular />
            ) : (
              <Eye16Regular />
            )
          }
          onClick={(event) => onMenuClick?.(event, {
            type: 'toggleAllFiles',
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
          key="copyLink"
          icon={(
            <Link16Regular
              css={css`
                font-size: 1rem;
                line-height: 1rem;
              `} />
          )}
          onClick={(event) => onMenuClick?.(event, {
            type: 'copyLink',
            data: selectedFolder
          })}>
          <FormattedMessage {...messages.CopyLink} />
        </MenuItem>
      </MenuGroup>
      <MenuDivider />
      <MenuGroup>
        <MenuItem
          key="createFile"
          icon={(
            <DocumentAdd16Regular />
          )}
          onClick={(event) => onMenuClick?.(event, {
            type: 'createFile',
            data: null
          })}>
          <FormattedMessage {...messages.NewFile} />
        </MenuItem>
        <MenuItem
          key="createFolder"
          icon={(
            <FolderAdd16Regular />
          )}
          onClick={(event) => onMenuClick?.(event, {
            type: 'createFolder',
            data: null
          })}>
          <FormattedMessage {...messages.NewFolder} />
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
            type: 'openWithOneDrive',
            data: selectedFolder
          })}>
          <FormattedMessage {...messages.OpenWithOneDrive} />
        </MenuItem>
      </MenuGroup>
    </MenuList>
  ) : null;

}

export default React.memo(ExplorerHeaderMenuList);
