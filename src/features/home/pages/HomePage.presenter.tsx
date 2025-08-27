//
// Copyright (c) 2023-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import {
  Button,
  Link,
  Text
} from '@fluentui/react-components';
import { FormattedMessage, useIntl } from 'react-intl';
import { GrGithub, GrWindows } from 'react-icons/gr';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { EventHandler } from '../../../types/Event';
import { css } from '@emotion/react';
import messages from '../messages';
import { useTheme } from '../../../providers/ThemeProvider';

interface HomePageProps {
  onLinkToGitHub?: EventHandler,
  onLinkToPrivacyPolicy?: EventHandler,
  onLinkToTermsOfUse?: EventHandler,
  onSignIn?: EventHandler
}

function HomePage(props: Readonly<HomePageProps>) {

  const {
    onLinkToGitHub,
    onLinkToPrivacyPolicy,
    onLinkToTermsOfUse,
    onSignIn
  } = props;

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
          <meta
            content={intl.formatMessage(messages.AppTitle)}
            property="og:title" />
          <meta
            content="website"
            property="og:type" />
          <meta
            content={`${location.origin}/assets/screenshots/001.png`}
            property="og:image" />
          <meta
            content={location.origin}
            property="og:url" />
          <meta
            content={intl.formatMessage(messages.AppDescription)}
            property="og:description" />
          <title>
            {intl.formatMessage(messages.AppTitle)}
            -
            {intl.formatMessage(messages.AppDescription)}
          </title>
        </Helmet>
      </HelmetProvider>
      <div
        css={css`
          display: flex;
          flex-flow: column;
          min-width: 100%;
          min-height: 100svh;
        `}>
        <header
          css={css`
            display: flex;
            flex-flow: row;
            align-items: center;
            justify-content: end;
            width: 100%;
            height: 2.5rem;
            padding: 0 1rem;
          `}>
          <Button
            appearance="transparent"
            aria-label={intl.formatMessage(messages.GitHub)}
            as="a"
            title={intl.formatMessage(messages.GitHub)}
            icon={(
              <GrGithub
                css={css`
                  font-size: 1rem;
                  line-height: 1rem;
                `} />
            )}
            onClick={onLinkToGitHub}>
            <FormattedMessage {...messages.GitHub} />
          </Button>
        </header>
        <main
          css={css`
            display: flex;
            flex-flow: column;
            min-height: calc(100svh - 5rem);
          `}>
          <div
            css={css`
              display: flex;
              flex-flow: column;
              align-items: center;
              justify-content: center;
              background: linear-gradient(${theme.colorBrandBackground2Hover}, ${theme.colorBrandBackground2});
            `}>
            <div
              css={css`
                display: grid;
                @media all and (width <= 960px) {
                  grid-template-rows: auto auto;
                  grid-template-columns: auto;
                  grid-gap: 2rem;
                  padding: 2rem;
                }
                @media not all and (width <= 960px) {
                  grid-template-rows: auto;
                  grid-template-columns: auto auto;
                  grid-gap: 4rem;
                  padding: 2rem;
                }
              `}>
              <div
                css={css`
                  display: flex;
                  flex-flow: column;
                  align-items: center;
                `}>
                <Text
                  as="h1"
                  css={css`
                    font-size: ${theme.fontSizeHero900};
                    font-weight: bold;
                    line-height: calc(${theme.fontSizeHero900} * 1.25);
                    color: ${theme.colorNeutralForeground2};
                  `}>
                  <FormattedMessage {...messages.AppTitle} />
                </Text>
                <Text
                  css={css`
                    color: ${theme.colorNeutralForeground2};
                  `}>
                  <FormattedMessage {...messages.AppDescription} />
                </Text>
                <div
                  css={css`
                    padding: 3rem 0;
                  `}>
                  <Button
                    appearance="primary"
                    aria-label={intl.formatMessage(messages.SignIn)}
                    title={intl.formatMessage(messages.SignIn)}
                    icon={(
                      <GrWindows
                        css={css`
                          font-size: 1rem;
                          line-height: 1rem;
                        `} />
                    )}
                    onClick={onSignIn}>
                    <FormattedMessage {...messages.SignIn} />
                  </Button>
                </div>
              </div>
              <img
                alt={intl.formatMessage(messages.AppTitle)}
                src="/assets/images/Books.svg"
                css={css`
                  width: 20rem;
                `} />
            </div>
          </div>
          <div
            css={css`
            display: flex;
            flex-flow: column;
            align-items: center;
            justify-content: center;
          `}>
            <Text
              as="h2"
              css={css`
              padding: 2rem 0;
              font-size: ${theme.fontSizeBase600};
              font-weight: bold;
              line-height: calc(${theme.fontSizeBase600} * 1.25);
            `}>
              <FormattedMessage {...messages.FeatureTitle} />
            </Text>
            <Text as="p">
              <FormattedMessage {...messages.FeatureDescriprtion1} />
            </Text>
            <Text as="p">
              <FormattedMessage {...messages.FeatureDescriprtion2} />
            </Text>
            <Text as="p">
              <FormattedMessage {...messages.FeatureDescriprtion3} />
            </Text>
          </div>
        </main>
        <footer
          css={css`
            display: flex;
            flex-flow: row;
            align-items: center;
            justify-content: center;
            min-height: 2.5rem;
            padding: 0 1rem;
          `}>
          <Link
            as="button"
            onClick={onLinkToTermsOfUse}>
            <FormattedMessage {...messages.TermsOfUse} />
          </Link>
          <Text
            css={css`
              padding: 0 0.25rem;
            `}>
            |
          </Text>
          <Link
            as="button"
            onClick={onLinkToPrivacyPolicy}>
            <FormattedMessage {...messages.PrivacyPolicy} />
          </Link>
        </footer>
      </div>
    </React.Fragment>
  );

}

export default React.memo(HomePage);
