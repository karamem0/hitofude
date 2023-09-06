//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import SyntaxHighlighter from 'react-syntax-highlighter';

import { useTheme } from '../../../../providers/ThemeProvider';

interface MarkdownCodeRendererProps {
  children?: React.ReactNode,
  className?: string,
  inline?: boolean
}

function MarkdownCodeRenderer(props: MarkdownCodeRendererProps) {

  const {
    children,
    className,
    inline
  } = props;

  const { theme } = useTheme();

  const match = /language-(\w+)/.exec(className ?? '');
  const lang = match?.at(1) ?? '';

  return inline ? (
    <code className={className}>
      {children}
    </code>
  ) : (
    <SyntaxHighlighter
      language={lang}
      wrapLongLines={true}
      style={{
        hljs: {},
        'hljs-addition': {
          color: theme.colorPaletteLightGreenForeground1
        },
        'hljs-built_in': {
          color: theme.colorPaletteRedForeground1
        },
        'hljs-comment': {
          color: theme.colorPaletteLightGreenForeground1
        },
        'hljs-deletion': {
          color: theme.colorPaletteRedForeground1
        },
        'hljs-keyword': {
          color: theme.colorPaletteBlueForeground2
        },
        'hljs-literal': {
          color: theme.colorPaletteRedForeground1
        },
        'hljs-meta': {
          color: theme.colorPaletteLightTealForeground2
        },
        'hljs-number': {
          color: theme.colorPaletteCranberryForeground2
        },
        'hljs-quote': {
          color: theme.colorPaletteLightGreenForeground1
        },
        'hljs-string': {
          color: theme.colorPaletteCranberryForeground2
        }
      }}>
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  );

}

export default React.memo(MarkdownCodeRenderer);
