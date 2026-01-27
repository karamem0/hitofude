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
  Checkmark16Regular,
  Dismiss16Regular,
  Edit16Regular,
  History16Regular,
  Link16Regular,
  Save16Regular
} from '@fluentui/react-icons';
import { GrOnedrive } from 'react-icons/gr';
import { FormattedMessage } from 'react-intl';
import { EventHandler } from '../../../types/Event';
import { ContentMenuAction, File } from '../../../types/Model';
import { isMarkdown } from '../../../utils/File';
import messages from '../messages';

interface ContentMenuListProps {
  changed?: boolean,
  editing?: boolean,
  file?: File,
  showMinimap?: boolean,
  showPreview?: boolean,
  syncScroll?: boolean,
  wordWrap?: boolean,
  onMenuClick?: EventHandler<ContentMenuAction>
}

function ContentMenuList(props: Readonly<ContentMenuListProps>) {

  const {
    changed,
    editing,
    file,
    showMinimap,
    showPreview,
    syncScroll,
    wordWrap,
    onMenuClick
  } = props;

  return editing ? (
    <MenuList
      css={css`
        @media not all and (width <= 960px) {
          & > div:nth-of-type(1),
          & > div:nth-of-type(2) {
            display: none;
          }
        }
      `}>
      <MenuGroup>
        <MenuItem
          disabled={!changed}
          key="saveFile"
          icon={(
            <Save16Regular />
          )}
          onClick={(event) => onMenuClick?.(event, {
            data: true,
            type: 'saveFile'
          })}>
          <FormattedMessage {...messages.Save} />
        </MenuItem>
        <MenuItem
          disabled={!changed}
          key="saveAndCloseFile"
          icon={(
            <div
              css={css`
                display: transparent;
                font-size: 1rem;
                line-height: 1rem;
              `} />
          )}
          onClick={(event) => onMenuClick?.(event, {
            data: false,
            type: 'saveFile'
          })}>
          <FormattedMessage {...messages.SaveAndClose} />
        </MenuItem>
        <MenuItem
          key="closeFile"
          icon={(
            <Dismiss16Regular />
          )}
          onClick={(event) => onMenuClick?.(event, {
            data: undefined,
            type: 'closeFile'
          })}>
          <FormattedMessage {...messages.Cancel} />
        </MenuItem>
      </MenuGroup>
      <MenuDivider />
      <MenuGroup>
        <MenuItem
          key="openFileVersionPanel"
          icon={(
            <History16Regular />
          )}
          onClick={(event) => onMenuClick?.(event, {
            data: {
              data: file,
              type: 'fileVersion'
            },
            type: 'openFileVersionPanel'
          })}>
          <FormattedMessage {...messages.VersionHistory} />
        </MenuItem>
      </MenuGroup>
      <MenuDivider />
      <MenuGroup>
        <MenuItem
          key="toggleShowMinimap"
          icon={(
            <Checkmark16Regular
              css={css`
                color: ${showMinimap ? 'inherit' : 'transparent'};
              `} />
          )}
          onClick={(event) => onMenuClick?.(event, {
            data: !showMinimap,
            type: 'toggleShowMinimap'
          })}>
          <FormattedMessage {...messages.Minimap} />
        </MenuItem>
        <MenuItem
          key="toggleWordWrap"
          icon={(
            <Checkmark16Regular
              css={css`
                color: ${wordWrap ? 'inherit' : 'transparent'};
              `} />
          )}
          onClick={(event) => onMenuClick?.(event, {
            data: !wordWrap,
            type: 'toggleWordWrap'
          })}>
          <FormattedMessage {...messages.WordWrap} />
        </MenuItem>
        <MenuItem
          key="toggleSyncScroll"
          icon={(
            <Checkmark16Regular
              css={css`
                color: ${syncScroll ? 'inherit' : 'transparent'};
              `} />
          )}
          onClick={(event) => onMenuClick?.(event, {
            data: !syncScroll,
            type: 'toggleSyncScroll'
          })}>
          <FormattedMessage {...messages.SyncScroll} />
        </MenuItem>
        <MenuItem
          key="toggleShowPreview"
          icon={(
            <Checkmark16Regular
              css={css`
                color: ${showPreview ? 'inherit' : 'transparent'};
              `} />
          )}
          onClick={(event) => onMenuClick?.(event, {
            data: !showPreview,
            type: 'toggleShowPreview'
          })}>
          <FormattedMessage {...messages.Preview} />
        </MenuItem>
      </MenuGroup>
    </MenuList>
  ) : (
    <MenuList
      css={css`
        @media not all and (width <= 960px) {
          & > div:nth-of-type(1),
          & > div:nth-of-type(2) {
            display: none;
          }
        }
      `}>
      <MenuGroup>
        <MenuItem
          disabled={!isMarkdown(file)}
          key="editFile"
          icon={(
            <Edit16Regular />
          )}
          onClick={(event) => onMenuClick?.(event, {
            data: undefined,
            type: 'editFile'
          })}>
          <FormattedMessage {...messages.Edit} />
        </MenuItem>
      </MenuGroup>
      <MenuDivider />
      <MenuGroup>
        <MenuItem
          key="openFileVersionPanel"
          icon={(
            <History16Regular />
          )}
          onClick={(event) => onMenuClick?.(event, {
            data: {
              data: file,
              type: 'fileVersion'
            },
            type: 'openFileVersionPanel'
          })}>
          <FormattedMessage {...messages.VersionHistory} />
        </MenuItem>
      </MenuGroup>
      <MenuDivider />
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

}

export default React.memo(ContentMenuList);
