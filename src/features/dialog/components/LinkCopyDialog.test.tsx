//
// Copyright (c) 2023-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { render, screen } from '@testing-library/react';
import IntlProvider from '../../../providers/IntlProvider';
import ThemeProvider from '../../../providers/ThemeProvider';
import userEvent from '@testing-library/user-event';

import Presenter from './LinkCopyDialog.presenter';

vi.mock('../../../common/components/ModalDialog', () => ({
  default: ({ children }: React.PropsWithChildren<unknown>) => (
    <div data-testid="test-ModalDialog">
      {children}
    </div>
  )
}));

beforeEach(() => {
  vi.clearAllMocks();
  vi.resetModules();
});

it('should match the snapshot when the loading copied is true', () => {
  // Setup
  const container = document.body.appendChild(document.createElement('div'));
  const params = {
    copied: true,
    mountNode: container,
    value: 'https://example.com'
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
});

it('should match the snapshot when the loading copied is false', () => {
  // Setup
  const container = document.body.appendChild(document.createElement('div'));
  const params = {
    copied: false,
    mountNode: container,
    value: 'https://example.com'
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
});

it('should raise onCopy event when the click a button', async () => {
  // Setup
  const user = userEvent.setup();
  const container = document.body.appendChild(document.createElement('div'));
  const mock = vi.fn();
  const params = {
    copied: false,
    mountNode: container,
    value: 'https://example.com',
    onCopy: mock
  };
  // Execute
  render(
    <IntlProvider>
      <ThemeProvider>
        <Presenter {...params} />
      </ThemeProvider>
    </IntlProvider>,
    {
      container
    }
  );
  await user.click(screen.getByTitle('Copy'));
  // Assert
  expect(mock).toHaveBeenCalled();
});
