//
// Copyright (c) 2023-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { render, screen } from '@testing-library/react';
import IntlProvider from '../../../providers/IntlProvider';
import ThemeProvider from '../../../providers/ThemeProvider';

import Presenter from './ExplorerFileMenuList.presenter';
import userEvent from '@testing-library/user-event';

beforeEach(() => {
  vi.clearAllMocks();
  vi.resetModules();
});

it('should match the snapshot when the file type is markdown', () => {
  // Setup
  const container = document.body.appendChild(document.createElement('div'));
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

it('should match the snapshot when the file type is not markdown', () => {
  // Setup
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
        <Presenter {...params} />
      </ThemeProvider>
    </IntlProvider>
  );
  // Assert
  expect(asFragment()).toMatchSnapshot();
});

it('should call onMenuClick when Copy file button is clicked', async () => {
  // Setup
  const onClick = vi.fn();
  const user = userEvent.setup();
  const params = {
    file: {
      id: '01BYE5RZ4FL7NVUU4UDVHIRG32OLTW4IKM',
      baseName: 'Annual Financial Report (DRAFT)',
      extension: '.md',
      mimeType: 'text/markdown'
    },
    onMenuClick: onClick
  };
  const actual = {
    type: 'copyFile',
    data: {
      id: '01BYE5RZ4FL7NVUU4UDVHIRG32OLTW4IKM',
      baseName: 'Annual Financial Report (DRAFT)',
      extension: '.md',
      mimeType: 'text/markdown'
    }
  };
  // Execute
  render(
    <IntlProvider>
      <ThemeProvider>
        <Presenter {...params} />
      </ThemeProvider>
    </IntlProvider>
  );
  await user.click(screen.getByText('Copy file'));
  // Assert
  expect(onClick).toBeCalledWith(expect.anything(), actual);
});

it('should call onMenuClick when Copy link button is clicked', async () => {
  // Setup
  const onClick = vi.fn();
  const user = userEvent.setup();
  const params = {
    file: {
      id: '01BYE5RZ4FL7NVUU4UDVHIRG32OLTW4IKM',
      baseName: 'Annual Financial Report (DRAFT)',
      extension: '.md',
      mimeType: 'text/markdown'
    },
    onMenuClick: onClick
  };
  const actual = {
    type: 'copyLink',
    data: {
      id: '01BYE5RZ4FL7NVUU4UDVHIRG32OLTW4IKM',
      baseName: 'Annual Financial Report (DRAFT)',
      extension: '.md',
      mimeType: 'text/markdown'
    }
  };
  // Execute
  render(
    <IntlProvider>
      <ThemeProvider>
        <Presenter {...params} />
      </ThemeProvider>
    </IntlProvider>
  );
  await user.click(screen.getByText('Copy link'));
  // Assert
  expect(onClick).toBeCalledWith(expect.anything(), actual);
});
