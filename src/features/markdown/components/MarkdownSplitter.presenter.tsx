//
// Copyright (c) 2023-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { css } from '@emotion/react';
import { Button } from '@fluentui/react-components';
import { ChevronDoubleLeft16Regular, ChevronDoubleRight16Regular } from '@fluentui/react-icons';
import { useTheme } from '../../../providers/ThemeProvider';
import { layouts } from '../../../themes/Layout';
import { EventHandler } from '../../../types/Event';

interface MarkdownSplitterProps {
  className?: string,
  showPreview?: boolean,
  onChangeShowPreview?: EventHandler<boolean>
}

function MarkdownSplitter(props: Readonly<MarkdownSplitterProps>) {

  const {
    className,
    showPreview,
    onChangeShowPreview
  } = props;

  const { theme } = useTheme();

  return showPreview ? (
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
      onClick={(event) => onChangeShowPreview?.(event, !showPreview)}>
      <ChevronDoubleRight16Regular
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
      onClick={(event) => onChangeShowPreview?.(event, !showPreview)}>
      <ChevronDoubleLeft16Regular
        css={css`
          font-size: 0.5rem;
          line-height: 0.5rem;
        `} />
    </Button>
  );

}

export default React.memo(MarkdownSplitter);
