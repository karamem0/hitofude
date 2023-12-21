//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { css } from '@emotion/react';

import { useTheme } from '../../../providers/ThemeProvider';
import { EventHandler } from '../../../types/Event';

interface AppBarButtonProps {
  disabled?: boolean,
  focused?: boolean,
  icon?: React.ReactElement,
  selected?: boolean,
  title?: string,
  onClick?: EventHandler,
  onFocusChanged?: EventHandler<boolean>
}

function AppBarButton(props: Readonly<AppBarButtonProps>) {

  const {
    disabled,
    focused,
    icon,
    selected,
    title,
    onClick,
    onFocusChanged
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
      <div
        aria-disabled={disabled}
        aria-label={title}
        role="button"
        tabIndex={0}
        title={title}
        css={css`
          display: grid;
          align-items: center;
          justify-content: center;
          width: 2.5rem;
          height: 2.5rem;
        `}
        onClick={(e) => !disabled && onClick?.(e)}
        onKeyDown={(e) => e.key === 'Enter' && !disabled && onClick?.(e)}
        onMouseEnter={(e) => onFocusChanged?.(e, true)}
        onMouseLeave={(e) => onFocusChanged?.(e, false)}>
        <span
          css={css`
            font-size: 1.5rem;
            color: ${focused || selected ? theme.colorNeutralForeground1 : theme.colorNeutralForegroundDisabled};
          `}>
          {icon}
        </span>
      </div>
    </div>
  );

}

export default React.memo(AppBarButton);
