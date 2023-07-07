//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import SyntaxHighlighter from 'react-syntax-highlighter';

import { codeStyle } from '../../../../providers/ThemeProvider';

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

  const match = /language-(\w+)/.exec(className ?? '');
  const lang = match?.at(1) ?? '';

  return inline ? (
    <code className={className}>
      {children}
    </code>
  ) : (
    <SyntaxHighlighter
      language={lang}
      style={codeStyle}
      wrapLongLines={true}>
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  );

}

export default React.memo(MarkdownCodeRenderer);
