//
// Copyright (c) 2023-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { Menu, MenuPopover } from '@fluentui/react-components';
import { render } from '@testing-library/react';
import IntlProvider from '../../../providers/IntlProvider';
import ThemeProvider from '../../../providers/ThemeProvider';

import Presenter from './ExplorerFileMenuList.presenter';

beforeEach(() => {
  vi.clearAllMocks();
  vi.resetModules();
});

it('should match the snapshot when the file type is markdown', () => {
  // Setup
  const container = document.createElement('div');
  const params = {
    file: {
      baseName: 'Annual Financial Report (DRAFT)',
      extension: '.md',
      id: '01BYE5RZ4FL7NVUU4UDVHIRG32OLTW4IKM',
      mimeType: 'text/markdown'
    }
  };
  // Execute
  const { asFragment } = render(
    <IntlProvider>
      <ThemeProvider>
        <Menu
          open
          mountNode={container}>
          <MenuPopover>
            <Presenter {...params} />
          </MenuPopover>
        </Menu>
      </ThemeProvider>
    </IntlProvider>,
    {
      container
    }
  );
  // Assert
  expect(asFragment()).toMatchSnapshot();
});

it('should match the snapshot when the file type is not markdown', () => {
  // Setup
  const container = document.createElement('div');
  const params = {
    file: {
      baseName: 'Annual Financial Report (DRAFT)',
      extension: '.docx',
      id: '01BYE5RZ4FL7NVUU4UDVHIRG32OLTW4IKM',
      mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    }
  };
  // Execute
  const { asFragment } = render(
    <IntlProvider>
      <ThemeProvider>
        <Menu
          open
          mountNode={container}>
          <MenuPopover>
            <Presenter {...params} />
          </MenuPopover>
        </Menu>
      </ThemeProvider>
    </IntlProvider>,
    {
      container
    }
  );
  // Assert
  expect(asFragment()).toMatchSnapshot();
});
