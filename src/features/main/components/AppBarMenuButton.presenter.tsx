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
  MenuProps,
  MenuTrigger,
  Tooltip
} from '@fluentui/react-components';
import { useTheme } from '../../../providers/ThemeProvider';

interface AppBarMenuButtonProps {
  icon?: React.ReactElement,
  menu?: React.ReactNode,
  menuProps?: Partial<MenuProps>,
  title?: string | React.ReactElement
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
          <Tooltip
            content={title ?? ''}
            relationship="label">
            <Button
              appearance="transparent"
              icon={icon}
              tabIndex={0}
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
          </Tooltip>
        </MenuTrigger>
        <MenuPopover>
          {menu}
        </MenuPopover>
      </Menu>
    </div>
  );

}

export default React.memo(AppBarMenuButton);
