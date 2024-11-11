//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { DialogType } from '../../../types/Model';
import IntlProvider from '../../../providers/IntlProvider';
import Presenter from './DialogFactory.presenter';
import ThemeProvider from '../../../providers/ThemeProvider';

jest.mock('../components/FileCopyDialog', () =>
  function FileCopyDialog({ children }: React.PropsWithChildren<unknown>) {
    return (
      <div data-testid="test-FileCopyDialog">
        {children}
      </div>
    );
  });

jest.mock('../components/FileCreateDialog', () =>
  function FileCreateDialog({ children }: React.PropsWithChildren<unknown>) {
    return (
      <div data-testid="test-FileCreateDialog">
        {children}
      </div>
    );
  });

jest.mock('../components/FileDeleteDialog', () =>
  function FileDeleteDialog({ children }: React.PropsWithChildren<unknown>) {
    return (
      <div data-testid="test-FileDeleteDialog">
        {children}
      </div>
    );
  });

jest.mock('../components/FileOverwriteDialog', () =>
  function FileOverwriteDialog({ children }: React.PropsWithChildren<unknown>) {
    return (
      <div data-testid="test-FileOverwriteDialog">
        {children}
      </div>
    );
  });

jest.mock('../components/FileRenameDialog', () =>
  function FileRenameDialog({ children }: React.PropsWithChildren<unknown>) {
    return (
      <div data-testid="test-FileRenameDialog">
        {children}
      </div>
    );
  });

jest.mock('../components/FileRestoreDialog', () =>
  function FileRestoreDialog({ children }: React.PropsWithChildren<unknown>) {
    return (
      <div data-testid="test-FileRestoreDialog">
        {children}
      </div>
    );
  });

jest.mock('../components/FolderCreateDialog', () =>
  function FolderCreateDialog({ children }: React.PropsWithChildren<unknown>) {
    return (
      <div data-testid="test-FolderCreateDialog">
        {children}
      </div>
    );
  });

jest.mock('../components/FolderDeleteDialog', () =>
  function FolderDeleteDialog({ children }: React.PropsWithChildren<unknown>) {
    return (
      <div data-testid="test-FolderDeleteDialog">
        {children}
      </div>
    );
  });

jest.mock('../components/FolderRenameDialog', () =>
  function FolderRenameDialog({ children }: React.PropsWithChildren<unknown>) {
    return (
      <div data-testid="test-FolderRenameDialog">
        {children}
      </div>
    );
  });

jest.mock('../components/LinkCopyDialog', () =>
  function LinkCopyDialog({ children }: React.PropsWithChildren<unknown>) {
    return (
      <div data-testid="test-LinkCopyDialog">
        {children}
      </div>
    );
  });

jest.mock('../components/ThemeChangeDialog', () =>
  function ThemeChangeDialog({ children }: React.PropsWithChildren<unknown>) {
    return (
      <div data-testid="test-ThemeChangeDialog">
        {children}
      </div>
    );
  });

it('should create a shapshot when the type parameter is changeTheme', () => {
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

it('should create a shapshot when the type parameter is copyFile', () => {
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

it('should create a shapshot when the type parameter is copyLink', () => {
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

it('should create a shapshot when the type parameter is createFile', () => {
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

it('should create a shapshot when the type parameter is createFolder', () => {
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

it('should create a shapshot when the type parameter is deleteFile', () => {
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

it('should create a shapshot when the type parameter is deleteFolder', () => {
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

it('should create a shapshot when the type parameter is overwriteFile', () => {
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

it('should create a shapshot when the type parameter is renameFile', () => {
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

it('should create a shapshot when the type parameter is restoreFile', () => {
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

it('should create a shapshot when the type parameter is renameFolder', () => {
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

it('should create a shapshot when the type parameter is undefined', () => {
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
