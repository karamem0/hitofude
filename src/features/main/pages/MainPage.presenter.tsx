//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { FormattedMessage } from 'react-intl';

import { css } from '@emotion/react';
import { Spinner, Text } from '@fluentui/react-components';

import { themeConfig } from '../../../providers/ThemeProvider';
import AlertControl from '../components/AlertControl';
import AppBarControl from '../components/AppBarControl';
import AppTabControl from '../components/AppTabControl';
import DialogControl from '../components/DialogControl';
import MarkdownControl from '../components/MarkdownControl';
import MeControl from '../components/MeControl';
import messages from '../messages';

interface MainPageProps {
  loading?: boolean
}

function MainPage(props: MainPageProps) {

  const {
    loading
  } = props;

  return loading ? (
    <div
      css={css`
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
      `}>
      <Spinner />
    </div>
  ) : (
    <React.Fragment>
      <AlertControl />
      <DialogControl />
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
            height: 2.5rem;
            padding: 0 1rem;
            background-color: ${themeConfig.colorBrandBackground};
          `}>
          <Text
            css={css`
            font-size: 1rem;
            font-weight: bold;
            color: ${themeConfig.colorBrandBackgroundInverted};
            text-align: center;
          `}>
            <FormattedMessage {...messages.AppName} />
          </Text>
          <MeControl />
        </header>
        <div
          css={css`
            display: grid;
            margin: 2rem 0 0;
            @media (max-width: 959px) {
              grid-template-rows: calc(100vh - 2rem);
              grid-template-columns: auto 1fr;

              & > section:nth-of-type(2) {
                position: fixed;
                z-index: 100;
                margin: 0 0 0 3rem;
              }
            }
            @media (min-width: 960px) {
              grid-template-rows: calc(100vh - 2rem);
              grid-template-columns: auto auto 1fr;
            }
          `}>
          <AppBarControl />
          <AppTabControl />
          <MarkdownControl />
        </div>
      </div>
    </React.Fragment>
  );

}

export default MainPage;
