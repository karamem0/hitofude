//
// Copyright (c) 2023-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { IntlProvider as Provider, createIntl } from 'react-intl';
import en from '../translations/en.json';
import ja from '../translations/ja.json';

const translations: { [key: string]: Record<string, string> } = {
  en,
  ja
};

const intl = createIntl({
  defaultLocale: 'en',
  locale: window.navigator.language.substring(0, 2),
  messages: translations[window.navigator.language]
});

function IntlProvider(props: Readonly<React.PropsWithChildren<unknown>>) {

  const { children } = props;

  return (
    <Provider {...intl}>
      {children}
    </Provider>
  );

}

export default IntlProvider;
