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
import ThemeProvider from '../../providers/ThemeProvider';

import Presenter from './MsalAdapter.presenter';

beforeEach(() => {
  vi.clearAllMocks();
  vi.resetModules();
});

it('should match the snapshot when the loading is true', () => {
  // Setup
  const params = {
    children: (
      <div data-testid="test-Children" />
    ),
    loading: true
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
  expect(screen.queryByTestId('test-Children')).not.toBeInTheDocument();
});

it('should match the snapshot when the loading is false', () => {
  // Setup
  const params = {
    children: (
      <div data-testid="test-Children" />
    ),
    loading: false
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
  expect(screen.getByTestId('test-Children')).toBeInTheDocument();
});
