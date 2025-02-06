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
import Presenter from './FolderDeleteDialog.presenter';
import ThemeProvider from '../../../providers/ThemeProvider';

vi.mock('../../../common/components/ModalDialog', () => ({
  default: ({ children }: React.PropsWithChildren<unknown>) => (
    <div data-testid="test-ModalDialog">
      {children}
    </div>
  )
}));

it('should create a shapshot when the loading parameter is true', () => {
  const container = document.body.appendChild(document.createElement('div'));
  const params = {
    loading: true,
    mountNode: container
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
  expect(screen.getByTitle('OK')).toBeDisabled();
});

it('should create a shapshot when the loading parameter is false', () => {
  const container = document.body.appendChild(document.createElement('div'));
  const params = {
    loading: false,
    mountNode: container
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
  expect(screen.getByTitle('OK')).not.toBeDisabled();
});
