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
import { Button, Text } from '@fluentui/react-components';

import { useTheme } from '../../../providers/ThemeProvider';
import { EventHandler } from '../../../types/Event';
import { ContentMenuAction, File } from '../../../types/Model';
import { isMimeType } from '../../../utils/File';
import messages from '../messages';

import ContentMenuButton from './ContentMenuButton';
import ContentSaveButton from './ContentSaveButton';

interface ContentHeaderProps {
  changed?: boolean,
  editing?: boolean,
  file?: File,
  onCancel?: EventHandler,
  onContextMenu?: EventHandler<ContentMenuAction>,
  onEdit?: EventHandler,
  onSave?: EventHandler<boolean>
}

function ContentHeader(props: ContentHeaderProps) {

  const {
    changed,
    editing,
    file,
    onCancel,
    onEdit,
    onSave
  } = props;

  const intl = useIntl();
  const { theme } = useTheme();

  return file ? (
    <div
      css={css`
        display: grid;
        grid-template-rows: auto 1fr;
        grid-template-columns: auto;
        @media (width >= 960px) {
          grid-template-rows: 1fr;
          grid-template-columns: 1fr auto;
        }
      `}>
      <div
        css={css`
          display: grid;
          align-items: center;
          justify-content: left;
        `}>
        <Text
          css={css`
            overflow: hidden;
            font-size: ${theme.fontSizeHero900};
            font-weight: bold;
            line-height: calc(${theme.fontSizeHero900} * 1.25);
            text-overflow: ellipsis;
            white-space: nowrap;
          `}>
          {file.baseName}
        </Text>
      </div>
      <div
        css={css`
          display: flex;
          flex-direction: row;
          grid-gap: 0.5rem;
          align-items: center;
          justify-content: right;
        `}>
        {
          editing ? (
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
                disabled={!isMimeType(file, { subtype: 'markdown' })}
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
            file.createdDate ? (
              <FormattedDate
                {...{
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit'
                }}
                value={file.updatedDate} />
            ) : null
          }
        </Text>
        <ContentMenuButton />
      </div>
    </div>
  ) : null;

}

export default React.memo(ContentHeader);
