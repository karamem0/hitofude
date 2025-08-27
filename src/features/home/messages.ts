//
// Copyright (c) 2023-2025 karamem0
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
    FeatureTitle: { defaultMessage: 'What is Hitofude?' },
    FeatureDescriprtion1: { defaultMessage: 'A web application that enables to you to write Markdown file via OneDrive (Personal, work or school).' },
    FeatureDescriprtion2: { defaultMessage: 'Only runs client JavaScript, no server code is executed.' },
    FeatureDescriprtion3: { defaultMessage: 'It\'s easy to get started. Just sign in.' },
    GitHub: { defaultMessage: 'GitHub' },
    GitHubLink: { defaultMessage: 'https://github.com/karamem0/hitofude' },
    PrivacyPolicy: { defaultMessage: 'Privacy Policy' },
    PrivacyPolicyLink: { defaultMessage: 'https://github.com/karamem0/hitofude/blob/main/PRIVACY_POLICY.md' },
    TermsOfUse: { defaultMessage: 'Terms of Use' },
    TermsOfUseLink: { defaultMessage: 'https://github.com/karamem0/hitofude/blob/main/TERMS_OF_USE.md' },
    SignIn: { defaultMessage: 'Sign in with Microsoft account' }
  })
};

export default messages;
