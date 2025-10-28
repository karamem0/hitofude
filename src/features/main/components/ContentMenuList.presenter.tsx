//
// Copyright (c) 2023-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import {
  ArrowDownload16Regular,
  Checkmark16Regular,
  Dismiss16Regular,
  Edit16Regular,
  History16Regular,
  Save16Regular
} from '@fluentui/react-icons';
import { ContentMenuAction, File } from '../../../types/Model';
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

  return (
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
        {
          editing ? (
            <React.Fragment>
              <MenuItem
                key="saveFile"
                disabled={!changed}
                icon={(
                  <Save16Regular />
                )}
                onClick={(event) => onMenuClick?.(event, {
                  type: 'saveFile',
                  data: true
                })}>
                <FormattedMessage {...messages.Save} />
              </MenuItem>
              <MenuItem
                key="saveAndCloseFile"
                disabled={!changed}
                icon={(
                  <div
                    css={css`
                    display: transparent;
                    font-size: 1rem;
                    line-height: 1rem;
                  `} />
                )}
                onClick={(event) => onMenuClick?.(event, {
                  type: 'saveFile',
                  data: false
                })}>
                <FormattedMessage {...messages.SaveAndClose} />
              </MenuItem>
              <MenuItem
                key="closeFile"
                icon={(
                  <Dismiss16Regular />
                )}
                onClick={(event) => onMenuClick?.(event, {
                  type: 'closeFile',
                  data: undefined
                })}>
                <FormattedMessage {...messages.Cancel} />
              </MenuItem>
            </React.Fragment>
          ) : (
            <MenuItem
              key="editFile"
              icon={(
                <Edit16Regular />
              )}
              onClick={(event) => onMenuClick?.(event, {
                type: 'editFile',
                data: undefined
              })}>
              <FormattedMessage {...messages.Edit} />
            </MenuItem>
          )
        }
      </MenuGroup>
      <MenuDivider />
      <MenuGroup>
        <MenuItem
          key="openFileVersionPanel"
          icon={(
            <History16Regular />
          )}
          onClick={(event) => onMenuClick?.(event, {
            type: 'openFileVersionPanel',
            data: {
              type: 'fileVersion',
              data: file
            }
          })}>
          <FormattedMessage {...messages.VersionHistory} />
        </MenuItem>
      </MenuGroup>
      <MenuDivider />
      {
        editing ? (
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
                type: 'toggleShowMinimap',
                data: !showMinimap
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
                type: 'toggleWordWrap',
                data: !wordWrap
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
                type: 'toggleSyncScroll',
                data: !syncScroll
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
                type: 'toggleShowPreview',
                data: !showPreview
              })}>
              <FormattedMessage {...messages.Preview} />
            </MenuItem>
          </MenuGroup>
        ) : (
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
        )
      }
    </MenuList>
  );

}

export default React.memo(ContentMenuList);
