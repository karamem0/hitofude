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

import { themeConfig } from '../../../../providers/ThemeProvider';

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

  return text ? (
    <div
      className={className}
      css={css`
        a {
          color: ${themeConfig.colorBrandForegroundLink};
        }
        a:hover {
          color: ${themeConfig.colorBrandForegroundLinkHover};
        }
        a:focus {
          color: ${themeConfig.colorBrandForegroundLinkHover};
        }
        blockquote {
          padding: 0 0 0 1rem;
          margin-block: 0.5rem;
          border-left: ${themeConfig.colorBrandStroke2} 0.25rem solid;
        }
        code {
          padding: 0.25rem;
          font-family: Consolas, Menlo, Monaco, Meiryo, monospace;
          background-color: ${themeConfig.colorNeutralBackground3};
        }
        h1 {
          margin-block: 0.5rem;
          font-size: ${themeConfig.fontSizeHero800};
          line-height: calc(${themeConfig.fontSizeHero800} * 1.5);
        }
        h2 {
          margin-block: 0.5rem;
          font-size: ${themeConfig.fontSizeHero700};
          line-height: calc(${themeConfig.fontSizeHero700} * 1.5);
        }
        h3 {
          margin-block: 0.5rem;
          font-size: ${themeConfig.fontSizeBase600};
          line-height: calc(${themeConfig.fontSizeBase600} * 1.5);
        }
        h4 {
          margin-block: 0.5rem;
          font-size: ${themeConfig.fontSizeBase500};
          line-height: calc(${themeConfig.fontSizeBase500} * 1.5);
        }
        h5 {
          margin-block: 0.5rem;
          font-size: ${themeConfig.fontSizeBase400};
          line-height: calc(${themeConfig.fontSizeBase400} * 1.5);
        }
        h6 {
          margin-block: 0.5rem;
          font-size: ${themeConfig.fontSizeBase300};
          line-height: calc(${themeConfig.fontSizeBase300} * 1.5);
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
          background-color: ${themeConfig.colorNeutralBackground3};
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
          border: ${themeConfig.colorNeutralBackground5} 1px solid;
          -webkit-border-horizontal-spacing: 0;
          -webkit-border-vertical-spacing: 0;
        }
        thead {
          background-color: ${themeConfig.colorNeutralBackground3};
        }
        tbody {
          & > tr:nth-of-type(even) {
            background-color: ${themeConfig.colorNeutralBackground2};
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

export default MarkdownViewer;
