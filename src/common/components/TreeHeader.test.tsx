//
// Copyright (c) 2023-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import IntlProvider from '../../providers/IntlProvider';
import Presenter from './TreeHeader.presenter';
import ThemeProvider from '../../providers/ThemeProvider';
import { render } from '@testing-library/react';

it('should create a shapshot when the root parameter is true', () => {
  const params = {
    name: 'Explorer',
    menu: (
      <div data-testid="test-Menu" />
    ),
    root: true
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

it('should create a shapshot when the root parameter is false', () => {
  const params = {
    name: 'Explorer',
    menu: (
      <div data-testid="test-Menu" />
    ),
    root: false
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
