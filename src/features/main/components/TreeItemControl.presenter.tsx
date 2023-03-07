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
import { MoreVerticalIcon } from '@fluentui/react-icons-mdl2';

import { themeConfig } from '../../../providers/ThemeProvider';
import { EventHandler } from '../../../types/Event';
import messages from '../messages';

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

  const intl = useIntl();

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
        align-items: center;
        justify-content: start;
        cursor: pointer;

        & > div:nth-of-type(2) {
          display: none;
        }

        &:hover {
          background-color: ${themeConfig.colorNeutralBackground2Hover};

          & > div:nth-of-type(2) {
            display: inherit;
          }
        }

        &:focus {
          & > div:nth-of-type(2) {
            display: inherit;
          }
        }

        &[aria-selected='true'] {
          background-color: ${themeConfig.colorNeutralBackground2Selected};
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
      </div>
      {
        menu ? (
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
              {menu}
            </MenuPopover>
          </Menu>
        ) : null
      }
    </div>
  );
}

export default React.memo(TreeItemControl);
