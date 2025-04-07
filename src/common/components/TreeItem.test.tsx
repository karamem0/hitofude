//
// Copyright (c) 2023-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import IntlProvider from '../../providers/IntlProvider';
import Presenter from './TreeItem.presenter';
import ThemeProvider from '../../providers/ThemeProvider';
import { render } from '@testing-library/react';

it('should match the snapshot when the selected is true', () => {
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
  const { asFragment } = render(
    <IntlProvider>
      <ThemeProvider>
        <Presenter {...params} />
      </ThemeProvider>
    </IntlProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});

it('should match the snapshot when the selected is false', () => {
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
  const { asFragment } = render(
    <IntlProvider>
      <ThemeProvider>
        <Presenter {...params} />
      </ThemeProvider>
    </IntlProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});

it('should match the snapshot when the menu is undefined', () => {
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
  const { asFragment } = render(
    <IntlProvider>
      <ThemeProvider>
        <Presenter {...params} />
      </ThemeProvider>
    </IntlProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});
