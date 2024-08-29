//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { DoubleChevronLeftIcon, DoubleChevronRightIcon } from '@fluentui/react-icons-mdl2';
import { Button } from '@fluentui/react-components';
import { EventHandler } from '../../../types/Event';
import { css } from '@emotion/react';
import { layouts } from '../../../themes/Layout';
import { useTheme } from '../../../providers/ThemeProvider';

interface MarkdownSplitterProps {
  className?: string,
  preview?: boolean,
  onChangePreview?: EventHandler<boolean>
}

function MarkdownSplitter(props: Readonly<MarkdownSplitterProps>) {

  const {
    className,
    preview,
    onChangePreview
  } = props;

  const { theme: { theme } } = useTheme();

  return preview ? (
    <Button
      appearance="subtle"
      className={className}
      role="separator"
      css={css`
        display: grid;
        place-items: center center;
        min-width: 1rem;
        padding: 0;
        text-align: center;
        background-color: ${theme.colorNeutralBackground2};
      `}
      onClick={(event) => onChangePreview?.(event, !preview)}>
      <DoubleChevronRightIcon
        css={css`
            font-size: 0.5rem;
            line-height: 0.5rem;
          `} />
    </Button>
  ) : (
    <Button
      appearance="subtle"
      className={className}
      role="separator"
      css={css`
        position: fixed;
        right: 1rem;
        display: grid;
        place-items: center center;
        min-width: 1rem;
        padding: 0;
        text-align: center;
        background-color: ${theme.colorNeutralBackground2};
        @media all and (width <= 960px) {
          height: ${layouts.contentBody.height.small};
        }
        @media not all and (width <= 960px) {
          height: ${layouts.contentBody.height.large};
        }
      `}
      onClick={(event) => onChangePreview?.(event, !preview)}>
      <DoubleChevronLeftIcon
        css={css`
            font-size: 0.5rem;
            line-height: 0.5rem;
          `} />
    </Button>
  );

}

export default React.memo(MarkdownSplitter);
