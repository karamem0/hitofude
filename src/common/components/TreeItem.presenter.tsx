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
  Button,
  Menu,
  MenuPopover,
  MenuTrigger,
  Tooltip
} from '@fluentui/react-components';
import { MoreVertical16Regular } from '@fluentui/react-icons';
import { useIntl } from 'react-intl';
import messages from '../../features/main/messages';
import { useTheme } from '../../providers/ThemeProvider';
import { EventHandler } from '../../types/Event';
import TreeItemButton from './TreeItemButton';

interface TreeItemProps {
  icon?: React.ReactElement,
  info?: React.ReactNode,
  menu?: React.ReactNode,
  name?: string,
  selected?: boolean,
  title?: React.ReactElement,
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
    title,
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
        <TreeItemButton
          icon={icon}
          name={name}
          title={title}
          onClick={onClick} />
        {info}
        {
          menu ? (
            <Menu>
              <MenuTrigger>
                <Tooltip
                  content={intl.formatMessage(messages.MoreOption)}
                  relationship="label">
                  <Button
                    appearance="transparent"
                    aria-label={intl.formatMessage(messages.MoreOption)}
                    tabIndex={0}
                    icon={(
                      <MoreVertical16Regular />
                    )} />
                </Tooltip>
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
