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
  CopyIcon,
  DeleteIcon,
  DownloadDocumentIcon,
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
  File
} from '../../../types/Model';
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
          key={ExplorerMenuType.copyFile}
          icon={(
            <CopyIcon
              css={css`
                font-size: 1rem;
                line-height: 1rem;
              `} />
          )}
          onClick={(event) => onMenuClick?.(event, {
            type: ExplorerMenuType.copyFile,
            data: file
          })}>
          <FormattedMessage {...messages.CopyFile} />
        </MenuItem>
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
            data: file
          })}>
          <FormattedMessage {...messages.CopyLink} />
        </MenuItem>
      </MenuGroup>
      <MenuDivider />
      <MenuGroup>
        <MenuItem
          key={ExplorerMenuType.renameFile}
          icon={(
            <RenameIcon
              css={css`
                font-size: 1rem;
                line-height: 1rem;
              `} />
          )}
          onClick={(event) => onMenuClick?.(event, {
            type: ExplorerMenuType.renameFile,
            data: file
          })}>
          <FormattedMessage {...messages.RenameFile} />
        </MenuItem>
        <MenuItem
          key={ExplorerMenuType.deleteFile}
          icon={(
            <DeleteIcon
              css={css`
                font-size: 1rem;
                line-height: 1rem;
              `} />
          )}
          onClick={(event) => onMenuClick?.(event, {
            type: ExplorerMenuType.deleteFile,
            data: file
          })}>
          <FormattedMessage {...messages.DeleteFile} />
        </MenuItem>
      </MenuGroup>
      <MenuDivider />
      <MenuGroup>
        <MenuItem
          key={ExplorerMenuType.downloadFile}
          icon={(
            <DownloadDocumentIcon
              css={css`
                font-size: 1rem;
                line-height: 1rem;
              `} />
          )}
          onClick={(event) => onMenuClick?.(event, {
            type: ExplorerMenuType.downloadFile,
            data: file
          })}>
          <FormattedMessage {...messages.Download} />
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
            data: file
          })}>
          <FormattedMessage {...messages.OpenWithOneDrive} />
        </MenuItem>
      </MenuGroup>
    </MenuList>
  ) : null;

}

export default React.memo(ExplorerFileMenuList);
