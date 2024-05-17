//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { FormattedMessage, useIntl } from 'react-intl';

import {
  Menu,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger
} from '@fluentui/react-components';
import {
  CheckMarkIcon,
  DownloadDocumentIcon,
  HistoryIcon,
  MoreVerticalIcon
} from '@fluentui/react-icons-mdl2';

import { css } from '@emotion/react';

import { EventHandler } from '../../../types/Event';
import {
  ContentMenuAction,
  ContentMenuType,
  File,
  SidePanelType
} from '../../../types/Model';
import messages from '../messages';

interface ContentMenuButtonProps {
  editing?: boolean,
  file?: File,
  minimap?: boolean,
  scroll?:boolean,
  wordWrap?: boolean,
  onMenuClick?: EventHandler<ContentMenuAction>
}

function ContentMenuButton(props: Readonly<ContentMenuButtonProps>) {

  const {
    editing,
    file,
    minimap,
    scroll,
    wordWrap,
    onMenuClick
  } = props;

  const intl = useIntl();

  return file ? (
    <Menu>
      <MenuTrigger>
        <div
          aria-label={intl.formatMessage(messages.MoreOption)}
          role="button"
          tabIndex={-1}
          title={intl.formatMessage(messages.MoreOption)}
          css={css`
            padding: 0.5rem;
            font-size: 1rem;
            line-height: 1rem;
          `}>
          <MoreVerticalIcon />
        </div>
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
          <MenuGroup>
            <MenuItem
              key="OpenFileVersion"
              icon={(
                <HistoryIcon
                  css={css`
                    font-size: 1rem;
                    line-height: 1rem;
                  `} />
              )}
              onClick={(e) => onMenuClick?.(e, {
                type: ContentMenuType.openSidePanel,
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
                  key="ToggleMinimap"
                  icon={
                    <CheckMarkIcon
                      css={css`
                        font-size: 1rem;
                        line-height: 1rem;
                        color: ${minimap ? 'inherit' : 'transparent'};
                      `} />
                  }
                  onClick={(e) => onMenuClick?.(e, {
                    type: ContentMenuType.toggleMinimap,
                    data: !minimap
                  })}>
                  {
                    <FormattedMessage {...messages.Minimap} />
                  }
                </MenuItem>
                <MenuItem
                  key="ToggleWordWrap"
                  icon={
                    <CheckMarkIcon
                      css={css`
                        font-size: 1rem;
                        line-height: 1rem;
                        color: ${wordWrap ? 'inherit' : 'transparent'};
                      `} />
                  }
                  onClick={(e) => onMenuClick?.(e, {
                    type: ContentMenuType.toggleWordWrap,
                    data: !wordWrap
                  })}>
                  {
                    <FormattedMessage {...messages.WordWrap} />
                  }
                </MenuItem>
                <MenuItem
                  key="ToggleScroll"
                  icon={
                    <CheckMarkIcon
                      css={css`
                        font-size: 1rem;
                        line-height: 1rem;
                        color: ${scroll ? 'inherit' : 'transparent'};
                      `} />
                  }
                  onClick={(e) => onMenuClick?.(e, {
                    type: ContentMenuType.toggleScroll,
                    data: !scroll
                  })}>
                  {
                    <FormattedMessage {...messages.SyncScroll} />
                  }
                </MenuItem>
              </MenuGroup>
            ) : (
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
                  onClick={(e) => onMenuClick?.(e, {
                    type: ContentMenuType.downloadFile,
                    data: file
                  })
                }>
                  <FormattedMessage {...messages.Download} />
                </MenuItem>
              </MenuGroup>
            )
          }
        </MenuList>
      </MenuPopover>
    </Menu>
  ) : null;

}

export default React.memo(ContentMenuButton);
