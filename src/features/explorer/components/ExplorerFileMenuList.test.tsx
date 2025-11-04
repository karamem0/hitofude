//
// Copyright (c) 2023-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { Menu, MenuPopover } from '@fluentui/react-components';
import IntlProvider from '../../../providers/IntlProvider';
import ThemeProvider from '../../../providers/ThemeProvider';
import { render } from '@testing-library/react';

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
      id: '01BYE5RZ4FL7NVUU4UDVHIRG32OLTW4IKM',
      baseName: 'Annual Financial Report (DRAFT)',
      extension: '.md',
      mimeType: 'text/markdown'
    }
  };
  // Execute
  const { asFragment } = render(
    <IntlProvider>
      <ThemeProvider>
        <Menu
          mountNode={container}
          open>
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
      id: '01BYE5RZ4FL7NVUU4UDVHIRG32OLTW4IKM',
      baseName: 'Annual Financial Report (DRAFT)',
      extension: '.docx',
      mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    }
  };
  // Execute
  const { asFragment } = render(
    <IntlProvider>
      <ThemeProvider>
        <Menu
          mountNode={container}
          open>
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
