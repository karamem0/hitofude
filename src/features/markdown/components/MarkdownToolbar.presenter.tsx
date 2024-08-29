//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon
} from '@fluentui/react-icons-mdl2';
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
            <BoldIcon
              css={css`
                font-size: 1rem;
                line-height: 1rem;
              `} />
          )}
          onClick={(event) => onClick?.(event, MarkdownToolbarAction.bold)} />
        <ToolbarButton
          aria-label={intl.formatMessage(messages.Italic)}
          title={intl.formatMessage(messages.Italic)}
          icon={(
            <ItalicIcon
              css={css`
                font-size: 1rem;
                line-height: 1rem;
              `} />
          )}
          onClick={(event) => onClick?.(event, MarkdownToolbarAction.italic)} />
        <ToolbarButton
          aria-label={intl.formatMessage(messages.Underline)}
          title={intl.formatMessage(messages.Underline)}
          icon={(
            <UnderlineIcon
              css={css`
                font-size: 1rem;
                line-height: 1rem;
              `} />
          )}
          onClick={(event) => onClick?.(event, MarkdownToolbarAction.underline)} />
      </Toolbar>
    </div>
  );

}

export default React.memo(MarkdownToolbar);
