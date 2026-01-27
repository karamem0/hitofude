//
// Copyright (c) 2023-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { render, screen } from '@testing-library/react';
import IntlProvider from '../../providers/IntlProvider';
import ThemeProvider from '../../providers/ThemeProvider';
import { ProgressType } from '../../types/Model';

import Presenter from './ProgressDialog.presenter';

beforeEach(() => {
  vi.clearAllMocks();
  vi.resetModules();
});

it('should match the snapshot when the type is save', () => {
  // Setup
  const container = document.body.appendChild(document.createElement('div'));
  const params = {
    mountNode: container,
    type: 'save' as ProgressType
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
  expect(screen.getByText('Saving...')).toBeInTheDocument();
});

it('should match the snapshot when the type is upload', () => {
  // Setup
  const container = document.body.appendChild(document.createElement('div'));
  const params = {
    mountNode: container,
    type: 'upload' as ProgressType
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
  expect(screen.getByText('Uploading...')).toBeInTheDocument();
});

it('should match the snapshot when the type is undefined', () => {
  // Setup
  const container = document.body.appendChild(document.createElement('div'));
  const params = {
    mountNode: container,
    type: undefined
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
