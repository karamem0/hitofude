//
// Copyright (c) 2023-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { css } from '@emotion/react';
import {
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList
} from '@fluentui/react-components';
import {
  ArrowClockwise16Regular,
  DocumentAdd16Regular,
  Eye16Regular,
  EyeOff16Regular,
  FolderAdd16Regular,
  Link16Regular
} from '@fluentui/react-icons';
import { GrOnedrive } from 'react-icons/gr';
import { FormattedMessage } from 'react-intl';
import { EventHandler } from '../../../types/Event';
import { ExplorerMenuAction, Folder } from '../../../types/Model';
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
            data: selectedFolder,
            type: 'refreshFolder'
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
            data: !allFiles,
            type: 'toggleAllFiles'
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
            data: selectedFolder,
            type: 'copyLink'
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
            data: null,
            type: 'createFile'
          })}>
          <FormattedMessage {...messages.NewFile} />
        </MenuItem>
        <MenuItem
          key="createFolder"
          icon={(
            <FolderAdd16Regular />
          )}
          onClick={(event) => onMenuClick?.(event, {
            data: null,
            type: 'createFolder'
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
            data: selectedFolder,
            type: 'openWithOneDrive'
          })}>
          <FormattedMessage {...messages.OpenWithOneDrive} />
        </MenuItem>
      </MenuGroup>
    </MenuList>
  ) : null;

}

export default React.memo(ExplorerHeaderMenuList);
