//
// Copyright (c) 2023-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import {
  TextBold16Regular,
  TextItalic16Regular,
  TextStrikethrough16Regular,
  TextUnderline16Regular
} from '@fluentui/react-icons';
import { Toolbar, ToolbarButton } from '@fluentui/react-components';
import { EventHandler } from '../../../types/Event';
import { MarkdownToolbarAction } from '../../../types/Model';
import { css } from '@emotion/react';
import messages from '../messages';
import { useIntl } from 'react-intl';

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
        <ToolbarButton
          aria-label={intl.formatMessage(messages.Bold)}
          title={intl.formatMessage(messages.Bold)}
          icon={(
            <TextBold16Regular />
          )}
          onClick={(event) => onClick?.(event, 'bold')} />
        <ToolbarButton
          aria-label={intl.formatMessage(messages.Italic)}
          title={intl.formatMessage(messages.Italic)}
          icon={(
            <TextItalic16Regular />
          )}
          onClick={(event) => onClick?.(event, 'italic')} />
        <ToolbarButton
          aria-label={intl.formatMessage(messages.Underline)}
          title={intl.formatMessage(messages.Underline)}
          icon={(
            <TextUnderline16Regular />
          )}
          onClick={(event) => onClick?.(event, 'underline')} />
        <ToolbarButton
          aria-label={intl.formatMessage(messages.Strikethrough)}
          title={intl.formatMessage(messages.Strikethrough)}
          icon={(
            <TextStrikethrough16Regular />
          )}
          onClick={(event) => onClick?.(event, 'strike')} />
      </Toolbar>
    </div>
  );

}

export default React.memo(MarkdownToolbar);
