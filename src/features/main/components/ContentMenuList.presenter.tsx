//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import {
  CancelIcon,
  CheckMarkIcon,
  DownloadDocumentIcon,
  EditIcon,
  HistoryIcon,
  SaveIcon
} from '@fluentui/react-icons-mdl2';
import {
  ContentMenuAction,
  ContentMenuType,
  File,
  SidePanelType
} from '../../../types/Model';
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
                key={`${ContentMenuType.saveFile}-1`}
                disabled={!changed}
                icon={(
                  <SaveIcon
                    css={css`
                    font-size: 1rem;
                    line-height: 1rem;
                  `} />
                )}
                onClick={(event) => onMenuClick?.(event, {
                  type: ContentMenuType.saveFile,
                  data: true
                })}>
                <FormattedMessage {...messages.Save} />
              </MenuItem>
              <MenuItem
                key={`${ContentMenuType.saveFile}-0`}
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
                  type: ContentMenuType.saveFile,
                  data: false
                })}>
                <FormattedMessage {...messages.SaveAndClose} />
              </MenuItem>
              <MenuItem
                key={ContentMenuType.closeFile}
                icon={(
                  <CancelIcon
                    css={css`
                    font-size: 1rem;
                    line-height: 1rem;
                  `} />
                )}
                onClick={(event) => onMenuClick?.(event, {
                  type: ContentMenuType.closeFile,
                  data: undefined
                })}>
                <FormattedMessage {...messages.Cancel} />
              </MenuItem>
            </React.Fragment>
          ) : (
            <MenuItem
              key={ContentMenuType.editFile}
              icon={(
                <EditIcon
                  css={css`
                font-size: 1rem;
                line-height: 1rem;
              `} />
              )}
              onClick={(event) => onMenuClick?.(event, {
                type: ContentMenuType.editFile,
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
          key={ContentMenuType.openFileVersionPanel}
          icon={(
            <HistoryIcon
              css={css`
                font-size: 1rem;
                line-height: 1rem;
              `} />
          )}
          onClick={(event) => onMenuClick?.(event, {
            type: ContentMenuType.openFileVersionPanel,
            data: {
              type: SidePanelType.fileVersion,
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
              key={ContentMenuType.toggleMinimap}
              icon={(
                <CheckMarkIcon
                  css={css`
                    font-size: 1rem;
                    line-height: 1rem;
                    color: ${minimap ? 'inherit' : 'transparent'};
                  `} />
              )}
              onClick={(event) => onMenuClick?.(event, {
                type: ContentMenuType.toggleMinimap,
                data: !minimap
              })}>
              <FormattedMessage {...messages.Minimap} />
            </MenuItem>
            <MenuItem
              key={ContentMenuType.toggleWordWrap}
              icon={(
                <CheckMarkIcon
                  css={css`
                    font-size: 1rem;
                    line-height: 1rem;
                    color: ${wordWrap ? 'inherit' : 'transparent'};
                  `} />
              )}
              onClick={(event) => onMenuClick?.(event, {
                type: ContentMenuType.toggleWordWrap,
                data: !wordWrap
              })}>
              <FormattedMessage {...messages.WordWrap} />
            </MenuItem>
            <MenuItem
              key={ContentMenuType.toggleScroll}
              icon={(
                <CheckMarkIcon
                  css={css`
                    font-size: 1rem;
                    line-height: 1rem;
                    color: ${scroll ? 'inherit' : 'transparent'};
                  `} />
              )}
              onClick={(event) => onMenuClick?.(event, {
                type: ContentMenuType.toggleScroll,
                data: !scroll
              })}>
              <FormattedMessage {...messages.SyncScroll} />
            </MenuItem>
            <MenuItem
              key={ContentMenuType.togglePreview}
              icon={(
                <CheckMarkIcon
                  css={css`
                    font-size: 1rem;
                    line-height: 1rem;
                    color: ${preview ? 'inherit' : 'transparent'};
                  `} />
              )}
              onClick={(event) => onMenuClick?.(event, {
                type: ContentMenuType.togglePreview,
                data: !preview
              })}>
              <FormattedMessage {...messages.Preview} />
            </MenuItem>
          </MenuGroup>
        ) : (
          <MenuGroup>
            <MenuItem
              key={ContentMenuType.downloadFile}
              icon={(
                <DownloadDocumentIcon
                  css={css`
                    font-size: 1rem;
                    line-height: 1rem;
                  `} />
              )}
              onClick={(event) => onMenuClick?.(event, {
                type: ContentMenuType.downloadFile,
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
