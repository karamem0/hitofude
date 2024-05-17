//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { FormattedMessage, MessageDescriptor } from 'react-intl';

import {
  Link,
  MessageBar,
  MessageBarActions,
  MessageBarBody
} from '@fluentui/react-components';

import { css } from '@emotion/react';

import { useTheme } from '../../providers/ThemeProvider';
import { EventHandler } from '../../types/Event';
import messages from '../messages';

interface ErrorNotificationProps {
  message?: MessageDescriptor,
  onDismiss?: EventHandler
}

function ErrorNotification(props: Readonly<ErrorNotificationProps>) {

  const {
    message,
    onDismiss
  } = props;

  const { theme } = useTheme();

  return (
    message ? (
      <MessageBar
        intent="warning"
        css={css`
          position: fixed;
          z-index: 900;
          width: calc(100% - 1rem);
          margin: 0.5rem;
          background-color: ${theme.colorNeutralBackground2};
        `}>
        <MessageBarBody>
          <FormattedMessage {...message} />
        </MessageBarBody>
        <MessageBarActions
          containerAction={(
            <Link
              as="button"
              onClick={onDismiss}>
              <FormattedMessage {...messages.Dismiss} />
            </Link>
          )} />
      </MessageBar>
    ) : null
  );

}

export default React.memo(ErrorNotification);
