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

import Presenter from './SidePanel.presenter';

beforeEach(() => {
  vi.clearAllMocks();
  vi.resetModules();
});

it('should match the snapshot when the open is true', () => {
  // Setup
  const container = document.body.appendChild(document.createElement('div'));
  const params = {
    children: (
      <div data-testid="test-Children" />
    ),
    mountNode: container,
    open: true,
    title: 'Side Panel'
  };
  // Execute
  const { asFragment } = render(
    <IntlProvider>
      <ThemeProvider>
        <Presenter {...params} />
      </ThemeProvider>
    </IntlProvider>,
    {
      container
    }
  );
  // Assert
  expect(asFragment()).toMatchSnapshot();
  expect(screen.getByTestId('test-Children')).toBeInTheDocument();
});

it('should match the snapshot when the open is false', () => {
  // Setup
  const container = document.body.appendChild(document.createElement('div'));
  const params = {
    children: (
      <div data-testid="test-Children" />
    ),
    mountNode: container,
    open: false,
    title: 'Side Panel'
  };
  // Execute
  const { asFragment } = render(
    <IntlProvider>
      <ThemeProvider>
        <Presenter {...params} />
      </ThemeProvider>
    </IntlProvider>,
    {
      container
    }
  );
  // Assert
  expect(asFragment()).toMatchSnapshot();
  expect(screen.queryByTestId('test-Children')).not.toBeInTheDocument();
});
