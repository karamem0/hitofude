//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { EventHandler } from '../../types/Event';
import { FormattedMessage } from 'react-intl';
import { Text } from '@fluentui/react-components';
import { css } from '@emotion/react';
import messages from '../messages';
import { useTheme } from '../../providers/ThemeProvider';

interface TreeProps {
  disabled?: boolean,
  onKeyDown?: EventHandler
}

function Tree(props: Readonly<React.PropsWithChildren<TreeProps>>, ref: React.Ref<HTMLDivElement>) {

  const {
    children,
    disabled,
    onKeyDown
  } = props;

  const { theme } = useTheme();

  return (
    <div
      ref={ref}
      role="menu"
      tabIndex={0}
      css={css`
        display: flex;
        flex-direction: column;
        grid-gap: 0.25rem;
        overflow: hidden auto;
      `}
      onKeyDown={onKeyDown}>
      {
        disabled ? (
          <Text
            css={css`
              font-size: ${theme.fontSizeBase200};
              line-height: calc(${theme.lineHeightBase200} * 1.25);
              text-align: center;
            `}>
            <FormattedMessage {...messages.NoItemsFound} />
          </Text>
        ) : (
          children
        )
      }
    </div>
  );

}

export default React.memo(React.forwardRef(Tree));
