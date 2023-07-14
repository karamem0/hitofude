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

import { EventHandler } from '../../../types/Event';
import { DialogAction, DialogType, Folder } from '../../../types/Model';
import messages from '../messages';

interface ExplorerHeaderMenuProps {
  exploreFolder?: Folder,
  includeUnsupportedFiles?: boolean,
  onOpenDialog?: EventHandler<DialogAction>,
  onOpenUrl?: EventHandler<string>,
  onRefreshFolder?: EventHandler<Folder>,
  onToggleIncludeUnsupportedFiles?: EventHandler<boolean>
}

function ExplorerHeaderMenu(props: ExplorerHeaderMenuProps) {

  const {
    exploreFolder,
    includeUnsupportedFiles,
    onOpenDialog,
    onOpenUrl,
    onRefreshFolder,
    onToggleIncludeUnsupportedFiles
  } = props;

  return exploreFolder ? (
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
          onClick={(e) => onRefreshFolder?.(e, exploreFolder)}>
          <FormattedMessage {...messages.Refresh} />
        </MenuItem>
      </MenuGroup>
      <MenuDivider />
      <MenuGroup>
        <MenuItem
          key="ToggleIncludeUnsupportedFiles"
          icon={
            includeUnsupportedFiles ? (
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
          onClick={(e) => onToggleIncludeUnsupportedFiles?.(e, !includeUnsupportedFiles)}>
          {
            includeUnsupportedFiles ? (
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
          onClick={(e) => onOpenUrl?.(e, exploreFolder.webUrl)}>
          <FormattedMessage {...messages.OpenWithOneDrive} />
        </MenuItem>
      </MenuGroup>
    </MenuList>
  ) : null;

}

export default React.memo(ExplorerHeaderMenu);
