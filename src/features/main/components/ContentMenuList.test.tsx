//
// Copyright (c) 2023-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { render } from '@testing-library/react';
import IntlProvider from '../../../providers/IntlProvider';
import ThemeProvider from '../../../providers/ThemeProvider';

import Presenter from './ContentMenuList.presenter';

beforeEach(() => {
  vi.clearAllMocks();
  vi.resetModules();
});

it('should match the snapshot when the editing is true', () => {
  // Setup
  const params = {
    changed: true,
    editing: true,
    file: {
      baseName: 'Annual Financial Report (DRAFT)',
      extension: '.md',
      id: '01BYE5RZ4FL7NVUU4UDVHIRG32OLTW4IKM',
      mimeType: 'text/markdown'
    },
    showMiniMap: true,
    showPreview: true,
    syncScroll: true,
    wordWrap: true
  };
  // Execute
  const { asFragment } = render(
    <IntlProvider>
      <ThemeProvider>
        <Presenter {...params} />
      </ThemeProvider>
    </IntlProvider>
  );
  // Assert
  expect(asFragment()).toMatchSnapshot();
});

it('should match the snapshot when the editing is false', () => {
  // Setup
  const params = {
    changed: true,
    editing: false,
    file: {
      baseName: 'Annual Financial Report (DRAFT)',
      extension: '.md',
      id: '01BYE5RZ4FL7NVUU4UDVHIRG32OLTW4IKM',
      mimeType: 'text/markdown'
    },
    showMiniMap: true,
    showPreview: true,
    syncScroll: true,
    wordWrap: true
  };
  // Execute
  const { asFragment } = render(
    <IntlProvider>
      <ThemeProvider>
        <Presenter {...params} />
      </ThemeProvider>
    </IntlProvider>
  );
  // Assert
  expect(asFragment()).toMatchSnapshot();
});
