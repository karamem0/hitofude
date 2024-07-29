//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { FormattedMessage } from 'react-intl';

import { Spinner, Text } from '@fluentui/react-components';

import { Global, css } from '@emotion/react';

import ErrorNotification from '../../../common/components/ErrorNotification';
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
  loading?: boolean
}

function MainPage(props: Readonly<MainPageProps>) {

  const {
    loading
  } = props;

  const { theme } = useTheme();

  return loading ? (
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
      <ErrorNotification />
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
              font-size: 1rem;
              font-weight: bold;
              color: ${theme.colorBrandBackgroundInverted};
              text-align: center;
            `}>
            <FormattedMessage {...messages.AppName} />
          </Text>
          <MeControl />
        </header>
        <main
          css={css`
            display: grid;
            margin: 2rem 0 0;
            @media all and (width <= 960px) {
              grid-template-rows: ${layouts.pageBody.height};
              grid-template-columns: auto 1fr;
              & > div:last-of-type {
                position: fixed;
                width: calc(100vw - 3rem);
                margin: 0 0 0 3rem;
              }
            }
            @media not all and (width <= 960px) {
              grid-template-rows: ${layouts.pageBody.height};
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
  );

}

export default React.memo(MainPage);
