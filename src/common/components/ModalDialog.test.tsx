//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import IntlProvider from '../../providers/IntlProvider';
import Presenter from './ModalDialog.presenter';
import ThemeProvider from '../../providers/ThemeProvider';

it('should create a shapshot when the open parameter is true', () => {
  const params = {
    children: (
      <div data-testid="test-Children" />
    ),
    open: true
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

it('should create a shapshot when the open parameter is false', () => {
  const params = {
    children: (
      <div data-testid="test-Children" />
    ),
    open: false
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