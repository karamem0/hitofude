//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { FormattedMessage, useIntl } from 'react-intl';

import { css } from '@emotion/react';
import {
  Menu,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger
} from '@fluentui/react-components';
import { Hide3Icon, HistoryIcon, MoreVerticalIcon, ViewIcon } from '@fluentui/react-icons-mdl2';

import { EventHandler } from '../../../types/Event';
import {
  ContentMenuAction,
  ContentMenuType,
  File,
  FileContent,
  SidePanelType
} from '../../../types/Model';
import messages from '../messages';

interface ContentMenuButtonProps {
  minimapEnabled?: boolean,
  value?: File & FileContent,
  onMenuClick?: EventHandler<ContentMenuAction>
}

function ContentMenuButton(props: ContentMenuButtonProps) {

  const {
    minimapEnabled,
    value,
    onMenuClick
  } = props;

  const intl = useIntl();

  return value ? (
    <Menu>
      <MenuTrigger>
        <div
          aria-label={intl.formatMessage(messages.MoreOption)}
          role="button"
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
                  data: value
                }
              })}>
              <FormattedMessage {...messages.VersionHistory} />
            </MenuItem>
          </MenuGroup>
          {
            value.editing && (
              <React.Fragment>
                <MenuDivider />
                <MenuGroup>
                  <MenuItem
                    key="ToggleMinimapEnabled"
                    icon={
                      minimapEnabled ? (
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
                    onClick={(e) => onMenuClick?.(e, {
                      type: ContentMenuType.toggleMinimapEnabled,
                      data: !minimapEnabled
                    })}>
                    {
                      minimapEnabled ? (
                        <FormattedMessage {...messages.HideMinimap} />
                      ) : (
                        <FormattedMessage {...messages.ShowMinimap} />
                      )
                    }
                  </MenuItem>
                </MenuGroup>
              </React.Fragment>
            )
          }
        </MenuList>
      </MenuPopover>
    </Menu>
  ) : null;

}

export default React.memo(ContentMenuButton);
