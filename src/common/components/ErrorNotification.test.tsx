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

beforeEach(() => {
  vi.clearAllMocks();
  vi.resetModules();
});

it('should match the snapshot when the message is not undedined', () => {
  // Setup
  const params = {
    message: {
      id: 'ErrorMessage',
      defaultMessage: 'Something went wrong'
    }
  };
  // Execute
  const { asFragment } = render(
    <IntlProvider>
      <ThemeProvider>
        <Presenter {...params} />
      </ThemeProvider>
    </IntlProvider>
  );
  // Assert
  expect(asFragment()).toMatchSnapshot();
});

it('should match the snapshot when the message is undedined', () => {
  // Setup
  const params = {
    message: undefined
  };
  // Execute
  const { asFragment } = render(
    <IntlProvider>
      <ThemeProvider>
        <Presenter {...params} />
      </ThemeProvider>
    </IntlProvider>
  );
  // Assert
  expect(asFragment()).toMatchSnapshot();
});
