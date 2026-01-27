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
  ArrowDownload16Regular,
  Copy16Regular,
  Delete16Regular,
  Link16Regular,
  Rename16Regular
} from '@fluentui/react-icons';
import { GrOnedrive } from 'react-icons/gr';
import { FormattedMessage } from 'react-intl';
import { EventHandler } from '../../../types/Event';
import { ExplorerMenuAction, File } from '../../../types/Model';
import { isMarkdown } from '../../../utils/File';
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

  return (() => {
    if (file == null) {
      return null;
    }
    return isMarkdown(file) ? (
      <MenuList>
        <MenuGroup>
          <MenuItem
            key="copyFile"
            icon={(
              <Copy16Regular />
            )}
            onClick={(event) => onMenuClick?.(event, {
              data: file,
              type: 'copyFile'
            })}>
            <FormattedMessage {...messages.CopyFile} />
          </MenuItem>
          <MenuItem
            key="copyLink"
            icon={(
              <Link16Regular />
            )}
            onClick={(event) => onMenuClick?.(event, {
              data: file,
              type: 'copyLink'
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
              data: file,
              type: 'renameFile'
            })}>
            <FormattedMessage {...messages.RenameFile} />
          </MenuItem>
          <MenuItem
            key="deleteFile"
            icon={(
              <Delete16Regular />
            )}
            onClick={(event) => onMenuClick?.(event, {
              data: file,
              type: 'deleteFile'
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
              data: file,
              type: 'downloadFile'
            })}>
            <FormattedMessage {...messages.Download} />
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
              data: file,
              type: 'openWithOneDrive'
            })}>
            <FormattedMessage {...messages.OpenWithOneDrive} />
          </MenuItem>
        </MenuGroup>
      </MenuList>
    ) : (
      <MenuList>
        <MenuGroup>
          <MenuItem
            key="copyLink"
            icon={(
              <Link16Regular />
            )}
            onClick={(event) => onMenuClick?.(event, {
              data: file,
              type: 'copyLink'
            })}>
            <FormattedMessage {...messages.CopyLink} />
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
              data: file,
              type: 'downloadFile'
            })}>
            <FormattedMessage {...messages.Download} />
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
              data: file,
              type: 'openWithOneDrive'
            })}>
            <FormattedMessage {...messages.OpenWithOneDrive} />
          </MenuItem>
        </MenuGroup>
      </MenuList>
    );
  })();

}

export default React.memo(ExplorerFileMenuList);
