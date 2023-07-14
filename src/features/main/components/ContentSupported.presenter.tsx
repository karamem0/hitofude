//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import {
  FormattedDate,
  FormattedMessage,
  useIntl
} from 'react-intl';

import { css } from '@emotion/react';
import {
  Button,
  Text
} from '@fluentui/react-components';

import ImageViewer from '../../../common/components/ImageViewer';
import { themeConfig } from '../../../providers/ThemeProvider';
import { EventHandler } from '../../../types/Event';
import {
  ContentMenuType,
  File,
  FileContent,
  SidePanelAction
} from '../../../types/Model';
import { isMimeType } from '../../../utils/File';
import messages from '../messages';

import ContentMenuButton from './ContentMenuButton';
import ContentSaveButton from './ContentSaveButton';
import MarkdownControl from './MarkdownControl';

interface ContentSupportedProps {
  changed?: boolean,
  minimapEnabled?: boolean,
  value?: File & FileContent,
  onCancel?: EventHandler,
  onChange?: EventHandler<string>,
  onEdit?: EventHandler,
  onOpenSidePanel?: EventHandler<SidePanelAction>,
  onSave?: EventHandler<boolean>,
  onToggleMinimapEnabled?: EventHandler<boolean>
}

function ContentSupported(props: ContentSupportedProps) {

  const {
    changed,
    minimapEnabled,
    value,
    onCancel,
    onChange,
    onEdit,
    onOpenSidePanel,
    onSave,
    onToggleMinimapEnabled
  } = props;

  const intl = useIntl();

  return value ? (
    <div
      css={css`
        display: grid;
        grid-template-rows: auto auto 1fr;
        grid-template-columns: auto;
        grid-gap: 0.5rem;
        padding: 1rem;
        @media (width >= 960px) {
          grid-template-rows: auto 1fr;
          grid-template-columns: 1fr auto;
        }
      `}>
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
            font-size: ${themeConfig.fontSizeHero900};
            font-weight: bold;
            line-height: calc(${themeConfig.fontSizeHero900} * 1.25);
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
          value.editing ? (
            <div
              css={css`
                display: flex;
                grid-gap: 0.5rem;
              `}>
              <ContentSaveButton
                disabled={!changed}
                onClick={onSave} />
              <Button
                aria-label={intl.formatMessage(messages.Cancel)}
                title={intl.formatMessage(messages.Cancel)}
                onClick={onCancel}>
                <FormattedMessage {...messages.Cancel} />
              </Button>
            </div>
          ) : (
            <div
              css={css`
                display: flex;
                grid-gap: 0.5rem;
              `}>
              <Button
                aria-label={intl.formatMessage(messages.Edit)}
                disabled={!isMimeType(value, { subtype: 'markdown' })}
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
        <ContentMenuButton
          minimapEnabled={minimapEnabled}
          value={value}
          onMenuClick={(e, data) => {
            if (data?.type === ContentMenuType.openSidePanel) {
              onOpenSidePanel?.(e, data.data as SidePanelAction);
            }
            if (data?.type === ContentMenuType.toggleMinimapEnabled) {
              onToggleMinimapEnabled?.(e, data.data as boolean);
            }
          }} />
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
            if (isMimeType(value, { type: 'image' })) {
              return (
                <ImageViewer
                  alt={value.fullName}
                  src={value.downloadUrl} />
              );
            }
            if (isMimeType(value, { subtype: 'markdown' })) {
              return (
                <MarkdownControl
                  content={value.content}
                  editing={value.editing}
                  onChange={onChange} />
              );
            }
            return null;
          })()
        }
      </div>
    </div>
  ) : null;

}

export default React.memo(ContentSupported);
