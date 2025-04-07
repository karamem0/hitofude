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
import Presenter from './ScrollSynchronizer.presenter';
import ThemeProvider from '../../providers/ThemeProvider';

it('should match the snapshot', () => {
  const params = {
    children: (
      <div data-testid="test-Children" />
    )
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
