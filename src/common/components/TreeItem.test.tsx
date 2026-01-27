//
// Copyright (c) 2023-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { render } from '@testing-library/react';
import IntlProvider from '../../providers/IntlProvider';
import ThemeProvider from '../../providers/ThemeProvider';

import Presenter from './TreeItem.presenter';

beforeEach(() => {
  vi.clearAllMocks();
  vi.resetModules();
});

it('should match the snapshot when the selected is true', () => {
  // Setup
  const params = {
    icon: (
      <div data-testid="test-Icon" />
    ),
    info: (
      <div data-testid="test-Info" />
    ),
    menu: (
      <div data-testid="test-Menu" />
    ),
    name: 'Markdown.md',
    selected: true
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

it('should match the snapshot when the selected is false', () => {
  // Setup
  const params = {
    icon: (
      <div data-testid="test-Icon" />
    ),
    info: (
      <div data-testid="test-Info" />
    ),
    menu: (
      <div data-testid="test-Menu" />
    ),
    name: 'Markdown.md',
    selected: false
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

it('should match the snapshot when the menu is undefined', () => {
  // Setup
  const params = {
    icon: (
      <div data-testid="test-Icon" />
    ),
    info: (
      <div data-testid="test-Info" />
    ),
    menu: undefined,
    name: 'Markdown.md',
    selected: false
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
