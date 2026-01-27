//
// Copyright (c) 2023-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { css } from '@emotion/react';
import { Button, Tooltip } from '@fluentui/react-components';
import { useTheme } from '../../../providers/ThemeProvider';
import { EventHandler } from '../../../types/Event';

interface AppBarButtonProps {
  disabled?: boolean,
  focused?: boolean,
  icon?: React.ReactElement,
  id?: string,
  name?: string,
  selected?: boolean,
  title?: string | React.ReactElement,
  onClick?: EventHandler
}

function AppBarButton(props: Readonly<AppBarButtonProps>) {

  const {
    disabled,
    icon,
    name,
    selected,
    title,
    onClick
  } = props;

  const { theme } = useTheme();

  return (
    <div
      css={css`
        display: grid;
        grid-template-rows: auto;
        grid-template-columns: 0.25rem 2.5rem;
        grid-gap: 0.25rem;
        margin-right: 0.5rem;
      `}>
      <div
        css={css`
          background-color: ${selected ? theme.colorBrandBackground : 'transparent'};
        `} />
      <Tooltip
        content={title ?? name ?? ''}
        relationship="label">
        <Button
          appearance="transparent"
          aria-controls={name}
          aria-disabled={disabled}
          aria-selected={selected}
          icon={icon}
          role="tab"
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
          `}
          onClick={(event) => !disabled && onClick?.(event)} />
      </Tooltip>
    </div>
  );

}

export default React.memo(AppBarButton);
