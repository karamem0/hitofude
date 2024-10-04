//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import IntlProvider from '../../providers/IntlProvider';
import Loader from './Loader.presenter';
import ThemeProvider from '../../providers/ThemeProvider';
import { render } from '@testing-library/react';

it('should create shapshot if loading is "true"', async () => {
  const params = {
    children: (
      <div data-testid="Children" />
    ),
    loading: true
  };
  const { asFragment } = render(
    <IntlProvider>
      <ThemeProvider>
        <Loader {...params} />
      </ThemeProvider>
    </IntlProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});

it('should create shapshot if loading is "false"', async () => {
  const params = {
    children: (
      <div data-testid="Children" />
    ),
    loading: false
  };
  const { asFragment } = render(
    <IntlProvider>
      <ThemeProvider>
        <Loader {...params} />
      </ThemeProvider>
    </IntlProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});
