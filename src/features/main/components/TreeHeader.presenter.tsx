//
// Copyright (c) 2023 karamem0
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
import { ChevronLeftIcon, MoreVerticalIcon } from '@fluentui/react-icons-mdl2';
import { OneDriveLogoIcon } from '@fluentui/react-icons-mdl2-branded';

import { css } from '@emotion/react';

import { EventHandler } from '../../../types/Event';
import messages from '../messages';

interface TreeHeaderProps {
  root?: boolean,
  menu?: React.ReactNode,
  name?: string,
  onClick?: EventHandler
}

function TreeHeader(props: Readonly<TreeHeaderProps>) {

  const {
    root,
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
        user-select: none;
        & > div:nth-of-type(3) {
          display: none;
        }
        &:hover {
          & > div:nth-of-type(3) {
            display: inherit;
          }
        }
      `}>
      <div
        aria-disabled={root}
        aria-label={intl.formatMessage(messages.Back)}
        role="button"
        tabIndex={-1}
        title={intl.formatMessage(messages.Back)}
        css={css`
          font-size: 1rem;
          line-height: 1rem;
        `}
        onClick={(e) => !root && onClick?.(e)}>
        {
          root ? (
            <OneDriveLogoIcon />
          ) : (
            <ChevronLeftIcon />
          )
        }
      </div>
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
          <div
            aria-label={intl.formatMessage(messages.MoreOption)}
            role="button"
            tabIndex={-1}
            title={intl.formatMessage(messages.MoreOption)}
            css={css`
              font-size: 1rem;
              line-height: 1rem;
            `}>
            <MoreVerticalIcon />
          </div>
        </MenuTrigger>
        <MenuPopover>
          {menu}
        </MenuPopover>
      </Menu>
    </div>
  );
}

export default React.memo(TreeHeader);
