//
// Copyright (c) 2023-2024 karamem0
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
  MenuProps,
  MenuTrigger
} from '@fluentui/react-components';
import { css } from '@emotion/react';
import { useTheme } from '../../../providers/ThemeProvider';

interface AppBarMenuButtonProps {
  icon?: React.ReactElement,
  menu?: React.ReactNode,
  menuProps?: Partial<MenuProps>,
  title?: string
}

function AppBarMenuButton(props: Readonly<AppBarMenuButtonProps>) {

  const {
    icon,
    menu,
    menuProps,
    title
  } = props;

  const { theme } = useTheme();

  return (
    <div
      css={css`
        display: grid;
        grid-template-rows: auto;
        grid-template-columns: 2.5rem;
        grid-gap: 0.25rem;
        margin: 0 0.5rem;
      `}>
      <Menu {...menuProps}>
        <MenuTrigger>
          <Button
            appearance="transparent"
            aria-label={title}
            icon={icon}
            tabIndex={0}
            title={title}
            css={css`
              max-width: 2.5rem;
              height: 2.5rem;
              color: ${theme.colorNeutralForegroundDisabled};
              &[aria-selected='true'] {
                color: ${theme.colorNeutralForeground1};
              }
              &>span {
                width: 1.5rem;
                height: 1.5rem;
              }
            `} />
        </MenuTrigger>
        <MenuPopover>
          {menu}
        </MenuPopover>
      </Menu>
    </div>
  );

}

export default React.memo(AppBarMenuButton);
