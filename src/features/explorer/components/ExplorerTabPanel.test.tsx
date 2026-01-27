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

import Presenter from './ExplorerTabPanel.presenter';

vi.mock('./ExplorerFileTreeItem', () => ({
  default: ({ children }: React.PropsWithChildren<unknown>) => (
    <div data-testid="test-ExplorerFileTreeItem">
      {children}
    </div>
  )
}));

vi.mock('./ExplorerFolderTreeItem', () => ({
  default: ({ children }: React.PropsWithChildren<unknown>) => (
    <div data-testid="test-ExplorerFolderTreeItem">
      {children}
    </div>
  )
}));

vi.mock('../../../common/components/TreeHeader', () => ({
  default: ({ children }: React.PropsWithChildren<unknown>) => (
    <div data-testid="test-TreeHeader">
      {children}
    </div>
  )
}));

beforeEach(() => {
  vi.clearAllMocks();
  vi.resetModules();
});

it('should match the snapshot when the folder is not undedined', () => {
  // Setup
  const params = {
    allFiles: true,
    fileConflicts: [],
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
        <Presenter {...params} />
      </ThemeProvider>
    </IntlProvider>
  );
  // Assert
  expect(asFragment()).toMatchSnapshot();
});

it('should match the snapshot when the folder is undedined', () => {
  // Setup
  const params = {
    allFiles: true,
    fileConflicts: [],
    selectedFolder: undefined
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
