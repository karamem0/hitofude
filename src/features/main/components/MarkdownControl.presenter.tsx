//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { Controller, useForm } from 'react-hook-form';
import { FormattedDate, FormattedMessage, useIntl } from 'react-intl';
import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';

import { css } from '@emotion/react';
import {
  Button,
  Spinner,
  Text,
  Textarea
} from '@fluentui/react-components';
import remarkGfm from 'remark-gfm';

import Communication from '../../../common/components/Communication';
import { codeStyle, themeConfig } from '../../../providers/ThemeProvider';
import { EventHandler } from '../../../types/Event';
import { File, FileContent } from '../../../types/Model';
import { isSupportedFile } from '../../../utils/File';
import messages from '../messages';
import { MarkdownControlFormState } from '../types/Form';

interface MarkdownControlProps {
  loading?: boolean,
  value?: File & FileContent,
  onCancel?: EventHandler,
  onEdit?: EventHandler,
  onSave?: EventHandler<string>
}

function MarkdownControl(props: MarkdownControlProps) {

  const {
    loading,
    value,
    onCancel,
    onEdit,
    onSave
  } = props;

  const intl = useIntl();
  const form = useForm<MarkdownControlFormState>();

  return (
    <section
      css={css`
          display: grid;
        `}>
      {
        loading ? (
          <Spinner />
        ) : (
          value ? (
            <form
              css={css`
                display: grid;
                grid-gap: 0.5rem;
                padding: 1rem;
                @media (max-width: 959px) {
                  grid-template-rows: auto auto 1fr;
                  grid-template-columns: auto;
                }
                @media (min-width: 960px) {
                  grid-template-rows: 3rem 1fr;
                  grid-template-columns: 1fr auto;
                }
              `}
              onSubmit={form.handleSubmit((formState) => onSave?.({}, formState.content))}>
              <div
                css={css`
                  display: grid;
                  align-items: center;
                  justify-content: left;
                  @media (min-width: 960px) {
                    grid-row: 1 / 2;
                    grid-column: 1 / 2;
                  }
                `}>
                <Text
                  css={css`
                    overflow: hidden;
                    font-size: 2rem;
                    font-weight: bold;
                    line-height: calc(2rem * 1.25);
                    text-overflow: ellipsis;
                    white-space: nowrap;
                  `}>
                  {value.baseName}
                </Text>
              </div>
              <div
                css={css`
                  display: grid;
                  grid-template-rows: auto;
                  grid-template-columns: auto auto;
                  grid-gap: 0.5rem;
                  align-items: center;
                  justify-content: right;
                  @media (min-width: 960px) {
                    grid-row: 1 / 2;
                    grid-column: 2 / 3;
                  }
                `}>
                {
                  value.editing ? (
                    <div
                      css={css`
                        display: flex;
                        grid-gap: 0.5rem;
                      `}>
                      <Button
                        appearance="primary"
                        aria-label={intl.formatMessage(messages.Save)}
                        disabled={!form.formState.isDirty}
                        title={intl.formatMessage(messages.Save)}
                        type="submit">
                        <FormattedMessage {...messages.Save} />
                      </Button>
                      <Button
                        aria-label={intl.formatMessage(messages.Cancel)}
                        title={intl.formatMessage(messages.Cancel)}
                        onClick={onCancel}>
                        <FormattedMessage {...messages.Cancel} />
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <Button
                        aria-label={intl.formatMessage(messages.Edit)}
                        disabled={!isSupportedFile(value)}
                        title={intl.formatMessage(messages.Edit)}
                        onClick={(e) => {
                          form.reset({
                            content: value.content
                          });
                          onEdit?.(e);
                        }}>
                        <FormattedMessage {...messages.Edit} />
                      </Button>
                    </div>
                  )
                }
                <Text
                  css={css`
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                  `}>
                  {
                    value.createdDate ? (
                      <FormattedDate
                        {...{
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit'
                        }}
                        value={value.updatedDate} />
                    ) : null
                  }
                </Text>
              </div>
              <div
                css={css`
                  display: grid;
                  overflow-x: auto;
                  overflow-y: auto;
                  @media (max-width: 959px) {
                    height: calc(100vh - 9.5rem);
                  }
                  @media (min-width: 960px) {
                    grid-row: 2 / 3;
                    grid-column: 1 / 3;
                    height: calc(100vh - 7.5rem);
                  }
                `}>
                {
                  value.editing ? (
                    <Controller
                      control={form.control}
                      name="content"
                      render={({ field }) => (
                        <Textarea
                          ref={field.ref}
                          resize="none"
                          value={field.value}
                          css={css`
                            display: grid;

                            textarea {
                              height: auto;
                              font-family: Consolas, Menlo, Monaco, Meiryo, monospace;
                            }
                          `}
                          onBlur={field.onBlur}
                          onChange={field.onChange} />
                      )} />
                  ) : (
                    isSupportedFile(value) ? (
                      <div
                        css={css`
                          padding: 0 1rem 0 0;

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

                          & > pre {
                            padding: 0.5rem;
                            margin-block: 0.5rem;
                          }

                          pre {
                            font-family: Consolas, Menlo, Monaco, Meiryo, monospace;
                            white-space: pre-wrap;
                            background-color: ${themeConfig.colorNeutralBackground3};

                            & code {
                              padding: 0;
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
                            code: ({ inline, className, children }) => {
                              const match = /language-(\w+)/.exec(className || '');
                              const lang = match && match[1] ? match[1] : '';
                              return inline ? (
                                <code className={className}>{children}</code>
                              ) : (
                                <SyntaxHighlighter
                                  language={lang}
                                  style={codeStyle}>
                                  {String(children).replace(/\n$/, '')}
                                </SyntaxHighlighter>
                              );
                            }
                          }}>
                          {value.content || ''}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <div
                        css={css`
                          display: flex;
                          flex-flow: column;
                          align-items: center;
                          justify-content: center;
                        `}>
                        <Communication
                          description={intl.formatMessage(messages.UnsupportedFileDescription)}
                          image="/assets/Cancel.svg"
                          title={intl.formatMessage(messages.UnsupportedFileTitle)} />
                      </div>
                    )
                  )
                }
              </div>
            </form>
          ) : (
            <div
              css={css`
                display: flex;
                flex-flow: column;
                align-items: center;
                justify-content: center;
              `}>
              <Communication
                description={intl.formatMessage(messages.NoDataDescription)}
                image="/assets/BlankCanvas.svg"
                title={intl.formatMessage(messages.NoDataTitle)} />
            </div>
          )
        )
      }
    </section>
  );

}

export default React.memo(MarkdownControl);
