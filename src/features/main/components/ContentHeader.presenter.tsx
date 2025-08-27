//
// Copyright (c) 2023-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import {
  Button,
  Menu,
  MenuPopover,
  MenuTrigger,
  Text
} from '@fluentui/react-components';
import { ContentMenuAction, File } from '../../../types/Model';
import {
  FormattedDate,
  FormattedMessage,
  useIntl
} from 'react-intl';
import ContentMenuList from './ContentMenuList';
import ContentSaveButton from './ContentSaveButton';
import { EventHandler } from '../../../types/Event';
import { MoreVertical16Regular } from '@fluentui/react-icons';
import { css } from '@emotion/react';
import { isMarkdown } from '../../../utils/File';
import { layouts } from '../../../themes/Layout';
import messages from '../messages';
import { useTheme } from '../../../providers/ThemeProvider';

interface ContentHeaderProps {
  changed?: boolean,
  editing?: boolean,
  file?: File,
  onCancel?: EventHandler,
  onContextMenu?: EventHandler<ContentMenuAction>,
  onEdit?: EventHandler,
  onSave?: EventHandler<boolean>
}

function ContentHeader(props: Readonly<ContentHeaderProps>) {

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
        grid-template-rows: ${layouts.contentHeader.height};
        grid-template-columns: 1fr auto;
      `}>
      <div
        css={css`
          display: grid;
          align-items: center;
          justify-content: left;
        `}>
        <Text
          aria-label={file.baseName}
          as="h4"
          title={file.baseName}
          css={css`
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: ${theme.fontSizeBase600};
            line-height: calc(${theme.fontSizeBase600} * 1.25);
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
          @media all and (width <= 960px) {
            display: none;
          }
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
                disabled={!isMarkdown(file)}
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
        {
          file ? (
            <Menu>
              <MenuTrigger>
                <Button
                  appearance="transparent"
                  aria-label={intl.formatMessage(messages.MoreOption)}
                  title={intl.formatMessage(messages.MoreOption)}
                  icon={(
                    <MoreVertical16Regular />
                  )} />
              </MenuTrigger>
              <MenuPopover>
                <ContentMenuList />
              </MenuPopover>
            </Menu>
          ) : null
        }
      </div>
      <div
        css={css`
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: right;
          @media not all and (width <= 960px) {
            display: none;
          }
        `}>
        <Menu>
          <MenuTrigger>
            <Button
              appearance="transparent"
              aria-label={intl.formatMessage(messages.MoreOption)}
              title={intl.formatMessage(messages.MoreOption)}
              icon={(
                <MoreVertical16Regular />
              )} />
          </MenuTrigger>
          <MenuPopover>
            <ContentMenuList
              onCancel={onCancel}
              onEdit={onEdit}
              onSave={onSave} />
          </MenuPopover>
        </Menu>
      </div>
    </div>
  ) : null;

}

export default React.memo(ContentHeader);
