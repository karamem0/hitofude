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
import { Folder } from '../../../types/Model';

import Presenter from './FolderRenameDialog.presenter';

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

it('should match the snapshot when the loading is true', () => {
  // Setup
  const container = document.body.appendChild(document.createElement('div'));
  const params = {
    loading: true,
    mountNode: container,
    value: {
      id: '01BYE5RZ4FL7NVUU4UDVHIRG32OLTW4IKM',
      name: 'Attachments'
    } as Folder
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
  expect(screen.getByText('Save')).toBeDisabled();
});

it('should match the snapshot when the loading is false', async () => {
  // Setup
  const user = userEvent.setup();
  const container = document.body.appendChild(document.createElement('div'));
  const params = {
    loading: false,
    mountNode: container,
    value: {
      id: '01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K',
      name: 'Attachments'
    } as Folder
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
  await user.click(screen.getByPlaceholderText('Folder name'));
  await user.keyboard('1');
  // Assert
  expect(asFragment()).toMatchSnapshot();
  expect(screen.getByText('Save')).not.toBeDisabled();
});
