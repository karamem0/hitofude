//
// Copyright (c) 2023-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { render, screen } from '@testing-library/react';
import { DialogType } from '../../../types/Model';
import IntlProvider from '../../../providers/IntlProvider';
import Presenter from './DialogFactory.presenter';
import ThemeProvider from '../../../providers/ThemeProvider';

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

it('should match the snapshot when the type is changeTheme', () => {
  const params = {
    action: {
      type: 'changeTheme' as DialogType,
      data: undefined
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
  expect(screen.getByTestId('test-ThemeChangeDialog')).toBeInTheDocument();
});

it('should match the snapshot when the type is copyFile', () => {
  const params = {
    action: {
      type: 'copyFile' as DialogType,
      data: undefined
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
  expect(screen.getByTestId('test-FileCopyDialog')).toBeInTheDocument();
});

it('should match the snapshot when the type is copyLink', () => {
  const params = {
    action: {
      type: 'copyLink' as DialogType,
      data: undefined
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
  expect(screen.getByTestId('test-LinkCopyDialog')).toBeInTheDocument();
});

it('should match the snapshot when the type is createFile', () => {
  const params = {
    action: {
      type: 'createFile' as DialogType,
      data: undefined
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
  expect(screen.getByTestId('test-FileCreateDialog')).toBeInTheDocument();
});

it('should match the snapshot when the type is createFolder', () => {
  const params = {
    action: {
      type: 'createFolder' as DialogType,
      data: undefined
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
  expect(screen.getByTestId('test-FolderCreateDialog')).toBeInTheDocument();
});

it('should match the snapshot when the type is deleteFile', () => {
  const params = {
    action: {
      type: 'deleteFile' as DialogType,
      data: undefined
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
  expect(screen.getByTestId('test-FileDeleteDialog')).toBeInTheDocument();
});

it('should match the snapshot when the type is deleteFolder', () => {
  const params = {
    action: {
      type: 'deleteFolder' as DialogType,
      data: undefined
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
  expect(screen.getByTestId('test-FolderDeleteDialog')).toBeInTheDocument();
});

it('should match the snapshot when the type is overwriteFile', () => {
  const params = {
    action: {
      type: 'overwriteFile' as DialogType,
      data: undefined
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
  expect(screen.getByTestId('test-FileOverwriteDialog')).toBeInTheDocument();
});

it('should match the snapshot when the type is renameFile', () => {
  const params = {
    action: {
      type: 'renameFile' as DialogType,
      data: undefined
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
  expect(screen.getByTestId('test-FileRenameDialog')).toBeInTheDocument();
});

it('should match the snapshot when the type is restoreFile', () => {
  const params = {
    action: {
      type: 'restoreFile' as DialogType,
      data: undefined
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
  expect(screen.getByTestId('test-FileRestoreDialog')).toBeInTheDocument();
});

it('should match the snapshot when the type is renameFolder', () => {
  const params = {
    action: {
      type: 'renameFolder' as DialogType,
      data: undefined
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
  expect(screen.getByTestId('test-FolderRenameDialog')).toBeInTheDocument();
});

it('should match the snapshot when the type is undefined', () => {
  const params = {
    action: undefined
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
