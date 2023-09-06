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
import { Button, Link, Text } from '@fluentui/react-components';
import { GitHubLogoIcon } from '@fluentui/react-icons-mdl2';
import { WindowsLogoIcon } from '@fluentui/react-icons-mdl2-branded';

import { useTheme } from '../../../providers/ThemeProvider';
import { EventHandler } from '../../../types/Event';
import messages from '../messages';

interface HomePageProps {
  onLinkToGitHub?: EventHandler,
  onLinkToPrivacyPolicy?: EventHandler,
  onLinkToTermsAndConditions?: EventHandler,
  onSignIn?: EventHandler
}

function HomePage(props: HomePageProps) {

  const {
    onLinkToGitHub,
    onLinkToPrivacyPolicy,
    onLinkToTermsAndConditions,
    onSignIn
  } = props;

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
          display: grid;
          grid-template-rows: auto;
          grid-template-columns: auto;
          align-items: center;
          justify-content: end;
          width: 100%;
          height: 2.5rem;
          padding: 0 1rem;
        `}>
        <Button
          appearance="transparent"
          aria-label={intl.formatMessage(messages.GitHub)}
          icon={<GitHubLogoIcon />}
          title={intl.formatMessage(messages.GitHub)}
          onClick={onLinkToGitHub}>
          <FormattedMessage {...messages.GitHub} />
        </Button>
      </header>
      <section
        css={css`
          display: flex;
          flex-flow: column;
          align-items: center;
          justify-content: center;
          background-color: ${theme.colorBrandStroke2};
        `}>
        <div
          css={css`
            display: grid;
            grid-template-rows: auto auto;
            grid-template-columns: auto;
            grid-gap: 2rem;
            padding: 2rem;
            @media (width >= 960px) {
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
                color: ${theme.colorBrandBackgroundPressed};
              `}>
              <FormattedMessage {...messages.AppName} />
            </Text>
            <Text
              css={css`
                color: ${theme.colorBrandBackgroundPressed};
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
                icon={<WindowsLogoIcon />}
                title={intl.formatMessage(messages.SignIn)}
                onClick={onSignIn}>
                <FormattedMessage {...messages.SignIn} />
              </Button>
            </div>
          </div>
          <img
            src="/assets/Books.svg"
            css={css`
              width: 20rem;
            `} />
        </div>
      </section>
      <section
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
      </section>
      <footer
        css={css`
          display: flex;
          flex-flow: row;
          align-items: center;
          justify-content: center;
          padding: 2rem 0;
        `}>
        <Link
          as="button"
          onClick={onLinkToTermsAndConditions}>
          <FormattedMessage {...messages.TermsAndConditions} />
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
  );

}

export default React.memo(HomePage);
