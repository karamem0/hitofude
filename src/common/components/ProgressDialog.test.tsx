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
import Presenter from './ProgressDialog.presenter';
import { ProgressType } from '../../types/Model';
import ThemeProvider from '../../providers/ThemeProvider';

it('should create a shapshot when the type parameter is save', () => {
  const container = document.body.appendChild(document.createElement('div'));
  const params = {
    mountNode: container,
    type: 'save' as ProgressType
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
  expect(screen.getByText('Saving...')).toBeInTheDocument();
});

it('should create a shapshot when the type parameter is upload', () => {
  const container = document.body.appendChild(document.createElement('div'));
  const params = {
    mountNode: container,
    type: 'upload' as ProgressType
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
  expect(screen.getByText('Uploading...')).toBeInTheDocument();
});

it('should create a shapshot when the type parameter is undefined', () => {
  const container = document.body.appendChild(document.createElement('div'));
  const params = {
    mountNode: container,
    type: undefined
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
