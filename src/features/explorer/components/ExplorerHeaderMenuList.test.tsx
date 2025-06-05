//
// Copyright (c) 2023-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import IntlProvider from '../../../providers/IntlProvider';
import Presenter from './ExplorerHeaderMenuList.presenter';
import ThemeProvider from '../../../providers/ThemeProvider';
import { render } from '@testing-library/react';

it('should match the snapshot when the folder is not undefined', () => {
  const params = {
    allFiles: true,
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

it('should match the snapshot when the folder is undefined', () => {
  const params = {
    allFiles: true,
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
