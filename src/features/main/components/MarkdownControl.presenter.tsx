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

import { css } from '@emotion/react';
import {
  Button,
  Text,
  Textarea
} from '@fluentui/react-components';
import remarkGfm from 'remark-gfm';

import Communication from '../../../common/components/Communication';
import { themeConfig } from '../../../providers/ThemeProvider';
import { EventHandler } from '../../../types/Event';
import { File, Folder } from '../../../types/Model';
import messages from '../messages';
import { MarkdownControlFormState } from '../types/Form';

interface MarkdownControlProps {
  workFile?: File,
  workFolder?: Folder,
  onCancel?: EventHandler,
  onEdit?: EventHandler,
  onSave?: EventHandler<string>
}

function MarkdownControl(props: MarkdownControlProps) {

  const {
    workFile,
    workFolder,
    onCancel,
    onEdit,
    onSave
  } = props;

  const intl = useIntl();
  const form = useForm<MarkdownControlFormState>();

  return workFolder ? (
    <section
      css={css`
        display: grid;
      `}>
      {
        workFile ? (
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
                {workFile.name}
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
                workFile.editMode ? (
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
                      title={intl.formatMessage(messages.Edit)}
                      onClick={(e) => {
                        form.reset({
                          content: workFile.content
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
                  workFile.createdDate ? (
                    <FormattedDate
                      {...{
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit'
                      }}
                      value={workFile.updatedDate} />
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
                workFile.editMode ? (
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
                      pre {
                        padding: 0.5rem;
                        margin-block: 0.5rem;
                        font-family: Consolas, Menlo, Monaco, Meiryo, monospace;
                        white-space: pre-wrap;
                        background-color: ${themeConfig.colorNeutralBackground3};
                        & code {
                          padding: 0;
                        }
                      }
                      table, th, td {
                        padding: 0.5rem;
                        border: ${themeConfig.colorNeutralBackground5} 1px solid;
                        border-collapse: collapse;
                        border-spacing: 0;
                        -webkit-border-horizontal-spacing: 0;
                        -webkit-border-vertical-spacing: 0;
                      }
                      thead {
                        background-color: ${themeConfig.colorNeutralBackground3}
                      }
                      tbody {
                        &>tr:nth-of-type(even) {
                          background-color: ${themeConfig.colorNeutralBackground2}
                        }
                      }
                      ul {
                        margin-inline: 2rem 0;
                        list-style-type: disc;
                      }
                    `}>
                    <ReactMarkdown remarkPlugins={[ remarkGfm ]}>
                      {workFile.content || ''}
                    </ReactMarkdown>
                  </div>
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
              description={intl.formatMessage(messages.GetStartedDescription)}
              image="/assets/Exploring.svg"
              title={intl.formatMessage(messages.GetStartedTitle)} />
          </div>
        )
    }
    </section>
  ) : null;

}

export default React.memo(MarkdownControl);
