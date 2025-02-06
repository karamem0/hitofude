//
// Copyright (c) 2023-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { render, screen } from '@testing-library/react';
import IntlProvider from '../../providers/IntlProvider';
import Presenter from './Loader.presenter';
import ThemeProvider from '../../providers/ThemeProvider';

it('should create a shapshot when the loading parameter is true', () => {
  const params = {
    children: (
      <div data-testid="test-Children" />
    ),
    loading: true
  };
  const { asFragment } = render(
    <IntlProvider>
      <ThemeProvider>
        <Presenter {...params} />
      </ThemeProvider>
    </IntlProvider>
  );
  expect(asFragment()).toMatchSnapshot();
  expect(screen.queryByTestId('test-Children')).not.toBeInTheDocument();
});

it('should create a shapshot when the loading parameter is false', () => {
  const params = {
    children: (
      <div data-testid="test-Children" />
    ),
    loading: false
  };
  const { asFragment } = render(
    <IntlProvider>
      <ThemeProvider>
        <Presenter {...params} />
      </ThemeProvider>
    </IntlProvider>
  );
  expect(asFragment()).toMatchSnapshot();
  expect(screen.getByTestId('test-Children')).toBeInTheDocument();
});
