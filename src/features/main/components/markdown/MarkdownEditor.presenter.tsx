//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { css } from '@emotion/react';

import { useTheme } from '../../../../providers/ThemeProvider';

interface MarkdownEditorProps {
  className?: string
}

function MarkdownEditor(props: MarkdownEditorProps, ref: React.Ref<HTMLDivElement>) {

  const {
    className
  } = props;

  const { theme } = useTheme();

  return (
    <div
      ref={ref}
      className={className}
      css={css`
        width: inherit;
        height: inherit;
        border: 0.05rem solid ${theme.colorNeutralStrokeAlpha};
      `} />
  );

}

export default React.memo(React.forwardRef(MarkdownEditor));
