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
import Presenter from './TreeHeader.presenter';
import ThemeProvider from '../../providers/ThemeProvider';
import userEvent from '@testing-library/user-event';

it('should match the snapshot when the root is true', () => {
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

it('should match the snapshot when the root is false', () => {
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

it('should match the snapshot when the menu is opened', async () => {
  const user = userEvent.setup();
  const container = document.body.appendChild(document.createElement('div'));
  const params = {
    name: 'Explorer',
    menu: (
      <div data-testid="test-Menu" />
    ),
    mountNode: container,
    root: true
  };
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
  await user.click(screen.getByTitle('More option'));
  expect(asFragment()).toMatchSnapshot();
  expect(screen.getByTestId('test-Menu')).toBeInTheDocument();
});
