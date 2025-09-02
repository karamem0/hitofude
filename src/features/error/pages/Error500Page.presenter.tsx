//
// Copyright (c) 2023-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { FormattedMessage, useIntl } from 'react-intl';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Communication from '../../../common/components/Communication';
import { Text } from '@fluentui/react-components';
import { css } from '@emotion/react';
import messages from '../messages';
import { useTheme } from '../../../providers/ThemeProvider';

function Error500Page() {

  const intl = useIntl();
  const { theme } = useTheme();

  return (
    <React.Fragment>
      <HelmetProvider>
        <Helmet>
          <meta
            content={intl.formatMessage(messages.AppCreator)}
            name="author" />
          <meta
            content={intl.formatMessage(messages.AppDescription)}
            name="description" />
          <title>
            {`${intl.formatMessage(messages.Error404Title)} - ${intl.formatMessage(messages.AppTitle)}`}
          </title>
        </Helmet>
      </HelmetProvider>
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
            <FormattedMessage {...messages.AppTitle} />
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
    </React.Fragment>
  );

}

export default React.memo(Error500Page);
