//
// Copyright (c) 2023-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import { defineMessages } from 'react-intl';
import parentMessages from '../messages';

const messages = {
  ...parentMessages,
  ...defineMessages({
    FeatureDescriprtion1: { defaultMessage: 'A web application that enables to you to write Markdown file via OneDrive (Personal, work or school).' },
    FeatureDescriprtion2: { defaultMessage: 'Only runs client JavaScript, no server code is executed.' },
    FeatureDescriprtion3: { defaultMessage: 'It\'s easy to get started. Just sign in.' },
    FeatureTitle: { defaultMessage: 'What is Hitofude?' },
    GitHub: { defaultMessage: 'GitHub' },
    GitHubLink: { defaultMessage: 'https://github.com/karamem0/hitofude' },
    PrivacyPolicy: { defaultMessage: 'Privacy Policy' },
    PrivacyPolicyLink: { defaultMessage: 'https://github.com/karamem0/hitofude/blob/main/PRIVACY_POLICY.md' },
    SignIn: { defaultMessage: 'Sign in with Microsoft account' },
    TermsOfUse: { defaultMessage: 'Terms of Use' },
    TermsOfUseLink: { defaultMessage: 'https://github.com/karamem0/hitofude/blob/main/TERMS_OF_USE.md' }
  })
};

export default messages;
