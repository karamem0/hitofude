//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { useIntl } from 'react-intl';

import { css } from '@emotion/react';
import {
  Menu,
  MenuPopover,
  MenuTrigger,
  Text
} from '@fluentui/react-components';
import { ChevronLeftIcon, MoreVerticalIcon } from '@fluentui/react-icons-mdl2';

import { EventHandler } from '../../../types/Event';
import messages from '../messages';

interface TreeHeaderControlProps {
  disabled?: boolean,
  menu?: React.ReactNode,
  name?: string,
  onClick?: EventHandler
}

function TreeHeaderControl(props: TreeHeaderControlProps) {

  const {
    disabled,
    menu,
    name,
    onClick
  } = props;

  const intl = useIntl();

  return (
    <div
      css={css`
        display: grid;
        grid-template-rows: auto;
        grid-template-columns: auto 1fr auto;
        grid-gap: 0.5rem;
        align-items: center;
        justify-content: start;
        padding: 0 0.5rem;
        font-weight: bold;
        &>div:nth-of-type(3) {
          display: none;
        }
        &:hover {
          &>div:nth-of-type(3) {
            display: inherit;
          }
        }
      `}>
      <ChevronLeftIcon
        aria-disabled={disabled}
        aria-label={intl.formatMessage(messages.Back)}
        role="button"
        title={intl.formatMessage(messages.Back)}
        css={css`
          font-size: 1rem;
        `}
        onClick={(e) => !disabled && onClick?.(e)} />
      <div
        css={css`
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        `}>
        <Text
          aria-label={name}
          title={name}
          css={css`
            font-weight: bold;
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

export default React.memo(TreeHeaderControl);
