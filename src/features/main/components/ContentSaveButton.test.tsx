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
import IntlProvider from '../../../providers/IntlProvider';
import ThemeProvider from '../../../providers/ThemeProvider';

import Presenter from './ContentSaveButton.presenter';

beforeEach(() => {
  vi.clearAllMocks();
  vi.resetModules();
});

it('should match the snapshot when the disabled is true', async () => {
  // Setup
  const user = userEvent.setup();
  const params = {
    disabled: true
  };
  // Execute
  const { asFragment } = render(
    <IntlProvider>
      <ThemeProvider>
        <Presenter {...params} />
      </ThemeProvider>
    </IntlProvider>
  );
  await user.click(screen.getByText('Save'));
  // Assert
  expect(asFragment()).toMatchSnapshot();
});

it('should match the snapshot when the disabled is false', async () => {
  // Setup
  const user = userEvent.setup();
  const params = {
    disabled: false
  };
  // Execute
  const { asFragment } = render(
    <IntlProvider>
      <ThemeProvider>
        <Presenter {...params} />
      </ThemeProvider>
    </IntlProvider>
  );
  await user.click(screen.getByText('Save'));
  // Assert
  expect(asFragment()).toMatchSnapshot();
});
