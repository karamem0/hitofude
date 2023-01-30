//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { FormattedMessage, MessageDescriptor } from 'react-intl';

import { css } from '@emotion/react';
import { Link } from '@fluentui/react-components';
import { Alert } from '@fluentui/react-components/unstable';

import { themeConfig } from '../../../providers/ThemeProvider';
import { EventHandler } from '../../../types/Event';
import messages from '../messages';

interface AlertControlProps {
  message?: MessageDescriptor,
  onDismiss?: EventHandler
}

function AlertControl(props: AlertControlProps) {

  const {
    message,
    onDismiss
  } = props;

  return (
    message ? (
      <Alert
        intent="warning"
        action={
          <Link
            as="button"
            onClick={onDismiss}>
            <FormattedMessage {...messages.Dismiss} />
          </Link>
        }
        css={css`
          position: fixed;
          z-index: 900;
          width: calc(100% - 1rem);
          margin: 0.5rem;
          background-color: ${themeConfig.colorNeutralBackground2};
        `}>
        <FormattedMessage {...message} />
      </Alert>
    ) : null
  );

}

export default AlertControl;
