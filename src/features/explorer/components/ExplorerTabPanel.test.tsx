//
// Copyright (c) 2023-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import IntlProvider from '../../../providers/IntlProvider';
import Presenter from './ExplorerTabPanel.presenter';
import ThemeProvider from '../../../providers/ThemeProvider';
import { render } from '@testing-library/react';

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

it('should match the snapshot when the folder is not undedined', () => {
  const params = {
    allFiles: true,
    fileConflicts: [],
    selectedFolder: {
      id: '01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K',
      name: 'Attachments',
      parentId: '01BYE5RZ56Y2GOVW7725BZO354PWSELRRZ',
      files: [
        {
          id: '01BYE5RZ4FL7NVUU4UDVHIRG32OLTW4IKM',
          baseName: 'Annual Financial Report (DRAFT)',
          fullName: 'Annual Financial Report (DRAFT).docx',
          extension: '.docx'
        }
      ]
    }
  };
  const { asFragment } = render(
    <IntlProvider>
      <ThemeProvider>
        <Presenter {...params} />
      </ThemeProvider>
    </IntlProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});

it('should match the snapshot when the folder is undedined', () => {
  const params = {
    allFiles: true,
    fileConflicts: [],
    selectedFolder: undefined
  };
  const { asFragment } = render(
    <IntlProvider>
      <ThemeProvider>
        <Presenter {...params} />
      </ThemeProvider>
    </IntlProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});
