//
// Copyright (c) 2023-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { ThemeName } from '../../types/Model';
import { css } from '@emotion/react';
import { useTheme } from '../../providers/ThemeProvider';

interface ScrollPanelProps {
  className?: string
}

function ScrollPanel(props: Readonly<React.PropsWithChildren<ScrollPanelProps>>, ref: React.Ref<HTMLDivElement>) {

  const {
    children,
    className
  } = props;

  const {
    theme,
    themeName
  } = useTheme();

  const scrollBarThumbColor = React.useMemo(() => {
    switch (themeName) {
      case ThemeName.light:
        return 'rgba(100, 100, 100, 0.4)';
      case ThemeName.dark:
        return 'rgba(100, 100, 100, 0.7)';
      default:
        return undefined;
    }
  }, [
    themeName
  ]);

  return (
    <div
      ref={ref}
      className={className}
      tabIndex={-1}
      css={css`
        ::-webkit-scrollbar {
          width: 0.875rem;
          background-color: transparent;
          border: 1px solid ${theme.colorNeutralStencil1};
        }
        ::-webkit-scrollbar-thumb {
          background-color: ${scrollBarThumbColor};
        }
        overflow: hidden auto;
        &:focus {
          outline: none;
        }
      `}>
      {children}
    </div>
  );

}

export default React.memo(React.forwardRef(ScrollPanel));
