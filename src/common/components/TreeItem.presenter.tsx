//
// Copyright (c) 2023-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import {
  Button,
  Menu,
  MenuPopover,
  MenuTrigger,
  Text
} from '@fluentui/react-components';
import { EventHandler } from '../../types/Event';
import { MoreVertical16Regular } from '@fluentui/react-icons';
import { css } from '@emotion/react';
import messages from '../../features/main/messages';
import { useIntl } from 'react-intl';
import { useTheme } from '../../providers/ThemeProvider';

interface TreeItemProps {
  icon?: React.ReactElement,
  info?: React.ReactNode,
  menu?: React.ReactNode,
  name?: string,
  selected?: boolean,
  onClick?: EventHandler,
  onKeyDown?: EventHandler
}

function TreeItem(props: Readonly<TreeItemProps>) {

  const {
    icon,
    info,
    menu,
    name,
    selected,
    onClick,
    onKeyDown
  } = props;

  const intl = useIntl();
  const { theme } = useTheme();

  return (
    <div
      aria-current={selected}
      role="menuitem"
      tabIndex={0}
      css={css`
        padding: 0 0.5rem;
        margin: 1px;
        cursor: pointer;
        user-select: none;
        border: 1px solid transparent;
        &[aria-current='true'] {
          background-color: ${theme.colorNeutralBackground2Selected};
        }
        &:hover {
          background-color: ${theme.colorNeutralBackground2Hover};
        }
      `}
      onKeyDown={onKeyDown}
      onTouchStart={onClick}>
      <div
        css={css`
          display: grid;
          grid-template-rows: auto;
          grid-template-columns: 1fr auto auto;
          align-items: center;
          justify-content: start;
          & > button:last-of-type {
            visibility: ${menu ? 'hidden' : 'inherit'};
          }
          &:hover {
            & > button:last-of-type {
              visibility: inherit;
            }
          }
        `}>
        <Button
          appearance="transparent"
          tabIndex={-1}
          css={css`
            display: flex;
            align-items: center;
            justify-content: start;
            padding: 0;
            border: 0;
          `}
          onClick={onClick}>
          <div
            css={css`
              display: grid;
              grid-template-rows: auto;
              grid-template-columns: auto 1fr;
              grid-gap: 0.25rem;
              align-items: center;
              justify-content: start;
            `}>
            <div
              css={css`
                display: flex;
                align-items: center;
                justify-content: center;
                width: 2rem;
                height: 2rem;
              `}>
              {icon}
            </div>
            <Text
              css={css`
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              `}>
              {name}
            </Text>
          </div>
        </Button>
        {info}
        {
          menu ? (
            <Menu>
              <MenuTrigger>
                <Button
                  appearance="transparent"
                  aria-label={intl.formatMessage(messages.MoreOption)}
                  tabIndex={0}
                  title={intl.formatMessage(messages.MoreOption)}
                  icon={(
                    <MoreVertical16Regular />
                  )} />
              </MenuTrigger>
              <MenuPopover>
                {menu}
              </MenuPopover>
            </Menu>
          ) : null
        }
      </div>
    </div>
  );
}

export default React.memo(TreeItem);
