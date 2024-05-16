//
// Copyright (c) 2023 karamem0
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
import { CopyIcon, DeleteIcon, DownloadDocumentIcon, RenameIcon } from '@fluentui/react-icons-mdl2';
import {
  OneDriveLogoIcon
} from '@fluentui/react-icons-mdl2-branded';

import { css } from '@emotion/react';

import { EventHandler } from '../../../types/Event';
import {
  DialogAction,
  DialogType,
  File
} from '../../../types/Model';
import { isSupportedFile } from '../../../utils/File';
import messages from '../messages';

interface ExplorerFileMenuProps {
  value?: File,
  onDownload?: EventHandler,
  onOpenDialog?: EventHandler<DialogAction>,
  onOpenUrl?: EventHandler<string>
}

function ExplorerFileMenu(props: Readonly<ExplorerFileMenuProps>) {

  const {
    value,
    onDownload,
    onOpenDialog,
    onOpenUrl
  } = props;

  return value && isSupportedFile(value) ? (
    <MenuList>
      <MenuGroup>
        <MenuItem
          key="CopyFile"
          icon={(
            <CopyIcon
              css={css`
                font-size: 1rem;
                line-height: 1rem;
              `} />
          )}
          onClick={(e) => onOpenDialog?.(e, {
            type: DialogType.copyFile,
            data: value
          })}>
          <FormattedMessage {...messages.CopyFile} />
        </MenuItem>
      </MenuGroup>
      <MenuDivider />
      <MenuGroup>
        <MenuItem
          key="RenameFile"
          icon={(
            <RenameIcon
              css={css`
                font-size: 1rem;
                line-height: 1rem;
              `} />
          )}
          onClick={(e) => onOpenDialog?.(e, {
            type: DialogType.renameFile,
            data: value
          })}>
          <FormattedMessage {...messages.RenameFile} />
        </MenuItem>
        <MenuItem
          key="DeleteFile"
          icon={(
            <DeleteIcon
              css={css`
                font-size: 1rem;
                line-height: 1rem;
              `} />
          )}
          onClick={(e) => onOpenDialog?.(e, {
            type: DialogType.deleteFile,
            data: value
          })}>
          <FormattedMessage {...messages.DeleteFile} />
        </MenuItem>
      </MenuGroup>
      <MenuDivider />
      <MenuGroup>
        <MenuItem
          key="DownloadFile"
          icon={(
            <DownloadDocumentIcon
              css={css`
                font-size: 1rem;
                line-height: 1rem;
              `} />
          )}
          onClick={(e) => onDownload?.(e)}>
          <FormattedMessage {...messages.Download} />
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

export default React.memo(ExplorerFileMenu);
