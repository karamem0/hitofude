//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import ErrorNotification from './ErrorNotification.presenter';
import IntlProvider from '../../providers/IntlProvider';
import ThemeProvider from '../../providers/ThemeProvider';
import { render } from '@testing-library/react';

it('should create shapshot', async () => {
  const params = {
    message: {
      id: 'ErrorMessage',
      defaultMessage: 'Something went wrong'
    }
  };
  const { asFragment } = render(
    <IntlProvider>
      <ThemeProvider>
        <ErrorNotification {...params} />
      </ThemeProvider>
    </IntlProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});
