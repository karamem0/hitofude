//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { useMsal } from '@azure/msal-react';

import { useTheme } from '../../../providers/ThemeProvider';
import { ThemeName } from '../../../types/Model';

import Presenter from './HomePage.presenter';

function HomePage() {

  const msal = useMsal();
  const { changeTheme } = useTheme();

  const handleLinkToGitHub = React.useCallback(() => {
    window.open('https://github.com/karamem0/hitofude', '_blank', 'noreferrer');
  }, []);

  const handleLinkToPrivacyPolicy = React.useCallback(() => {
    window.open('https://github.com/karamem0/hitofude/blob/main/PRIVACY_POLICY.md', '_blank', 'noreferrer');
  }, []);

  const handleLinkToTermsAndConditions = React.useCallback(() => {
    window.open('https://github.com/karamem0/hitofude/blob/main/TERMS_AND_CONDITIONS.md', '_blank', 'noreferrer');
  }, []);

  const handleSignIn = React.useCallback(async () => {
    await msal.instance.loginRedirect({
      scopes: [
        'User.Read',
        'Files.ReadWrite'
      ]
    });
  }, [ msal ]);

  React.useEffect(() => {
    changeTheme(ThemeName.light);
  }, [
    changeTheme
  ]);

  return (
    <Presenter
      onLinkToGitHub={handleLinkToGitHub}
      onLinkToPrivacyPolicy={handleLinkToPrivacyPolicy}
      onLinkToTermsAndConditions={handleLinkToTermsAndConditions}
      onSignIn={handleSignIn} />
  );

}

export default HomePage;
