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
  Text,
  Tooltip
} from '@fluentui/react-components';
import { ChevronLeft16Regular, MoreVertical16Regular } from '@fluentui/react-icons';
import { GrOnedrive } from 'react-icons/gr';
import { useIntl } from 'react-intl';
import messages from '../../features/main/messages';
import { EventHandler } from '../../types/Event';

interface TreeHeaderProps {
  menu?: React.ReactNode,
  mountNode?: HTMLElement,
  name?: string,
  root?: boolean,
  onClick?: EventHandler
}

function TreeHeader(props: Readonly<TreeHeaderProps>) {

  const {
    menu,
    mountNode,
    name,
    root,
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
          <Tooltip
            content={intl.formatMessage(messages.Back)}
            relationship="label">
            <Button
              appearance="transparent"
              tabIndex={0}
              css={css`
                max-width: 2rem;
                height: 2rem;
              `}
              icon={(
                <ChevronLeft16Regular />
              )}
              onClick={(event) => !root && onClick?.(event)} />
          </Tooltip>
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
      <Menu mountNode={mountNode}>
        <MenuTrigger>
          <Tooltip
            content={intl.formatMessage(messages.MoreOption)}
            relationship="label">
            <Button
              appearance="transparent"
              tabIndex={0}
              css={css`
                max-width: 2rem;
                height: 2rem;
              `}
              icon={(
                <MoreVertical16Regular />
              )} />
          </Tooltip>
        </MenuTrigger>
        <MenuPopover>
          {menu}
        </MenuPopover>
      </Menu>
    </div>
  );
}

export default React.memo(TreeHeader);
