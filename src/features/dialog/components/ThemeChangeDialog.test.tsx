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
import Presenter from './ThemeChangeDialog.presenter';
import { ThemeName } from '../../../types/Model';
import ThemeProvider from '../../../providers/ThemeProvider';
import userEvent from '@testing-library/user-event';

vi.mock('../../../common/components/ModalDialog', () => ({
  default: ({ children }: React.PropsWithChildren<unknown>) => (
    <div data-testid="test-ModalDialog">
      {children}
    </div>
  )
}));

it('should create a shapshot', () => {
  const container = document.body.appendChild(document.createElement('div'));
  const params = {
    mountNode: container,
    themeName: ThemeName.light
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

it('should raise onChangeTheme event when click a light checkbox', async () => {
  const user = userEvent.setup();
  const container = document.body.appendChild(document.createElement('div'));
  const mock = vi.fn();
  const params = {
    mountNode: container,
    themeName: ThemeName.dark,
    onChangeTheme: mock
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
  await user.click(screen.getByTitle('Light'));
  expect(mock).toHaveBeenCalledWith(expect.anything(), ThemeName.light);
});

it('should raise onChangeTheme event when click a dark checkbox', async () => {
  const user = userEvent.setup();
  const container = document.body.appendChild(document.createElement('div'));
  const mock = vi.fn();
  const params = {
    mountNode: container,
    themeName: ThemeName.light,
    onChangeTheme: mock
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
  await user.click(screen.getByTitle('Dark'));
  expect(mock).toHaveBeenCalledWith(expect.anything(), ThemeName.dark);
});
