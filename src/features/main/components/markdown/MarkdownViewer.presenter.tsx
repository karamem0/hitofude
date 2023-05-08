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
import MarkdownImgRenderer from './MarkdownImgRenderer';

interface MarkdownViewerProps {
  className?: string,
  value?: string
}

function MarkdownViewer(props: MarkdownViewerProps) {

  const {
    className,
    value
  } = props;

  return value ? (
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
          font-size: 1.75rem;
          line-height: calc(1.75rem * 1.25);
        }
        h2 {
          margin-block: 0.5rem;
          font-size: 1.6rem;
          line-height: calc(1.6rem * 1.25);
        }
        h3 {
          margin-block: 0.5rem;
          font-size: 1.45rem;
          line-height: calc(1.45rem * 1.25);
        }
        h4 {
          margin-block: 0.5rem;
          font-size: 1.3rem;
          line-height: calc(1.3rem * 1.25);
        }
        h5 {
          margin-block: 0.5rem;
          font-size: 1.15rem;
          line-height: calc(1.15rem * 1.25);
        }
        h6 {
          margin-block: 0.5rem;
          font-size: 1rem;
          line-height: calc(1rem * 1.25);
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
          img: MarkdownImgRenderer
        }}>
        {value || ''}
      </ReactMarkdown>
    </div>
  ) : null;

}

export default MarkdownViewer;
