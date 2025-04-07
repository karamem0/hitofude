//
// Copyright (c) 2023-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { render, screen } from '@testing-library/react';
import { File } from '../../../types/Model';
import IntlProvider from '../../../providers/IntlProvider';
import Presenter from './FileRenameDialog.presenter';
import ThemeProvider from '../../../providers/ThemeProvider';
import userEvent from '@testing-library/user-event';

vi.mock('../../../common/components/ModalDialog', () => ({
  default: ({ children }: React.PropsWithChildren<unknown>) => (
    <div data-testid="test-ModalDialog">
      {children}
    </div>
  )
}));

it('should match the snapshot when the loading is true', () => {
  const container = document.body.appendChild(document.createElement('div'));
  const params = {
    loading: true,
    mountNode: container,
    value: {
      id: '01f02f1e-fcfa-4629-aab1-c9fad7efe536',
      baseName: 'README',
      extension: 'md'
    } as File
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
  expect(screen.getByTitle('Save')).toBeDisabled();
});

it('should match the snapshot when the loading is false', async () => {
  const user = userEvent.setup();
  const container = document.body.appendChild(document.createElement('div'));
  const params = {
    loading: false,
    mountNode: container,
    value: {
      id: '01f02f1e-fcfa-4629-aab1-c9fad7efe536',
      baseName: 'README',
      extension: 'md'
    } as File
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
  await user.click(screen.getByPlaceholderText('File name'));
  await user.keyboard('1');
  expect(asFragment()).toMatchSnapshot();
  expect(screen.getByTitle('Save')).not.toBeDisabled();
});
