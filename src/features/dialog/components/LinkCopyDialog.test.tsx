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
import Presenter from './LinkCopyDialog.presenter';
import ThemeProvider from '../../../providers/ThemeProvider';
import userEvent from '@testing-library/user-event';

vi.mock('../../../common/components/ModalDialog', () => ({
  default: ({ children }: React.PropsWithChildren<unknown>) => (
    <div data-testid="test-ModalDialog">
      {children}
    </div>
  )
}));

it('should create a shapshot when the loading copied is true', () => {
  const container = document.body.appendChild(document.createElement('div'));
  const params = {
    copied: true,
    mountNode: container,
    value: 'https://example.com'
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
});

it('should create a shapshot when the loading copied is false', () => {
  const container = document.body.appendChild(document.createElement('div'));
  const params = {
    copied: false,
    mountNode: container,
    value: 'https://example.com'
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
});

it('should raise onCopy event when click a button', async () => {
  const user = userEvent.setup();
  const container = document.body.appendChild(document.createElement('div'));
  const mock = vi.fn();
  const params = {
    copied: false,
    mountNode: container,
    value: 'https://example.com',
    onCopy: mock
  };
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
  expect(mock).toHaveBeenCalled();
});
