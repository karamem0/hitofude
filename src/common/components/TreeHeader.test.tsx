//
// Copyright (c) 2023-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import IntlProvider from '../../providers/IntlProvider';
import ThemeProvider from '../../providers/ThemeProvider';

import Presenter from './TreeHeader.presenter';

beforeEach(() => {
  vi.clearAllMocks();
  vi.resetModules();
});

it('should match the snapshot when the root is true', () => {
  // Setup
  const params = {
    menu: (
      <div data-testid="test-Menu" />
    ),
    name: 'Explorer',
    root: true
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

it('should match the snapshot when the root is false', () => {
  // Setup
  const params = {
    menu: (
      <div data-testid="test-Menu" />
    ),
    name: 'Explorer',
    root: false
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

it('should match the snapshot when the menu is opened', async () => {
  // Setup
  const user = userEvent.setup();
  const container = document.body.appendChild(document.createElement('div'));
  const params = {
    menu: (
      <div data-testid="test-Menu" />
    ),
    mountNode: container,
    name: 'Explorer',
    root: true
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
  await user.click(screen.getByLabelText('More option'));
  // Assert
  expect(asFragment()).toMatchSnapshot();
  expect(screen.getByTestId('test-Menu')).toBeInTheDocument();
});
