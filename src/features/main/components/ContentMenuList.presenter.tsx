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
  minimap?: boolean,
  preview?: boolean,
  scroll?: boolean,
  wordWrap?: boolean,
  onMenuClick?: EventHandler<ContentMenuAction>
}

function ContentMenuList(props: Readonly<ContentMenuListProps>) {

  const {
    changed,
    editing,
    file,
    minimap,
    preview,
    scroll,
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
              key="toggleMinimap"
              icon={(
                <Checkmark16Regular
                  css={css`
                    color: ${minimap ? 'inherit' : 'transparent'};
                  `} />
              )}
              onClick={(event) => onMenuClick?.(event, {
                type: 'toggleMinimap',
                data: !minimap
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
              key="toggleScroll"
              icon={(
                <Checkmark16Regular
                  css={css`
                    color: ${scroll ? 'inherit' : 'transparent'};
                  `} />
              )}
              onClick={(event) => onMenuClick?.(event, {
                type: 'toggleScroll',
                data: !scroll
              })}>
              <FormattedMessage {...messages.SyncScroll} />
            </MenuItem>
            <MenuItem
              key="togglePreview"
              icon={(
                <Checkmark16Regular
                  css={css`
                    color: ${preview ? 'inherit' : 'transparent'};
                  `} />
              )}
              onClick={(event) => onMenuClick?.(event, {
                type: 'togglePreview',
                data: !preview
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
