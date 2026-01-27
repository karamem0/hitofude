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

import Presenter from './ExplorerHeaderMenuList.presenter';

beforeEach(() => {
  vi.clearAllMocks();
  vi.resetModules();
});

it('should match the snapshot when the folder is not undefined', () => {
  // Setup
  const container = document.createElement('div');
  const params = {
    allFiles: true,
    selectedFolder: {
      files: [
        {
          baseName: 'Annual Financial Report (DRAFT)',
          extension: '.docx',
          fullName: 'Annual Financial Report (DRAFT).docx',
          id: '01BYE5RZ4FL7NVUU4UDVHIRG32OLTW4IKM'
        }
      ],
      id: '01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K',
      name: 'Attachments',
      parentId: '01BYE5RZ56Y2GOVW7725BZO354PWSELRRZ'
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

it('should match the snapshot when the folder is undefined', () => {
  // Setup
  const container = document.createElement('div');
  const params = {
    allFiles: true,
    selectedFolder: undefined
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
