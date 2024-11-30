//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import {
  ArrowDownload16Regular,
  Copy16Regular,
  Delete16Regular,
  Link16Regular,
  Rename16Regular
} from '@fluentui/react-icons';
import { ExplorerMenuAction, File } from '../../../types/Model';
import {
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList
} from '@fluentui/react-components';
import { EventHandler } from '../../../types/Event';
import { FormattedMessage } from 'react-intl';
import { SiMicrosoftonedrive } from 'react-icons/si';
import { css } from '@emotion/react';
import { isSupportedFile } from '../../../utils/File';
import messages from '../messages';

interface ExplorerFileMenuListProps {
  file?: File,
  onMenuClick?: EventHandler<ExplorerMenuAction>
}

function ExplorerFileMenuList(props: Readonly<ExplorerFileMenuListProps>) {

  const {
    file,
    onMenuClick
  } = props;

  return file && isSupportedFile(file) ? (
    <MenuList>
      <MenuGroup>
        <MenuItem
          key="copyFile"
          icon={(
            <Copy16Regular />
          )}
          onClick={(event) => onMenuClick?.(event, {
            type: 'copyFile',
            data: file
          })}>
          <FormattedMessage {...messages.CopyFile} />
        </MenuItem>
        <MenuItem
          key="copyLink"
          icon={(
            <Link16Regular />
          )}
          onClick={(event) => onMenuClick?.(event, {
            type: 'copyLink',
            data: file
          })}>
          <FormattedMessage {...messages.CopyLink} />
        </MenuItem>
      </MenuGroup>
      <MenuDivider />
      <MenuGroup>
        <MenuItem
          key="renameFile"
          icon={(
            <Rename16Regular
              css={css`
                font-size: 1rem;
                line-height: 1rem;
              `} />
          )}
          onClick={(event) => onMenuClick?.(event, {
            type: 'renameFile',
            data: file
          })}>
          <FormattedMessage {...messages.RenameFile} />
        </MenuItem>
        <MenuItem
          key="deleteFile"
          icon={(
            <Delete16Regular />
          )}
          onClick={(event) => onMenuClick?.(event, {
            type: 'deleteFile',
            data: file
          })}>
          <FormattedMessage {...messages.DeleteFile} />
        </MenuItem>
      </MenuGroup>
      <MenuDivider />
      <MenuGroup>
        <MenuItem
          key="downloadFile"
          icon={(
            <ArrowDownload16Regular />
          )}
          onClick={(event) => onMenuClick?.(event, {
            type: 'downloadFile',
            data: file
          })}>
          <FormattedMessage {...messages.Download} />
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
            data: file
          })}>
          <FormattedMessage {...messages.OpenWithOneDrive} />
        </MenuItem>
      </MenuGroup>
    </MenuList>
  ) : null;

}

export default React.memo(ExplorerFileMenuList);
