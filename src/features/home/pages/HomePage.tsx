//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import Presenter from './HomePage.presenter';
import { ThemeName } from '../../../types/Model';
import { loginParams } from '../../../config/MsalConfig';
import messages from '../messages';
import { useIntl } from 'react-intl';
import { useMsal } from '@azure/msal-react';
import { useTheme } from '../../../providers/ThemeProvider';

function HomePage() {

  const intl = useIntl();
  const msal = useMsal();
  const { changeTheme } = useTheme();

  const handleLinkToGitHub = React.useCallback(() => {
    window.open(intl.formatMessage(messages.GitHubLink), '_blank', 'noreferrer');
  }, [
    intl
  ]);

  const handleLinkToPrivacyPolicy = React.useCallback(() => {
    window.open(intl.formatMessage(messages.PrivacyPolicyLink), '_blank', 'noreferrer');
  }, [
    intl
  ]);

  const handleLinkToTermsOfUse = React.useCallback(() => {
    window.open(intl.formatMessage(messages.TermsOfUseLink), '_blank', 'noreferrer');
  }, [
    intl
  ]);

  const handleSignIn = React.useCallback(async () => {
    await msal.instance.loginRedirect(loginParams);
  }, [
    msal
  ]);

  React.useEffect(() => {
    changeTheme(ThemeName.light);
  }, [
    changeTheme
  ]);

  return (
    <Presenter
      onLinkToGitHub={handleLinkToGitHub}
      onLinkToPrivacyPolicy={handleLinkToPrivacyPolicy}
      onLinkToTermsOfUse={handleLinkToTermsOfUse}
      onSignIn={handleSignIn} />
  );

}

export default HomePage;
