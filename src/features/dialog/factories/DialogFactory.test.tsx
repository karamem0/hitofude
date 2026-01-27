//
// Copyright (c) 2023-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { render, screen } from '@testing-library/react';
import IntlProvider from '../../../providers/IntlProvider';
import ThemeProvider from '../../../providers/ThemeProvider';
import { DialogType } from '../../../types/Model';

import Presenter from './DialogFactory.presenter';

vi.mock('../components/FileCopyDialog', () => ({
  default: ({ children }: React.PropsWithChildren<unknown>) => (
    <div data-testid="test-FileCopyDialog">
      {children}
    </div>
  )
}));

vi.mock('../components/FileCreateDialog', () => ({
  default: ({ children }: React.PropsWithChildren<unknown>) => (
    <div data-testid="test-FileCreateDialog">
      {children}
    </div>
  )
}));

vi.mock('../components/FileDeleteDialog', () => ({
  default: ({ children }: React.PropsWithChildren<unknown>) => (
    <div data-testid="test-FileDeleteDialog">
      {children}
    </div>
  )
}));

vi.mock('../components/FileOverwriteDialog', () => ({
  default: ({ children }: React.PropsWithChildren<unknown>) => (
    <div data-testid="test-FileOverwriteDialog">
      {children}
    </div>
  )
}));

vi.mock('../components/FileRenameDialog', () => ({
  default: ({ children }: React.PropsWithChildren<unknown>) => (
    <div data-testid="test-FileRenameDialog">
      {children}
    </div>
  )
}));

vi.mock('../components/FileRestoreDialog', () => ({
  default: ({ children }: React.PropsWithChildren<unknown>) => (
    <div data-testid="test-FileRestoreDialog">
      {children}
    </div>
  )
}));

vi.mock('../components/FolderCreateDialog', () => ({
  default: ({ children }: React.PropsWithChildren<unknown>) => (
    <div data-testid="test-FolderCreateDialog">
      {children}
    </div>
  )
}));

vi.mock('../components/FolderDeleteDialog', () => ({
  default: ({ children }: React.PropsWithChildren<unknown>) => (
    <div data-testid="test-FolderDeleteDialog">
      {children}
    </div>
  )
}));

vi.mock('../components/FolderRenameDialog', () => ({
  default: ({ children }: React.PropsWithChildren<unknown>) => (
    <div data-testid="test-FolderRenameDialog">
      {children}
    </div>
  )
}));

vi.mock('../components/LinkCopyDialog', () => ({
  default: ({ children }: React.PropsWithChildren<unknown>) => (
    <div data-testid="test-LinkCopyDialog">
      {children}
    </div>
  )
}));

vi.mock('../components/ThemeChangeDialog', () => ({
  default: ({ children }: React.PropsWithChildren<unknown>) => (
    <div data-testid="test-ThemeChangeDialog">
      {children}
    </div>
  )
}));

beforeEach(() => {
  vi.clearAllMocks();
  vi.resetModules();
});

it('should match the snapshot when the type is changeTheme', () => {
  // Setup
  const params = {
    action: {
      data: undefined,
      type: 'changeTheme' as DialogType
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
  expect(screen.getByTestId('test-ThemeChangeDialog')).toBeInTheDocument();
});

it('should match the snapshot when the type is copyFile', () => {
  // Setup
  const params = {
    action: {
      data: undefined,
      type: 'copyFile' as DialogType
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
  expect(screen.getByTestId('test-FileCopyDialog')).toBeInTheDocument();
});

it('should match the snapshot when the type is copyLink', () => {
  // Setup
  const params = {
    action: {
      data: undefined,
      type: 'copyLink' as DialogType
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
  expect(screen.getByTestId('test-LinkCopyDialog')).toBeInTheDocument();
});

it('should match the snapshot when the type is createFile', () => {
  // Setup
  const params = {
    action: {
      data: undefined,
      type: 'createFile' as DialogType
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
  expect(screen.getByTestId('test-FileCreateDialog')).toBeInTheDocument();
});

it('should match the snapshot when the type is createFolder', () => {
  // Setup
  const params = {
    action: {
      data: undefined,
      type: 'createFolder' as DialogType
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
  expect(screen.getByTestId('test-FolderCreateDialog')).toBeInTheDocument();
});

it('should match the snapshot when the type is deleteFile', () => {
  // Setup
  const params = {
    action: {
      data: undefined,
      type: 'deleteFile' as DialogType
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
  expect(screen.getByTestId('test-FileDeleteDialog')).toBeInTheDocument();
});

it('should match the snapshot when the type is deleteFolder', () => {
  // Setup
  const params = {
    action: {
      data: undefined,
      type: 'deleteFolder' as DialogType
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
  expect(screen.getByTestId('test-FolderDeleteDialog')).toBeInTheDocument();
});

it('should match the snapshot when the type is overwriteFile', () => {
  // Setup
  const params = {
    action: {
      data: undefined,
      type: 'overwriteFile' as DialogType
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
  expect(screen.getByTestId('test-FileOverwriteDialog')).toBeInTheDocument();
});

it('should match the snapshot when the type is renameFile', () => {
  // Setup
  const params = {
    action: {
      data: undefined,
      type: 'renameFile' as DialogType
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
  expect(screen.getByTestId('test-FileRenameDialog')).toBeInTheDocument();
});

it('should match the snapshot when the type is restoreFile', () => {
  // Setup
  const params = {
    action: {
      data: undefined,
      type: 'restoreFile' as DialogType
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
  expect(screen.getByTestId('test-FileRestoreDialog')).toBeInTheDocument();
});

it('should match the snapshot when the type is renameFolder', () => {
  // Setup
  const params = {
    action: {
      data: undefined,
      type: 'renameFolder' as DialogType
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
  expect(screen.getByTestId('test-FolderRenameDialog')).toBeInTheDocument();
});

it('should match the snapshot when the type is undefined', () => {
  // Setup
  const params = {
    action: undefined
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
