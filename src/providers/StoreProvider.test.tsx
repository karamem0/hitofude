//
// Copyright (c) 2023-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import StoreProvider, { useStore } from './StoreProvider';
import { renderHook, waitFor } from '@testing-library/react';
import { ActionType } from '../types/Store';
import ServiceProvider from './ServiceProvider';
import ThemeProvider from './ThemeProvider';

const mockReducer = vi.hoisted(() => vi.fn());

vi.mock('../stores/Reducer', () => ({
  reducer: () => mockReducer
}));

vi.mock('./ServiceProvider', () => ({
  default: ({ children }: React.PropsWithChildren<unknown>) => (
    <div data-testid="test-ServiceProvider">
      {children}
    </div>
  ),
  useService: () => ({
    graph: {
      getRootFolder: () => Promise.resolve({
        id: '01HLPWYXN6Y2GOVW7725BZO354PWSELRRZ',
        name: 'root',
        createdDate: new Date('2025-05-23T05:22:56Z'),
        updatedDate: new Date('2025-05-23T05:22:56Z'),
        root: true,
        webUrl: 'https://m365x63639251-my.sharepoint.com/personal/adelev_m365x63639251_onmicrosoft_com/Documents',
        folders: [],
        files: []
      })
    },
    storage: {
      getContentShowMinimap: () => false,
      getContentShowPreview: () => false,
      getContentSyncScroll: () => false,
      getContentWordWrap: () => false,
      getExplorerAllFiles: () => false,
      getThemeName: () => undefined
    }
  })
}));

vi.mock('./ThemeProvider', () => ({
  default: ({ children }: React.PropsWithChildren<unknown>) => (
    <div data-testid="test-ThemeProvider">
      {children}
    </div>
  ),
  useTheme: () => ({
    changeTheme: vi.fn()
  })
}));

beforeEach(() => {
  vi.clearAllMocks();
  vi.resetModules();
});

it('should get the initial state', async () => {
  // Setup
  const actual = {
    type: ActionType.setInitialState,
    data: {
      contentProps: {
        editing: false,
        loading: false,
        scrollPosition: {
          scrollX: 0,
          scrollY: 0
        },
        showMinimap: false,
        showPreview: false,
        syncScroll: false,
        text: '',
        wordWrap: false
      },
      explorerProps: {
        allFiles: false,
        rootFolder: {
          id: '01HLPWYXN6Y2GOVW7725BZO354PWSELRRZ',
          name: 'root',
          createdDate: new Date('2025-05-23T05:22:56Z'),
          updatedDate: new Date('2025-05-23T05:22:56Z'),
          root: true,
          webUrl: 'https://m365x63639251-my.sharepoint.com/personal/adelev_m365x63639251_onmicrosoft_com/Documents',
          folders: [],
          files: []
        }
      },
      markdownProps: {
        defaultText: '',
        scrollPosition: {
          scrollX: 0,
          scrollY: 0
        },
        text: ''
      },
      searchProps: {
        query: ''
      }
    }
  };
  const wrapper = ({ children }: React.PropsWithChildren<unknown>) => (
    <ThemeProvider>
      <ServiceProvider>
        <StoreProvider>
          {children}
        </StoreProvider>
      </ServiceProvider>
    </ThemeProvider>
  );
  // Execute
  const { result } = renderHook(() => useStore(), { wrapper });
  // Assert
  await waitFor(() => {
    expect(result.current).not.toBeUndefined();
    expect(mockReducer).toHaveBeenCalledWith({}, actual);
  });
});

it('should throw an error when the context is not found', async () => {
  // Setup
  const wrapper = ({ children }: React.PropsWithChildren<unknown>) => (
    <ThemeProvider>
      <ServiceProvider>
        {children}
      </ServiceProvider>
    </ThemeProvider>
  );
  // Execute
  expect(() => {
    const error = console.error;
    try {
      console.error = vi.fn();
      renderHook(() => useStore(), { wrapper });
    } finally {
      console.error = error;
    }
  }).toThrowError();
  // Assert
  await waitFor(() => {
    expect(mockReducer).not.toHaveBeenCalled();
  });
});
