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
import { File } from '../../../types/Model';
import IntlProvider from '../../../providers/IntlProvider';
import Presenter from './FileRestoreDialog.presenter';
import ThemeProvider from '../../../providers/ThemeProvider';

jest.mock('../../../common/components/ModalDialog', () =>
  function ModalDialog({ children }: React.PropsWithChildren<unknown>) {
    return (
      <div data-testid="test-ModalDialog">
        {children}
      </div>
    );
  }
);

it('should create a shapshot when the loading parameter is true', () => {
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
  expect(screen.getByTitle('OK')).toBeDisabled();
});

it('should create a shapshot when the loading parameter is false', () => {
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
  expect(asFragment()).toMatchSnapshot();
  expect(screen.getByTitle('OK')).not.toBeDisabled();
});
