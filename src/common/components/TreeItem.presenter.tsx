//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { useIntl } from 'react-intl';

import {
  Menu,
  MenuPopover,
  MenuTrigger,
  Text
} from '@fluentui/react-components';
import { MoreVerticalIcon } from '@fluentui/react-icons-mdl2';

import { css } from '@emotion/react';

import messages from '../../features/main/messages';
import { useTheme } from '../../providers/ThemeProvider';
import { EventHandler } from '../../types/Event';

interface TreeItemProps {
  icon?: React.ReactNode,
  info?: React.ReactNode,
  key?: React.Key,
  menu?: React.ReactNode,
  menuEnabled?: boolean,
  name?: string,
  selected?: boolean,
  onClick?: EventHandler
}

function TreeItem(props: Readonly<TreeItemProps>) {

  const {
    icon,
    info,
    key,
    menu,
    menuEnabled,
    name,
    selected,
    onClick
  } = props;

  const intl = useIntl();
  const { theme } = useTheme();

  return (
    <div
      key={key}
      aria-selected={selected}
      role="row"
      tabIndex={-1}
      css={css`
        cursor: pointer;
        user-select: none;
        &[aria-selected='true'] {
          background-color: ${theme.colorNeutralBackground2Selected};
        }
      `}>
      <div role="cell">
        <div
          css={css`
            display: grid;
            grid-template-rows: auto;
            grid-template-columns: 1fr auto;
            align-items: center;
            justify-content: start;
            & > div[role="button"]:nth-child(2) {
              display: none;
            }
            &:hover {
              background-color: ${theme.colorNeutralBackground2Hover};
              & > div[role="button"]:nth-child(2) {
                display: inherit;
              }
            }
            &:focus {
              & > div[role="button"]:nth-child(2) {
                display: inherit;
              }
            }
          `}>
          <div
            aria-label={name}
            role="button"
            tabIndex={-1}
            title={name}
            css={css`
              display: grid;
              grid-template-rows: auto;
              grid-template-columns: auto auto auto;
              grid-gap: 0.5rem;
              align-items: center;
              justify-content: start;
              padding: 0.5rem;
              color: ${theme.colorNeutralForeground1};
            `}
            onClick={onClick}>
            {icon}
            <Text
              css={css`
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              `}>
              {name}
            </Text>
            {info}
          </div>
          {
            menuEnabled ? (
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
                      color: ${theme.colorNeutralForeground1};
                    `}>
                    <MoreVerticalIcon />
                  </div>
                </MenuTrigger>
                <MenuPopover>
                  {menu}
                </MenuPopover>
              </Menu>
            ) : null
          }
        </div>
      </div>
    </div>
  );
}

export default React.memo(TreeItem);
