//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { useForm } from 'react-hook-form';
import {
  FormattedDate,
  FormattedMessage,
  useIntl
} from 'react-intl';

import { css } from '@emotion/react';
import {
  Button,
  Menu,
  MenuGroup,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Text
} from '@fluentui/react-components';
import { HistoryIcon, MoreVerticalIcon } from '@fluentui/react-icons-mdl2';

import Communication from '../../../common/components/Communication';
import Loader from '../../../common/components/Loader';
import { EventHandler } from '../../../types/Event';
import {
  File,
  SidePanelAction,
  SidePanelType
} from '../../../types/Model';
import { isImageFile, isMarkdownFile, isSupportedFile } from '../../../utils/File';
import messages from '../messages';
import { ContentControlFormState } from '../types/Form';

import ImageControl from './ImageControl';
import MarkdownControl from './MarkdownControl';

interface ContentControlProps {
  loading?: boolean,
  editing?: boolean,
  value?: File,
  onCancel?: EventHandler,
  onEdit?: EventHandler,
  onOpenSidePanel?: EventHandler<SidePanelAction>,
  onSave?: EventHandler<string>
}

function ContentControl(props: ContentControlProps) {

  const {
    loading,
    editing,
    value,
    onCancel,
    onEdit,
    onOpenSidePanel,
    onSave
  } = props;

  const intl = useIntl();
  const form = useForm<ContentControlFormState>();

  return (
    <section
      css={css`
        display: grid;
      `}>
      <Loader loading={loading}>
        {
          (() => {
            if (!value) {
              return (
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
              );
            }
            if (!isSupportedFile(value)) {
              return (
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
              );
            }
            return (
              <form
                css={css`
                  display: grid;
                  grid-template-rows: auto auto 1fr;
                  grid-template-columns: auto;
                  grid-gap: 0.5rem;
                  padding: 1rem;
                  @media (width >= 960px) {
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
                    @media (width >= 960px) {
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
                    grid-template-columns: auto auto auto;
                    grid-gap: 0.5rem;
                    align-items: center;
                    justify-content: right;
                    @media (width >= 960px) {
                      grid-row: 1 / 2;
                      grid-column: 2 / 3;
                    }
                  `}>
                  {
                    editing ? (
                      <div
                        css={css`
                          display: flex;
                          grid-gap: 0.5rem;
                        `}>
                        <Button
                          appearance="primary"
                          aria-label={intl.formatMessage(messages.Save)}
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
                          disabled={!isMarkdownFile(value)}
                          title={intl.formatMessage(messages.Edit)}
                          onClick={onEdit}>
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
                  <Menu>
                    <MenuTrigger>
                      <div
                        aria-label={intl.formatMessage(messages.MoreOption)}
                        role="button"
                        title={intl.formatMessage(messages.MoreOption)}
                        css={css`
                          padding: 0.5rem;
                          font-size: 1rem;
                          line-height: 1rem;
                        `}>
                        <MoreVerticalIcon />
                      </div>
                    </MenuTrigger>
                    <MenuPopover>
                      <MenuList>
                        <MenuGroup>
                          <MenuItem
                            key="fileVersion"
                            icon={(
                              <HistoryIcon
                                css={css`
                                  font-size: 1rem;
                                  line-height: 1rem;
                                `} />
                            )}
                            onClick={(e) => onOpenSidePanel?.(e, {
                              type: SidePanelType.fileVersion,
                              payload: value
                            })}>
                            <FormattedMessage {...messages.VersionHistory} />
                          </MenuItem>
                        </MenuGroup>
                      </MenuList>
                    </MenuPopover>
                  </Menu>
                </div>
                <div
                  css={css`
                    display: grid;
                    height: calc(100vh - 9.5rem);
                    @media (width >= 960px) {
                      grid-row: 2 / 3;
                      grid-column: 1 / 3;
                      height: calc(100vh - 7.5rem);
                    }
                  `}>
                  {
                  (() => {
                    if (isImageFile(value)) {
                      return (
                        <ImageControl value={value} />
                      );
                    }
                    if (isMarkdownFile(value)) {
                      return (
                        <MarkdownControl
                          value={value}
                          onChange={(_, data) => form.setValue('content', data || '')} />
                      );
                    }
                    return null;
                  })()
                }
                </div>
              </form>
            );
          })()
        }
      </Loader>
    </section>
  );

}

export default React.memo(ContentControl);
