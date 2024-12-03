//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import MarkdownCodeRenderer from './MarkdownCodeRenderer';
import MarkdownImageRenderer from './MarkdownImageRenderer';
import MarkdownLinkRenderer from './MarkdownLinkRenderer';
import ReactMarkdown from 'react-markdown';
import { css } from '@emotion/react';
import messages from '../messages';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { useIntl } from 'react-intl';
import { useTheme } from '../../../providers/ThemeProvider';

interface MarkdownViewerProps {
  className?: string,
  text?: string
}

function MarkdownViewer(props: Readonly<MarkdownViewerProps>) {

  const {
    className,
    text
  } = props;

  const intl = useIntl();
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
          font-family: SFMono-Regular, Consolas, Menlo, Monaco, Meiryo, monospace;
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
        p {
          margin-block: 0.25rem;
        }
        pre {
          padding: 0.5rem;
          margin-block: 0.5rem;
          font-family: SFMono-Regular, Consolas, Menlo, Monaco, Meiryo, monospace;
          background-color: ${theme.colorNeutralBackground3};
          code {
            padding: 0;
          }
        }
        section #footnote-label {
          margin-block: 2rem 0;
          font-size: 0;
          line-height: 0;
          &::after {
            display: block;
            font-size: 1rem;
            line-height: calc(1rem * 1.25);
            content: '${intl.formatMessage(messages.Footnotes)}';
          }
        }
        table {
          margin: 0.5rem 0;
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
        rehypePlugins={[ rehypeRaw ]}
        remarkPlugins={[[ remarkGfm, { label: '' } ]]}
        components={{
          a: MarkdownLinkRenderer,
          img: MarkdownImageRenderer,
          pre: MarkdownCodeRenderer
        }}>
        {text ?? ''}
      </ReactMarkdown>
    </div>
  ) : null;

}

export default React.memo(MarkdownViewer);
