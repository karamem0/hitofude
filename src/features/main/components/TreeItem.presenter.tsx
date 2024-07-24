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

import { useTheme } from '../../../providers/ThemeProvider';
import { EventHandler } from '../../../types/Event';
import messages from '../messages';

interface TreeItemProps {
  icon?: React.ReactNode,
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
        display: grid;
        grid-template-rows: auto;
        grid-template-columns: 1fr auto;
        align-items: center;
        justify-content: start;
        cursor: pointer;
        user-select: none;
        & > button {
          display: none;
        }
        &:hover {
          background-color: ${theme.colorNeutralBackground2Hover};
          & > button {
            display: inherit;
          }
        }
        &:focus {
          & > button {
            display: inherit;
          }
        }
        &[aria-selected='true'] {
          background-color: ${theme.colorNeutralBackground2Selected};
        }
      `}>
      <div role="cell">
        <button
          aria-label={name}
          tabIndex={-1}
          title={name}
          css={css`
            display: grid;
            grid-template-rows: auto;
            grid-template-columns: auto 1fr;
            grid-gap: 0.5rem;
            align-items: center;
            justify-content: start;
            padding: 0.5rem;
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
        </button>
      </div>
      {
        menuEnabled ? (
          <Menu>
            <MenuTrigger>
              <button
                aria-label={intl.formatMessage(messages.MoreOption)}
                tabIndex={-1}
                title={intl.formatMessage(messages.MoreOption)}
                css={css`
                  padding: 0.5rem;
                  font-size: 1rem;
                  line-height: 1rem;
                `}>
                <MoreVerticalIcon />
              </button>
            </MenuTrigger>
            <MenuPopover>
              {menu}
            </MenuPopover>
          </Menu>
        ) : null
      }
    </div>
  );
}

export default React.memo(TreeItem);
