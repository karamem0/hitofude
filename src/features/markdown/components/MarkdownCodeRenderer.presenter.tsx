//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import Mermaid from '../../../common/components/Mermaid';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { useTheme } from '../../../providers/ThemeProvider';

interface MarkdownCodeRendererProps {
  language?: string,
  text?: string
}

function MarkdownCodeRenderer(props: Readonly<MarkdownCodeRendererProps>) {

  const {
    language,
    text,
    ...extraProps
  } = props;

  const { theme } = useTheme();

  return language ? (() => {
    if (language === 'mermaid') {
      return (
        <Mermaid {...extraProps}>
          {text ?? ''}
        </Mermaid>
      );
    } else {
      return (
        <SyntaxHighlighter
          language={language}
          wrapLongLines={true}
          style={{
            'hljs': {},
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
          }}
          {...extraProps}>
          {text?.replace(/\n$/, '') ?? ''}
        </SyntaxHighlighter>
      );
    }
  })() : (
    <pre {...extraProps}>
      <code>
        {text ?? ''}
      </code>
    </pre>
  );

}

export default React.memo(MarkdownCodeRenderer);
