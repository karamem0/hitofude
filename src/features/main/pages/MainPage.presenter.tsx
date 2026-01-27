//
// Copyright (c) 2023-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { Global, css } from '@emotion/react';
import { Spinner, Text } from '@fluentui/react-components';
import { FormattedMessage, useIntl } from 'react-intl';
import ProgressProvider from '../../../common/providers/ProgressProvider';
import { useTheme } from '../../../providers/ThemeProvider';
import { layouts } from '../../../themes/Layout';
import DialogFactory from '../../dialog/factories/DialogFactory';
import SidePanelFactory from '../../panel/factories/SidePanelFactory';
import AppBar from '../components/AppBar';
import AppContent from '../components/AppContent';
import AppTab from '../components/AppTab';
import MeControl from '../components/MeControl';
import messages from '../messages';

interface MainPageProps {
  loading?: boolean,
  title?: string
}

function MainPage(props: Readonly<MainPageProps>) {

  const {
    loading,
    title
  } = props;

  const intl = useIntl();
  const { theme } = useTheme();

  return (
    <React.Fragment>
      <meta
        content={intl.formatMessage(messages.AppCreator)}
        name="author" />
      <meta
        content={intl.formatMessage(messages.AppDescription)}
        name="description" />
      <title>
        {title == null ? intl.formatMessage(messages.AppTitle) : `${title} - ${intl.formatMessage(messages.AppTitle)}`}
      </title>
      {
        loading ? (
          <div
            css={css`
            display: flex;
            flex-flow: column;
            align-items: center;
            justify-content: center;
            min-height: 100svh;
          `}>
            <Spinner />
          </div>
        ) : (
          <ProgressProvider>
            <Global
              styles={css`
              body {
                overflow: hidden;
              }
            `} />
            <DialogFactory />
            <SidePanelFactory />
            <div
              css={css`
              display: flex;
              flex-flow: column;
            `}>
              <header
                css={css`
                position: fixed;
                z-index: 200;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                height: ${layouts.pageHeader.height};
                padding: 0 1rem;
                background-color: ${theme.colorBrandBackground};
              `}>
                <Text
                  as="h1"
                  css={css`
                  font-size: ${theme.fontSizeBase600};
                  color: ${theme.colorBrandBackgroundInverted};
                  text-align: center;
                `}>
                  <FormattedMessage {...messages.AppTitle} />
                </Text>
                <MeControl />
              </header>
              <main
                css={css`
                display: grid;
                height: ${layouts.pageBody.height};
                margin: 2.5rem 0 0;
                @media all and (width <= 960px) {
                  grid-template-rows: auto;
                  grid-template-columns: auto 1fr;
                  & > div:last-of-type {
                    position: fixed;
                    width: calc(100vw - ${layouts.appBar.width});
                    height: ${layouts.pageBody.height};
                    margin: 0 0 0 ${layouts.appBar.width};
                  }
                }
                @media not all and (width <= 960px) {
                  grid-template-rows: auto;
                  grid-template-columns: auto auto 1fr;
                  & > div:last-of-type {
                    position: static;
                    margin: 0;
                  }
                }
              `}>
                <AppBar />
                <AppTab />
                <AppContent />
              </main>
            </div>
          </ProgressProvider>
        )}
    </React.Fragment>
  );

}

export default React.memo(MainPage);
