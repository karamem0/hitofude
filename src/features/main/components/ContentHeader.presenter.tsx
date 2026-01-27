//
// Copyright (c) 2023-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { css } from '@emotion/react';
import {
  Button,
  Menu,
  MenuPopover,
  MenuTrigger,
  Text,
  Tooltip
} from '@fluentui/react-components';
import { MoreVertical16Regular } from '@fluentui/react-icons';
import {
  FormattedDate,
  FormattedMessage,
  useIntl
} from 'react-intl';
import { useTheme } from '../../../providers/ThemeProvider';
import { layouts } from '../../../themes/Layout';
import { EventHandler } from '../../../types/Event';
import { ContentMenuAction, File } from '../../../types/Model';
import { isMarkdown } from '../../../utils/File';
import messages from '../messages';
import ContentMenuList from './ContentMenuList';
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
              <Tooltip
                content={intl.formatMessage(messages.Cancel)}
                relationship="label">
                <Button onClick={onCancel}>
                  <FormattedMessage {...messages.Cancel} />
                </Button>
              </Tooltip>
            </div>
          ) : (
            <div
              css={css`
                display: flex;
                grid-gap: 0.5rem;
              `}>
              <Tooltip
                content={intl.formatMessage(messages.Edit)}
                relationship="label">
                <Button
                  disabled={!isMarkdown(file)}
                  onClick={onEdit}>
                  <FormattedMessage {...messages.Edit} />
                </Button>
              </Tooltip>
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
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                  month: '2-digit',
                  year: 'numeric'
                }}
                value={file.updatedDate} />
            ) : null
          }
        </Text>
        {
          file ? (
            <Menu>
              <MenuTrigger>
                <Tooltip
                  content={intl.formatMessage(messages.MoreOption)}
                  relationship="label">
                  <Button
                    appearance="transparent"
                    icon={(
                      <MoreVertical16Regular />
                    )} />
                </Tooltip>
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
            <Tooltip
              content={intl.formatMessage(messages.MoreOption)}
              relationship="label">
              <Button
                appearance="transparent"
                icon={(
                  <MoreVertical16Regular />
                )} />
            </Tooltip>
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
