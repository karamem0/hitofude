//
// Copyright (c) 2023-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { FormattedMessage, useIntl } from 'react-intl';
import Communication from '../../../common/components/Communication';
import { Text } from '@fluentui/react-components';
import { css } from '@emotion/react';
import messages from '../messages';
import { useTheme } from '../../../providers/ThemeProvider';

function Error500Page() {

  const intl = useIntl();
  const { theme } = useTheme();

  return (
    <div
      css={css`
        display: flex;
        flex-flow: column;
      `}>
      <header
        css={css`
          display: flex;
          flex-flow: row;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          height: 2.5rem;
          padding: 0 1rem;
          background-color: ${theme.colorBrandBackground};
        `}>
        <Text
          css={css`
          font-size: 1rem;
          font-weight: bold;
          color: #fff;
          text-align: center;
        `}>
          <FormattedMessage {...messages.AppName} />
        </Text>
      </header>
      <div
        css={css`
          display: flex;
          flex-flow: column;
          align-items: center;
          justify-content: center;
          height: calc(100svh - 2.5rem);
        `}>
        <Communication
          description={intl.formatMessage(messages.Error500Description)}
          image="/assets/images/Warning.svg"
          title={intl.formatMessage(messages.Error500Title)} />
      </div>
    </div>
  );

}

export default React.memo(Error500Page);
