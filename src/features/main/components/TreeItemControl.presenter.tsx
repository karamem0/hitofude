//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { css } from '@emotion/react';
import {
  Menu,
  MenuPopover,
  MenuTrigger,
  Text
} from '@fluentui/react-components';
import { MoreVerticalIcon } from '@fluentui/react-icons-mdl2';

import { themeConfig } from '../../../providers/ThemeProvider';
import { EventHandler } from '../../../types/Event';

interface TreeItemControlProps {
  icon?: React.ReactNode,
  key?: React.Key,
  menu?: React.ReactNode,
  name?: string,
  selected?: boolean,
  onClick?: EventHandler
}

function TreeItemControl(props: TreeItemControlProps) {

  const {
    icon,
    key,
    menu,
    name,
    selected,
    onClick
  } = props;

  return (
    <div
      key={key}
      aria-selected={selected}
      role="listitem"
      tabIndex={0}
      css={css`
        display: grid;
        grid-template-rows: auto;
        grid-template-columns: 1fr auto;
        grid-gap: 0.5rem;
        align-items: center;
        justify-content: start;
        padding: 0.5rem;
        cursor: pointer;
        &:hover {
          background-color: ${themeConfig.colorNeutralBackground2Hover};
          &>div:nth-of-type(2) {
            display: inherit;
          }
        }
        &:focus {
          &>div:nth-of-type(2) {
            display: inherit;
          }
        }
        &[aria-selected=true] {
          background-color: ${themeConfig.colorNeutralBackground2Selected};
        }
        &>div:nth-of-type(2) {
          display: none;
        }
      `}>
      <div
        aria-label={name}
        role="button"
        title={name}
        css={css`
          display: grid;
          grid-template-rows: auto;
          grid-template-columns: auto 1fr;
          grid-gap: 0.5rem;
          align-items: center;
          justify-content: start;
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
      </div>
      <Menu>
        <MenuTrigger>
          <div role="button">
            <MoreVerticalIcon
              css={css`
                font-size: 1rem;
              `} />
          </div>
        </MenuTrigger>
        <MenuPopover>
          {menu}
        </MenuPopover>
      </Menu>
    </div>
  );
}

export default React.memo(TreeItemControl);
