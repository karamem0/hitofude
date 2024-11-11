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
import Presenter from './SidePanel.presenter';
import ThemeProvider from '../../providers/ThemeProvider';

it('should create a shapshot when the open parameter is true', () => {
  const container = document.body.appendChild(document.createElement('div'));
  const params = {
    children: (
      <div data-testid="test-Children" />
    ),
    mountNode: container,
    open: true,
    title: 'Side Panel'
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
  expect(asFragment()).toMatchSnapshot();
  expect(screen.getByTestId('test-Children')).toBeInTheDocument();
});

it('should create a shapshot when the open parameter is false', () => {
  const container = document.body.appendChild(document.createElement('div'));
  const params = {
    children: (
      <div data-testid="test-Children" />
    ),
    mountNode: container,
    open: false,
    title: 'Side Panel'
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
  expect(asFragment()).toMatchSnapshot();
  expect(screen.queryByTestId('test-Children')).not.toBeInTheDocument();
});
