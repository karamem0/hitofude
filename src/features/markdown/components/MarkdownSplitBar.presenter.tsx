//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { DoubleChevronLeftIcon, DoubleChevronRightIcon } from '@fluentui/react-icons-mdl2';

import { css } from '@emotion/react';

import { useTheme } from '../../../providers/ThemeProvider';
import { layouts } from '../../../themes/Layout';
import { EventHandler } from '../../../types/Event';

interface SplitBarProps {
  preview?: boolean,
  tabOpen?: boolean,
  onChangePreview?: EventHandler<boolean>
}

function MarkdownSplitBar(props: Readonly<SplitBarProps>) {

  const {
    preview,
    tabOpen,
    onChangePreview
  } = props;

  const { theme } = useTheme();

  return preview ? (
    <div
      role="button"
      tabIndex={-1}
      css={css`
        position: fixed;
        display: grid;
        place-items: center center;
        width: 1rem;
        text-align: center;
        background-color: ${theme.colorNeutralBackground2};
        @media all and (width <= 960px) {
          right: calc(${layouts.contentBody.width.small} / 2 + 1rem);
          height: ${layouts.contentBody.height.small};
        }
        @media not all and (width <= 960px) {
          right: calc(${tabOpen ? layouts.contentBody.width.large : layouts.contentBody.width.small} / 2 + 1rem);
          height: ${layouts.contentBody.height.large};
        }
      `}
      onClick={(e) => onChangePreview?.(e, !preview)}>
      {
        <DoubleChevronRightIcon
          css={css`
            font-size: 0.5rem;
            line-height: 0.5rem;
          `} />
      }
    </div>
  ) : (
    <div
      role="button"
      tabIndex={-1}
      css={css`
        position: fixed;
        right: 1rem;
        display: grid;
        place-items: center center;
        width: 1rem;
        text-align: center;
        background-color: ${theme.colorNeutralBackground2};
        @media all and (width <= 960px) {
          height: ${layouts.contentBody.height.small};
        }
        @media not all and (width <= 960px) {
          height: ${layouts.contentBody.height.large};
        }
      `}
      onClick={(e) => onChangePreview?.(e, !preview)}>
      {
        <DoubleChevronLeftIcon
          css={css`
            font-size: 0.5rem;
            line-height: 0.5rem;
          `} />
      }
    </div>
  );

}

export default React.memo(MarkdownSplitBar);
