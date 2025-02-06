//
// Copyright (c) 2023-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import IntlProvider from '../../providers/IntlProvider';
import Presenter from './ErrorNotification.presenter';
import ThemeProvider from '../../providers/ThemeProvider';
import { render } from '@testing-library/react';

it('should create a shapshot when the message parameter is not undedined', () => {
  const params = {
    message: {
      id: 'ErrorMessage',
      defaultMessage: 'Something went wrong'
    }
  };
  const { asFragment } = render(
    <IntlProvider>
      <ThemeProvider>
        <Presenter {...params} />
      </ThemeProvider>
    </IntlProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});

it('should create a shapshot when the message parameter is undedined', () => {
  const params = {
    message: undefined
  };
  const { asFragment } = render(
    <IntlProvider>
      <ThemeProvider>
        <Presenter {...params} />
      </ThemeProvider>
    </IntlProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});
