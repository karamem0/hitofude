//
// Copyright (c) 2023-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { css } from '@emotion/react';
import { useTheme } from '../../../providers/ThemeProvider';
import { layouts } from '../../../themes/Layout';

interface MarkdownEditorProps {
  className?: string,
  preview?: boolean,
  tabOpen?: boolean
}

function MarkdownEditor(props: Readonly<MarkdownEditorProps>, ref: React.Ref<HTMLDivElement>) {

  const {
    className,
    preview,
    tabOpen
  } = props;

  const { theme } = useTheme();

  return (
    <div
      css={css`
        height: 100%;
        @media all and (width <= 960px) {
          width: calc(${layouts.contentBody.width.small} / ${preview ? 2 : 1} - 1rem);
        }
        @media not all and (width <= 960px) {
          width: calc(${tabOpen ? layouts.contentBody.width.large : layouts.contentBody.width.small} / ${preview ? 2 : 1} - 1rem);
        }
      `}>
      <div
        className={className}
        ref={ref}
        css={css`
        width: inherit;
        height: inherit;
        border: 0.05rem solid ${theme.colorNeutralStrokeAlpha};
      `} />
    </div>
  );

}

export default React.memo(React.forwardRef(MarkdownEditor));
