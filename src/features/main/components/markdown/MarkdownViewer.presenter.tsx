//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import ReactMarkdown from 'react-markdown';

import { css } from '@emotion/react';
import remarkGfm from 'remark-gfm';

import { useTheme } from '../../../../providers/ThemeProvider';

import MarkdownCodeRenderer from './MarkdownCodeRenderer';
import MarkdownImageRenderer from './MarkdownImageRenderer';

interface MarkdownViewerProps {
  className?: string,
  text?: string
}

function MarkdownViewer(props: MarkdownViewerProps) {

  const {
    className,
    text
  } = props;

  const { theme } = useTheme();

  return text ? (
    <div
      className={className}
      css={css`
        a {
          color: ${theme.colorBrandForegroundLink};
        }
        a:hover {
          color: ${theme.colorBrandForegroundLinkHover};
        }
        a:focus {
          color: ${theme.colorBrandForegroundLinkHover};
        }
        blockquote {
          padding: 0 0 0 1rem;
          margin-block: 0.5rem;
          border-left: ${theme.colorBrandStroke2} 0.25rem solid;
        }
        code {
          padding: 0.25rem;
          font-family: Consolas, Menlo, Monaco, Meiryo, monospace;
          background-color: ${theme.colorNeutralBackground3};
        }
        h1 {
          margin-block: 0.5rem;
          font-size: ${theme.fontSizeHero800};
          line-height: calc(${theme.fontSizeHero800} * 1.5);
        }
        h2 {
          margin-block: 0.5rem;
          font-size: ${theme.fontSizeHero700};
          line-height: calc(${theme.fontSizeHero700} * 1.5);
        }
        h3 {
          margin-block: 0.5rem;
          font-size: ${theme.fontSizeBase600};
          line-height: calc(${theme.fontSizeBase600} * 1.5);
        }
        h4 {
          margin-block: 0.5rem;
          font-size: ${theme.fontSizeBase500};
          line-height: calc(${theme.fontSizeBase500} * 1.5);
        }
        h5 {
          margin-block: 0.5rem;
          font-size: ${theme.fontSizeBase400};
          line-height: calc(${theme.fontSizeBase400} * 1.5);
        }
        h6 {
          margin-block: 0.5rem;
          font-size: ${theme.fontSizeBase300};
          line-height: calc(${theme.fontSizeBase300} * 1.5);
        }
        li {
          margin-block: 0.5rem;
        }
        ol {
          margin-inline: 2rem 0;
          list-style-type: decimal;
        }
        pre {
          padding: 0.5rem;
          margin-block: 0.5rem;
          font-family: Consolas, Menlo, Monaco, Meiryo, monospace;
          background-color: ${theme.colorNeutralBackground3};
          & code {
            padding: 0;
            overflow-wrap: break-word;
          }
          & pre {
            padding: 0;
            margin-block: 0;
          }
        }
        table,
        th,
        td {
          padding: 0.5rem;
          border-spacing: 0;
          border-collapse: collapse;
          border: ${theme.colorNeutralBackground5} 1px solid;
          -webkit-border-horizontal-spacing: 0;
          -webkit-border-vertical-spacing: 0;
        }
        thead {
          background-color: ${theme.colorNeutralBackground3};
        }
        tbody {
          & > tr:nth-of-type(even) {
            background-color: ${theme.colorNeutralBackground2};
          }
        }
        ul {
          margin-inline: 2rem 0;
          list-style-type: disc;
        }
      `}>
      <ReactMarkdown
        remarkPlugins={[ remarkGfm ]}
        components={{
          code: MarkdownCodeRenderer,
          img: MarkdownImageRenderer
        }}>
        {text ?? ''}
      </ReactMarkdown>
    </div>
  ) : null;

}

export default React.memo(MarkdownViewer);
