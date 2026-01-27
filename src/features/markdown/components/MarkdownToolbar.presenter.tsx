//
// Copyright (c) 2023-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { css } from '@emotion/react';
import { Toolbar, ToolbarButton, Tooltip } from '@fluentui/react-components';
import {
  TextBold16Regular,
  TextItalic16Regular,
  TextStrikethrough16Regular,
  TextUnderline16Regular
} from '@fluentui/react-icons';
import { useIntl } from 'react-intl';
import { EventHandler } from '../../../types/Event';
import { MarkdownToolbarAction } from '../../../types/Model';
import messages from '../messages';

interface MarkdownToolbarProps {
  className?: string,
  onClick?: EventHandler<MarkdownToolbarAction>
}

function MarkdownToolbar(props: Readonly<MarkdownToolbarProps>) {

  const {
    className,
    onClick
  } = props;

  const intl = useIntl();

  return (
    <div
      className={className}
      css={css`
        height: 2.5rem;
      `}>
      <Toolbar>
        <Tooltip
          content={intl.formatMessage(messages.Bold)}
          relationship="label">
          <ToolbarButton
            aria-label={intl.formatMessage(messages.Bold)}
            icon={(
              <TextBold16Regular />
            )}
            onClick={(event) => onClick?.(event, 'bold')} />
        </Tooltip>
        <Tooltip
          content={intl.formatMessage(messages.Italic)}
          relationship="label">
          <ToolbarButton
            aria-label={intl.formatMessage(messages.Italic)}
            icon={(
              <TextItalic16Regular />
            )}
            onClick={(event) => onClick?.(event, 'italic')} />
        </Tooltip>
        <Tooltip
          content={intl.formatMessage(messages.Underline)}
          relationship="label">
          <ToolbarButton
            aria-label={intl.formatMessage(messages.Underline)}
            icon={(
              <TextUnderline16Regular />
            )}
            onClick={(event) => onClick?.(event, 'underline')} />
        </Tooltip>
        <Tooltip
          content={intl.formatMessage(messages.Strikethrough)}
          relationship="label">
          <ToolbarButton
            aria-label={intl.formatMessage(messages.Strikethrough)}
            icon={(
              <TextStrikethrough16Regular />
            )}
            onClick={(event) => onClick?.(event, 'strike')} />
        </Tooltip>
      </Toolbar>
    </div>
  );

}

export default React.memo(MarkdownToolbar);
