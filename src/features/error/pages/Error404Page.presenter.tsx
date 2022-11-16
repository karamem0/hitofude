//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { FormattedMessage, useIntl } from 'react-intl';

import { css } from '@emotion/react';
import { Text } from '@fluentui/react-components';

import Communication from '../../../common/components/Communication';
import { themeConfig } from '../../../providers/ThemeProvider';
import messages from '../messages';

function Error404Page() {

  const intl = useIntl();

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
          background-color: ${themeConfig.colorBrandBackground};
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
      <section
        css={css`
          display: flex;
          flex-flow: column;
          align-items: center;
          justify-content: center;
          height: calc(100vh - 2.5rem);
        `}>
        <Communication
          description={intl.formatMessage(messages.Error404Description)}
          image="/assets/NotFound.svg"
          title={intl.formatMessage(messages.Error404Title)} />
      </section>
    </div>
  );

}

export default Error404Page;
