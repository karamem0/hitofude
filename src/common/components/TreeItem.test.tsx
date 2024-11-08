//
// Copyright (c) 2023-2024 karamem0
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

it('should create shapshot if selected is "true"', async () => {
  const params = {
    icon: (
      <div data-testid="icon" />
    ),
    info: (
      <div data-testid="info" />
    ),
    key: '1',
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

it('should create shapshot if root is "false"', async () => {
  const params = {
    icon: (
      <div data-testid="icon" />
    ),
    info: (
      <div data-testid="info" />
    ),
    key: '1',
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
