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
import { ChevronLeft16Regular, MoreVertical16Regular } from '@fluentui/react-icons';
import { EventHandler } from '../../types/Event';
import { GrOnedrive } from 'react-icons/gr';
import { css } from '@emotion/react';
import messages from '../../features/main/messages';
import { useIntl } from 'react-intl';

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
        grid-gap: 0.25rem;
        align-items: center;
        justify-content: start;
        padding: 0 0.5rem;
        margin: 1px;
        font-weight: bold;
        user-select: none;
        border: 1px solid transparent;
        & > button:last-of-type {
          display: none;
        }
        &:hover {
          & > button:last-of-type {
            display: inherit;
          }
        }
      `}>
      {
        root ? (
          <div
            css={css`
              display: flex;
              align-items: center;
              justify-content: center;
              width: 2rem;
              height: 2rem;
            `}>
            <GrOnedrive />
          </div>
        ) : (
          <Button
            appearance="transparent"
            aria-label={intl.formatMessage(messages.Back)}
            tabIndex={0}
            title={intl.formatMessage(messages.Back)}
            css={css`
              max-width: 2rem;
              height: 2rem;
            `}
            icon={(
              <ChevronLeft16Regular />
            )}
            onClick={(event) => !root && onClick?.(event)} />
        )
      }
      <div
        css={css`
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        `}>
        <Text
          aria-label={name}
          as="h3"
          title={name}
          css={css`
            font-weight: bold;
          `}>
          {name}
        </Text>
      </div>
      <Menu>
        <MenuTrigger>
          <Button
            appearance="transparent"
            aria-label={intl.formatMessage(messages.MoreOption)}
            role="button"
            tabIndex={0}
            title={intl.formatMessage(messages.MoreOption)}
            css={css`
              max-width: 2rem;
              height: 2rem;
            `}
            icon={(
              <MoreVertical16Regular />
            )} />
        </MenuTrigger>
        <MenuPopover>
          {menu}
        </MenuPopover>
      </Menu>
    </div>
  );
}

export default React.memo(TreeHeader);
