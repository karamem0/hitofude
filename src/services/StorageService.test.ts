//
// Copyright (c) 2023-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import { TabType, ThemeName } from '../types/Model';
import { StorageService } from './StorageService';

beforeEach(() => {
  vi.clearAllMocks();
  vi.resetModules();
});

describe('getContentShowMinimap', () => {

  it('should get false when the stored value is 0', () => {
    // Setup
    const params = {
      storage: {
        getItem: vi.fn(() => '0')
      } as unknown as Storage,
      accountId: '3a2bc284-f11c-4676-a9e1-6310eea60f26',
      tenantId: 'dd172b04-e4e2-4084-885c-47c9cc57f059'
    };
    // Execute
    const target = new StorageService(params.storage, params.accountId, params.tenantId);
    const actual = target.getContentShowMinimap();
    // Assert
    expect(actual).toBe(false);
    expect(params.storage.getItem).toHaveBeenCalledWith(`${params.accountId}.${params.tenantId}.contentShowMinimap`);
  });

  it('should get true when the stored value is 1', () => {
    // Setup
    const params = {
      storage: {
        getItem: vi.fn(() => '1')
      } as unknown as Storage,
      accountId: '3a2bc284-f11c-4676-a9e1-6310eea60f26',
      tenantId: 'dd172b04-e4e2-4084-885c-47c9cc57f059'
    };
    // Execute
    const target = new StorageService(params.storage, params.accountId, params.tenantId);
    const actual = target.getContentShowMinimap();
    // Assert
    expect(actual).toBe(true);
    expect(params.storage.getItem).toHaveBeenCalledWith(`${params.accountId}.${params.tenantId}.contentShowMinimap`);
  });

  it('should get false when the stored value does not exist', () => {
    // Setup
    const params = {
      storage: {
        getItem: vi.fn()
      } as unknown as Storage,
      accountId: '3a2bc284-f11c-4676-a9e1-6310eea60f26',
      tenantId: 'dd172b04-e4e2-4084-885c-47c9cc57f059'
    };
    // Execute
    const target = new StorageService(params.storage, params.accountId, params.tenantId);
    const actual = target.getContentShowMinimap();
    // Assert
    expect(actual).toBe(false);
    expect(params.storage.getItem).toHaveBeenCalledWith(`${params.accountId}.${params.tenantId}.contentShowMinimap`);
  });

});

describe('getContentShowPreview', () => {

  it('should get false when the stored value is 0', () => {
    // Setup
    const params = {
      storage: {
        getItem: vi.fn(() => '0')
      } as unknown as Storage,
      accountId: '3a2bc284-f11c-4676-a9e1-6310eea60f26',
      tenantId: 'dd172b04-e4e2-4084-885c-47c9cc57f059'
    };
    // Execute
    const target = new StorageService(params.storage, params.accountId, params.tenantId);
    const actual = target.getContentShowPreview();
    // Assert
    expect(actual).toBe(false);
    expect(params.storage.getItem).toHaveBeenCalledWith(`${params.accountId}.${params.tenantId}.contentShowPreview`);
  });

  it('should get true when the stored value is 1', () => {
    // Setup
    const params = {
      storage: {
        getItem: vi.fn(() => '1')
      } as unknown as Storage,
      accountId: '3a2bc284-f11c-4676-a9e1-6310eea60f26',
      tenantId: 'dd172b04-e4e2-4084-885c-47c9cc57f059'
    };
    // Execute
    const target = new StorageService(params.storage, params.accountId, params.tenantId);
    const actual = target.getContentShowPreview();
    // Assert
    expect(actual).toBe(true);
    expect(params.storage.getItem).toHaveBeenCalledWith(`${params.accountId}.${params.tenantId}.contentShowPreview`);
  });

  it('should get false when the stored value does not exist', () => {
    // Setup
    const params = {
      storage: {
        getItem: vi.fn()
      } as unknown as Storage,
      accountId: '3a2bc284-f11c-4676-a9e1-6310eea60f26',
      tenantId: 'dd172b04-e4e2-4084-885c-47c9cc57f059'
    };
    // Execute
    const target = new StorageService(params.storage, params.accountId, params.tenantId);
    const actual = target.getContentShowPreview();
    // Assert
    expect(actual).toBe(false);
    expect(params.storage.getItem).toHaveBeenCalledWith(`${params.accountId}.${params.tenantId}.contentShowPreview`);
  });

});

describe('getContentSyncScroll', () => {

  it('should get false when the stored value is 0', () => {
    // Setup
    const params = {
      storage: {
        getItem: vi.fn(() => '0')
      } as unknown as Storage,
      accountId: '3a2bc284-f11c-4676-a9e1-6310eea60f26',
      tenantId: 'dd172b04-e4e2-4084-885c-47c9cc57f059'
    };
    // Execute
    const target = new StorageService(params.storage, params.accountId, params.tenantId);
    const actual = target.getContentSyncScroll();
    // Assert
    expect(actual).toBe(false);
    expect(params.storage.getItem).toHaveBeenCalledWith(`${params.accountId}.${params.tenantId}.contentSyncScroll`);
  });

  it('should get true when the stored value is 1', () => {
    // Setup
    const params = {
      storage: {
        getItem: vi.fn(() => '1')
      } as unknown as Storage,
      accountId: '3a2bc284-f11c-4676-a9e1-6310eea60f26',
      tenantId: 'dd172b04-e4e2-4084-885c-47c9cc57f059'
    };
    // Execute
    const target = new StorageService(params.storage, params.accountId, params.tenantId);
    const actual = target.getContentSyncScroll();
    // Assert
    expect(actual).toBe(true);
    expect(params.storage.getItem).toHaveBeenCalledWith(`${params.accountId}.${params.tenantId}.contentSyncScroll`);
  });

  it('should get false when the stored value does not exist', () => {
    // Setup
    const params = {
      storage: {
        getItem: vi.fn()
      } as unknown as Storage,
      accountId: '3a2bc284-f11c-4676-a9e1-6310eea60f26',
      tenantId: 'dd172b04-e4e2-4084-885c-47c9cc57f059'
    };
    // Execute
    const target = new StorageService(params.storage, params.accountId, params.tenantId);
    const actual = target.getContentSyncScroll();
    // Assert
    expect(actual).toBe(false);
    expect(params.storage.getItem).toHaveBeenCalledWith(`${params.accountId}.${params.tenantId}.contentSyncScroll`);
  });

});

describe('getContentWordWrap', () => {

  it('should get false when the stored value is 0', () => {
    // Setup
    const params = {
      storage: {
        getItem: vi.fn(() => '0')
      } as unknown as Storage,
      accountId: '3a2bc284-f11c-4676-a9e1-6310eea60f26',
      tenantId: 'dd172b04-e4e2-4084-885c-47c9cc57f059'
    };
    // Execute
    const target = new StorageService(params.storage, params.accountId, params.tenantId);
    const actual = target.getContentWordWrap();
    // Assert
    expect(actual).toBe(false);
    expect(params.storage.getItem).toHaveBeenCalledWith(`${params.accountId}.${params.tenantId}.contentWordWrap`);
  });

  it('should get true when the stored value is 1', () => {
    // Setup
    const params = {
      storage: {
        getItem: vi.fn(() => '1')
      } as unknown as Storage,
      accountId: '3a2bc284-f11c-4676-a9e1-6310eea60f26',
      tenantId: 'dd172b04-e4e2-4084-885c-47c9cc57f059'
    };
    // Execute
    const target = new StorageService(params.storage, params.accountId, params.tenantId);
    const actual = target.getContentWordWrap();
    // Assert
    expect(actual).toBe(true);
    expect(params.storage.getItem).toHaveBeenCalledWith(`${params.accountId}.${params.tenantId}.contentWordWrap`);
  });

  it('should get false when the stored value does not exist', () => {
    // Setup
    const params = {
      storage: {
        getItem: vi.fn()
      } as unknown as Storage,
      accountId: '3a2bc284-f11c-4676-a9e1-6310eea60f26',
      tenantId: 'dd172b04-e4e2-4084-885c-47c9cc57f059'
    };
    // Execute
    const target = new StorageService(params.storage, params.accountId, params.tenantId);
    const actual = target.getContentWordWrap();
    // Assert
    expect(actual).toBe(false);
    expect(params.storage.getItem).toHaveBeenCalledWith(`${params.accountId}.${params.tenantId}.contentWordWrap`);
  });

});

describe('getExplorerAllFiles', () => {

  it('should get false when the stored value is 0', () => {
    // Setup
    const params = {
      storage: {
        getItem: vi.fn(() => '0')
      } as unknown as Storage,
      accountId: '3a2bc284-f11c-4676-a9e1-6310eea60f26',
      tenantId: 'dd172b04-e4e2-4084-885c-47c9cc57f059'
    };
    // Execute
    const target = new StorageService(params.storage, params.accountId, params.tenantId);
    const actual = target.getExplorerAllFiles();
    // Assert
    expect(actual).toBe(false);
    expect(params.storage.getItem).toHaveBeenCalledWith(`${params.accountId}.${params.tenantId}.explorerAllFiles`);
  });

  it('should get true when the stored value is 1', () => {
    // Setup
    const params = {
      storage: {
        getItem: vi.fn(() => '1')
      } as unknown as Storage,
      accountId: '3a2bc284-f11c-4676-a9e1-6310eea60f26',
      tenantId: 'dd172b04-e4e2-4084-885c-47c9cc57f059'
    };
    // Execute
    const target = new StorageService(params.storage, params.accountId, params.tenantId);
    const actual = target.getExplorerAllFiles();
    // Assert
    expect(actual).toBe(true);
    expect(params.storage.getItem).toHaveBeenCalledWith(`${params.accountId}.${params.tenantId}.explorerAllFiles`);
  });

  it('should get false when the stored value does not exist', () => {
    // Setup
    const params = {
      storage: {
        getItem: vi.fn()
      } as unknown as Storage,
      accountId: '3a2bc284-f11c-4676-a9e1-6310eea60f26',
      tenantId: 'dd172b04-e4e2-4084-885c-47c9cc57f059'
    };
    // Execute
    const target = new StorageService(params.storage, params.accountId, params.tenantId);
    const actual = target.getExplorerAllFiles();
    // Assert
    expect(actual).toBe(false);
    expect(params.storage.getItem).toHaveBeenCalledWith(`${params.accountId}.${params.tenantId}.explorerAllFiles`);
  });

});

describe('getExplorerFileId', () => {

  it('should get the stored value when the it exists', () => {
    // Setup
    const params = {
      storage: {
        getItem: vi.fn(() => '5afaf657-ba0d-4086-b265-dd49223554df')
      } as unknown as Storage,
      accountId: '3a2bc284-f11c-4676-a9e1-6310eea60f26',
      tenantId: 'dd172b04-e4e2-4084-885c-47c9cc57f059'
    };
    // Execute
    const target = new StorageService(params.storage, params.accountId, params.tenantId);
    const actual = target.getExplorerFileId();
    // Assert
    expect(actual).toBe('5afaf657-ba0d-4086-b265-dd49223554df');
    expect(params.storage.getItem).toHaveBeenCalledWith(`${params.accountId}.${params.tenantId}.explorerFileId`);
  });

  it('should get undefined when the stored value does not exist', () => {
    // Setup
    const params = {
      storage: {
        getItem: vi.fn()
      } as unknown as Storage,
      accountId: '3a2bc284-f11c-4676-a9e1-6310eea60f26',
      tenantId: 'dd172b04-e4e2-4084-885c-47c9cc57f059'
    };
    // Execute
    const target = new StorageService(params.storage, params.accountId, params.tenantId);
    const actual = target.getExplorerFileId();
    // Assert
    expect(actual).toBeUndefined();
    expect(params.storage.getItem).toHaveBeenCalledWith(`${params.accountId}.${params.tenantId}.explorerFileId`);
  });

});

describe('getExplorerFolderId', () => {

  it('should get the stored value when the it exists', () => {
    // Setup
    const params = {
      storage: {
        getItem: vi.fn(() => '2852c972-c060-4d93-a871-225ec23c4524')
      } as unknown as Storage,
      accountId: '3a2bc284-f11c-4676-a9e1-6310eea60f26',
      tenantId: 'dd172b04-e4e2-4084-885c-47c9cc57f059'
    };
    // Execute
    const target = new StorageService(params.storage, params.accountId, params.tenantId);
    const actual = target.getExplorerFolderId();
    // Assert
    expect(actual).toBe('2852c972-c060-4d93-a871-225ec23c4524');
    expect(params.storage.getItem).toHaveBeenCalledWith(`${params.accountId}.${params.tenantId}.explorerFolderId`);
  });

  it('should get undefined when the stored value does not exist', () => {
    // Setup
    const params = {
      storage: {
        getItem: vi.fn()
      } as unknown as Storage,
      accountId: '3a2bc284-f11c-4676-a9e1-6310eea60f26',
      tenantId: 'dd172b04-e4e2-4084-885c-47c9cc57f059'
    };
    // Execute
    const target = new StorageService(params.storage, params.accountId, params.tenantId);
    const actual = target.getExplorerFolderId();
    // Assert
    expect(actual).toBeUndefined();
    expect(params.storage.getItem).toHaveBeenCalledWith(`${params.accountId}.${params.tenantId}.explorerFolderId`);
  });

});

describe('getTabOpen', () => {

  it('should get false when the stored value is 0', () => {
    // Setup
    const params = {
      storage: {
        getItem: vi.fn(() => '0')
      } as unknown as Storage,
      accountId: '3a2bc284-f11c-4676-a9e1-6310eea60f26',
      tenantId: 'dd172b04-e4e2-4084-885c-47c9cc57f059'
    };
    // Execute
    const target = new StorageService(params.storage, params.accountId, params.tenantId);
    const actual = target.getTabOpen();
    // Assert
    expect(actual).toBe(false);
    expect(params.storage.getItem).toHaveBeenCalledWith(`${params.accountId}.${params.tenantId}.tabOpen`);
  });

  it('should get true when the stored value is 1', () => {
    // Setup
    const params = {
      storage: {
        getItem: vi.fn(() => '1')
      } as unknown as Storage,
      accountId: '3a2bc284-f11c-4676-a9e1-6310eea60f26',
      tenantId: 'dd172b04-e4e2-4084-885c-47c9cc57f059'
    };
    // Execute
    const target = new StorageService(params.storage, params.accountId, params.tenantId);
    const actual = target.getTabOpen();
    // Assert
    expect(actual).toBe(true);
    expect(params.storage.getItem).toHaveBeenCalledWith(`${params.accountId}.${params.tenantId}.tabOpen`);
  });

  it('should get true when the stored value does not exist', () => {
    // Setup
    const params = {
      storage: {
        getItem: vi.fn()
      } as unknown as Storage,
      accountId: '3a2bc284-f11c-4676-a9e1-6310eea60f26',
      tenantId: 'dd172b04-e4e2-4084-885c-47c9cc57f059'
    };
    // Execute
    const target = new StorageService(params.storage, params.accountId, params.tenantId);
    const actual = target.getTabOpen();
    // Assert
    expect(actual).toBe(true);
    expect(params.storage.getItem).toHaveBeenCalledWith(`${params.accountId}.${params.tenantId}.tabOpen`);
  });

});

describe('getTabType', () => {

  it('should get the stored value when the stored value is 0', () => {
    // Setup
    const params = {
      storage: {
        getItem: vi.fn(() => '0')
      } as unknown as Storage,
      accountId: '3a2bc284-f11c-4676-a9e1-6310eea60f26',
      tenantId: 'dd172b04-e4e2-4084-885c-47c9cc57f059'
    };
    // Execute
    const target = new StorageService(params.storage, params.accountId, params.tenantId);
    const actual = target.getTabType();
    // Assert
    expect(actual).toBe(TabType.explorer);
    expect(params.storage.getItem).toHaveBeenCalledWith(`${params.accountId}.${params.tenantId}.tabType`);
  });

  it('should get the stored value when the stored value is 1', () => {
    // Setup
    const params = {
      storage: {
        getItem: vi.fn(() => '1')
      } as unknown as Storage,
      accountId: '3a2bc284-f11c-4676-a9e1-6310eea60f26',
      tenantId: 'dd172b04-e4e2-4084-885c-47c9cc57f059'
    };
    // Execute
    const target = new StorageService(params.storage, params.accountId, params.tenantId);
    const actual = target.getTabType();
    // Assert
    expect(actual).toBe(TabType.search);
    expect(params.storage.getItem).toHaveBeenCalledWith(`${params.accountId}.${params.tenantId}.tabType`);
  });

  it('should get the default value when the stored value does not exist', () => {
    // Setup
    const params = {
      storage: {
        getItem: vi.fn()
      } as unknown as Storage,
      accountId: '3a2bc284-f11c-4676-a9e1-6310eea60f26',
      tenantId: 'dd172b04-e4e2-4084-885c-47c9cc57f059'
    };
    // Execute
    const target = new StorageService(params.storage, params.accountId, params.tenantId);
    const actual = target.getTabType();
    // Assert
    expect(actual).toBe(TabType.explorer);
    expect(params.storage.getItem).toHaveBeenCalledWith(`${params.accountId}.${params.tenantId}.tabType`);
  });

});

describe('getThemeName', () => {

  it('should get the stored value when the stored value is 0', () => {
    // Setup
    const params = {
      storage: {
        getItem: vi.fn(() => '0')
      } as unknown as Storage,
      accountId: '3a2bc284-f11c-4676-a9e1-6310eea60f26',
      tenantId: 'dd172b04-e4e2-4084-885c-47c9cc57f059'
    };
    // Execute
    const target = new StorageService(params.storage, params.accountId, params.tenantId);
    const actual = target.getThemeName();
    // Assert
    expect(actual).toBe(ThemeName.light);
    expect(params.storage.getItem).toHaveBeenCalledWith(`${params.accountId}.${params.tenantId}.themeName`);
  });

  it('should get the stored value when the stored value is 1', () => {
    // Setup
    const params = {
      storage: {
        getItem: vi.fn(() => '1')
      } as unknown as Storage,
      accountId: '3a2bc284-f11c-4676-a9e1-6310eea60f26',
      tenantId: 'dd172b04-e4e2-4084-885c-47c9cc57f059'
    };
    // Execute
    const target = new StorageService(params.storage, params.accountId, params.tenantId);
    const actual = target.getThemeName();
    // Assert
    expect(actual).toBe(ThemeName.dark);
    expect(params.storage.getItem).toHaveBeenCalledWith(`${params.accountId}.${params.tenantId}.themeName`);
  });

  it('should get the default value when the stored value does not exist', () => {
    // Setup
    const params = {
      storage: {
        getItem: vi.fn()
      } as unknown as Storage,
      accountId: '3a2bc284-f11c-4676-a9e1-6310eea60f26',
      tenantId: 'dd172b04-e4e2-4084-885c-47c9cc57f059'
    };
    // Execute
    const target = new StorageService(params.storage, params.accountId, params.tenantId);
    const actual = target.getThemeName();
    // Assert
    expect(actual).toBe(ThemeName.light);
    expect(params.storage.getItem).toHaveBeenCalledWith(`${params.accountId}.${params.tenantId}.themeName`);
  });

});

describe('setContentShowMinimap', () => {

  it('should set the value to 0 when the false is passed', () => {
    // Setup
    const params = {
      storage: {
        setItem: vi.fn()
      } as unknown as Storage,
      accountId: '3a2bc284-f11c-4676-a9e1-6310eea60f26',
      tenantId: 'dd172b04-e4e2-4084-885c-47c9cc57f059'
    };
    // Execute
    const target = new StorageService(params.storage, params.accountId, params.tenantId);
    target.setContentShowMinimap(false);
    // Assert
    expect(params.storage.setItem).toHaveBeenCalledWith(`${params.accountId}.${params.tenantId}.contentShowMinimap`, '0');
  });

  it('should set the value to 1 when the true is passed', () => {
    // Setup
    const params = {
      storage: {
        setItem: vi.fn()
      } as unknown as Storage,
      accountId: '3a2bc284-f11c-4676-a9e1-6310eea60f26',
      tenantId: 'dd172b04-e4e2-4084-885c-47c9cc57f059'
    };
    // Execute
    const target = new StorageService(params.storage, params.accountId, params.tenantId);
    target.setContentShowMinimap(true);
    // Assert
    expect(params.storage.setItem).toHaveBeenCalledWith(`${params.accountId}.${params.tenantId}.contentShowMinimap`, '1');
  });

  it('should remove the value when the undefined is passed', () => {
    // Setup
    const params = {
      storage: {
        removeItem: vi.fn()
      } as unknown as Storage,
      accountId: '3a2bc284-f11c-4676-a9e1-6310eea60f26',
      tenantId: 'dd172b04-e4e2-4084-885c-47c9cc57f059'
    };
    // Execute
    const target = new StorageService(params.storage, params.accountId, params.tenantId);
    target.setContentShowMinimap(undefined);
    // Assert
    expect(params.storage.removeItem).toHaveBeenCalledWith(`${params.accountId}.${params.tenantId}.contentShowMinimap`);
  });

});

describe('setContentShowPreview', () => {

  it('should set the value to 0 when the false is passed', () => {
    // Setup
    const params = {
      storage: {
        setItem: vi.fn()
      } as unknown as Storage,
      accountId: '3a2bc284-f11c-4676-a9e1-6310eea60f26',
      tenantId: 'dd172b04-e4e2-4084-885c-47c9cc57f059'
    };
    // Execute
    const target = new StorageService(params.storage, params.accountId, params.tenantId);
    target.setContentShowPreview(false);
    // Assert
    expect(params.storage.setItem).toHaveBeenCalledWith(`${params.accountId}.${params.tenantId}.contentShowPreview`, '0');
  });

  it('should set the value to 1 when the true is passed', () => {
    // Setup
    const params = {
      storage: {
        setItem: vi.fn()
      } as unknown as Storage,
      accountId: '3a2bc284-f11c-4676-a9e1-6310eea60f26',
      tenantId: 'dd172b04-e4e2-4084-885c-47c9cc57f059'
    };
    // Execute
    const target = new StorageService(params.storage, params.accountId, params.tenantId);
    target.setContentShowPreview(true);
    // Assert
    expect(params.storage.setItem).toHaveBeenCalledWith(`${params.accountId}.${params.tenantId}.contentShowPreview`, '1');
  });

  it('should remove the value when the undefined is passed', () => {
    // Setup
    const params = {
      storage: {
        removeItem: vi.fn()
      } as unknown as Storage,
      accountId: '3a2bc284-f11c-4676-a9e1-6310eea60f26',
      tenantId: 'dd172b04-e4e2-4084-885c-47c9cc57f059'
    };
    // Execute
    const target = new StorageService(params.storage, params.accountId, params.tenantId);
    target.setContentShowPreview(undefined);
    // Assert
    expect(params.storage.removeItem).toHaveBeenCalledWith(`${params.accountId}.${params.tenantId}.contentShowPreview`);
  });

});

describe('setContentSyncScroll', () => {

  it('should set the value to 0 when the false is passed', () => {
    // Setup
    const params = {
      storage: {
        setItem: vi.fn()
      } as unknown as Storage,
      accountId: '3a2bc284-f11c-4676-a9e1-6310eea60f26',
      tenantId: 'dd172b04-e4e2-4084-885c-47c9cc57f059'
    };
    // Execute
    const target = new StorageService(params.storage, params.accountId, params.tenantId);
    target.setContentSyncScroll(false);
    // Assert
    expect(params.storage.setItem).toHaveBeenCalledWith(`${params.accountId}.${params.tenantId}.contentSyncScroll`, '0');
  });

  it('should set the value to 1 when the true is passed', () => {
    // Setup
    const params = {
      storage: {
        setItem: vi.fn()
      } as unknown as Storage,
      accountId: '3a2bc284-f11c-4676-a9e1-6310eea60f26',
      tenantId: 'dd172b04-e4e2-4084-885c-47c9cc57f059'
    };
    // Execute
    const target = new StorageService(params.storage, params.accountId, params.tenantId);
    target.setContentSyncScroll(true);
    // Assert
    expect(params.storage.setItem).toHaveBeenCalledWith(`${params.accountId}.${params.tenantId}.contentSyncScroll`, '1');
  });

  it('should remove the value when the undefined is passed', () => {
    // Setup
    const params = {
      storage: {
        removeItem: vi.fn()
      } as unknown as Storage,
      accountId: '3a2bc284-f11c-4676-a9e1-6310eea60f26',
      tenantId: 'dd172b04-e4e2-4084-885c-47c9cc57f059'
    };
    // Execute
    const target = new StorageService(params.storage, params.accountId, params.tenantId);
    target.setContentSyncScroll(undefined);
    // Assert
    expect(params.storage.removeItem).toHaveBeenCalledWith(`${params.accountId}.${params.tenantId}.contentSyncScroll`);
  });

});

describe('setContentWordWrap', () => {

  it('should set the value to 0 when the false is passed', () => {
    // Setup
    const params = {
      storage: {
        setItem: vi.fn()
      } as unknown as Storage,
      accountId: '3a2bc284-f11c-4676-a9e1-6310eea60f26',
      tenantId: 'dd172b04-e4e2-4084-885c-47c9cc57f059'
    };
    // Execute
    const target = new StorageService(params.storage, params.accountId, params.tenantId);
    target.setContentWordWrap(false);
    // Assert
    expect(params.storage.setItem).toHaveBeenCalledWith(`${params.accountId}.${params.tenantId}.contentWordWrap`, '0');
  });

  it('should set the value to 1 when the true is passed', () => {
    // Setup
    const params = {
      storage: {
        setItem: vi.fn()
      } as unknown as Storage,
      accountId: '3a2bc284-f11c-4676-a9e1-6310eea60f26',
      tenantId: 'dd172b04-e4e2-4084-885c-47c9cc57f059'
    };
    // Execute
    const target = new StorageService(params.storage, params.accountId, params.tenantId);
    target.setContentWordWrap(true);
    // Assert
    expect(params.storage.setItem).toHaveBeenCalledWith(`${params.accountId}.${params.tenantId}.contentWordWrap`, '1');
  });

  it('should remove the value when the undefined is passed', () => {
    // Setup
    const params = {
      storage: {
        removeItem: vi.fn()
      } as unknown as Storage,
      accountId: '3a2bc284-f11c-4676-a9e1-6310eea60f26',
      tenantId: 'dd172b04-e4e2-4084-885c-47c9cc57f059'
    };
    // Execute
    const target = new StorageService(params.storage, params.accountId, params.tenantId);
    target.setContentWordWrap(undefined);
    // Assert
    expect(params.storage.removeItem).toHaveBeenCalledWith(`${params.accountId}.${params.tenantId}.contentWordWrap`);
  });

});

describe('setExplorerAllFiles', () => {

  it('should set the value to 0 when the false is passed', () => {
    // Setup
    const params = {
      storage: {
        setItem: vi.fn()
      } as unknown as Storage,
      accountId: '3a2bc284-f11c-4676-a9e1-6310eea60f26',
      tenantId: 'dd172b04-e4e2-4084-885c-47c9cc57f059'
    };
    // Execute
    const target = new StorageService(params.storage, params.accountId, params.tenantId);
    target.setExplorerAllFiles(false);
    // Assert
    expect(params.storage.setItem).toHaveBeenCalledWith(`${params.accountId}.${params.tenantId}.explorerAllFiles`, '0');
  });

  it('should set the value to 1 when the true is passed', () => {
    // Setup
    const params = {
      storage: {
        setItem: vi.fn()
      } as unknown as Storage,
      accountId: '3a2bc284-f11c-4676-a9e1-6310eea60f26',
      tenantId: 'dd172b04-e4e2-4084-885c-47c9cc57f059'
    };
    // Execute
    const target = new StorageService(params.storage, params.accountId, params.tenantId);
    target.setExplorerAllFiles(true);
    // Assert
    expect(params.storage.setItem).toHaveBeenCalledWith(`${params.accountId}.${params.tenantId}.explorerAllFiles`, '1');
  });

  it('should remove the value when the undefined is passed', () => {
    // Setup
    const params = {
      storage: {
        removeItem: vi.fn()
      } as unknown as Storage,
      accountId: '3a2bc284-f11c-4676-a9e1-6310eea60f26',
      tenantId: 'dd172b04-e4e2-4084-885c-47c9cc57f059'
    };
    // Execute
    const target = new StorageService(params.storage, params.accountId, params.tenantId);
    target.setExplorerAllFiles(undefined);
    // Assert
    expect(params.storage.removeItem).toHaveBeenCalledWith(`${params.accountId}.${params.tenantId}.explorerAllFiles`);
  });

});

describe('setExplorerFileId', () => {

  it('should set the value when the a value is passed', () => {
    // Setup
    const params = {
      storage: {
        setItem: vi.fn()
      } as unknown as Storage,
      accountId: '3a2bc284-f11c-4676-a9e1-6310eea60f26',
      tenantId: 'dd172b04-e4e2-4084-885c-47c9cc57f059'
    };
    // Execute
    const target = new StorageService(params.storage, params.accountId, params.tenantId);
    target.setExplorerFileId('5afaf657-ba0d-4086-b265-dd49223554df');
    // Assert
    expect(params.storage.setItem).toHaveBeenCalledWith(`${params.accountId}.${params.tenantId}.explorerFileId`, '5afaf657-ba0d-4086-b265-dd49223554df');
  });

  it('should remove the value when the undefined is passed', () => {
    // Setup
    const params = {
      storage: {
        removeItem: vi.fn()
      } as unknown as Storage,
      accountId: '3a2bc284-f11c-4676-a9e1-6310eea60f26',
      tenantId: 'dd172b04-e4e2-4084-885c-47c9cc57f059'
    };
    // Execute
    const target = new StorageService(params.storage, params.accountId, params.tenantId);
    target.setExplorerFileId(undefined);
    // Assert
    expect(params.storage.removeItem).toHaveBeenCalledWith(`${params.accountId}.${params.tenantId}.explorerFileId`);
  });

});

describe('setExplorerFileId', () => {

  it('should set the value when the a value is passed', () => {
    // Setup
    const params = {
      storage: {
        setItem: vi.fn()
      } as unknown as Storage,
      accountId: '3a2bc284-f11c-4676-a9e1-6310eea60f26',
      tenantId: 'dd172b04-e4e2-4084-885c-47c9cc57f059'
    };
    // Execute
    const target = new StorageService(params.storage, params.accountId, params.tenantId);
    target.setExplorerFolderId('2852c972-c060-4d93-a871-225ec23c4524');
    // Assert
    expect(params.storage.setItem).toHaveBeenCalledWith(`${params.accountId}.${params.tenantId}.explorerFolderId`, '2852c972-c060-4d93-a871-225ec23c4524');
  });

  it('should remove the value when the undefined is passed', () => {
    // Setup
    const params = {
      storage: {
        removeItem: vi.fn()
      } as unknown as Storage,
      accountId: '3a2bc284-f11c-4676-a9e1-6310eea60f26',
      tenantId: 'dd172b04-e4e2-4084-885c-47c9cc57f059'
    };
    // Execute
    const target = new StorageService(params.storage, params.accountId, params.tenantId);
    target.setExplorerFolderId(undefined);
    // Assert
    expect(params.storage.removeItem).toHaveBeenCalledWith(`${params.accountId}.${params.tenantId}.explorerFolderId`);
  });

});

describe('setTabOpen', () => {

  it('should set the value to 0 when the false is passed', () => {
    // Setup
    const params = {
      storage: {
        setItem: vi.fn()
      } as unknown as Storage,
      accountId: '3a2bc284-f11c-4676-a9e1-6310eea60f26',
      tenantId: 'dd172b04-e4e2-4084-885c-47c9cc57f059'
    };
    // Execute
    const target = new StorageService(params.storage, params.accountId, params.tenantId);
    target.setTabOpen(false);
    // Assert
    expect(params.storage.setItem).toHaveBeenCalledWith(`${params.accountId}.${params.tenantId}.tabOpen`, '0');
  });

  it('should set the value to 1 when the true is passed', () => {
    // Setup
    const params = {
      storage: {
        setItem: vi.fn()
      } as unknown as Storage,
      accountId: '3a2bc284-f11c-4676-a9e1-6310eea60f26',
      tenantId: 'dd172b04-e4e2-4084-885c-47c9cc57f059'
    };
    // Execute
    const target = new StorageService(params.storage, params.accountId, params.tenantId);
    target.setTabOpen(true);
    // Assert
    expect(params.storage.setItem).toHaveBeenCalledWith(`${params.accountId}.${params.tenantId}.tabOpen`, '1');
  });

  it('should remove the value when the undefined is passed', () => {
    // Setup
    const params = {
      storage: {
        removeItem: vi.fn()
      } as unknown as Storage,
      accountId: '3a2bc284-f11c-4676-a9e1-6310eea60f26',
      tenantId: 'dd172b04-e4e2-4084-885c-47c9cc57f059'
    };
    // Execute
    const target = new StorageService(params.storage, params.accountId, params.tenantId);
    target.setTabOpen(undefined);
    // Assert
    expect(params.storage.removeItem).toHaveBeenCalledWith(`${params.accountId}.${params.tenantId}.tabOpen`);
  });

});

describe('setTabType', () => {

  it('should set the value to 0 when the explorer is passed', () => {
    // Setup
    const params = {
      storage: {
        setItem: vi.fn()
      } as unknown as Storage,
      accountId: '3a2bc284-f11c-4676-a9e1-6310eea60f26',
      tenantId: 'dd172b04-e4e2-4084-885c-47c9cc57f059'
    };
    // Execute
    const target = new StorageService(params.storage, params.accountId, params.tenantId);
    target.setTabType(TabType.explorer);
    // Assert
    expect(params.storage.setItem).toHaveBeenCalledWith(`${params.accountId}.${params.tenantId}.tabType`, '0');
  });

  it('should set the value to 1 when the search is passed', () => {
    // Setup
    const params = {
      storage: {
        setItem: vi.fn()
      } as unknown as Storage,
      accountId: '3a2bc284-f11c-4676-a9e1-6310eea60f26',
      tenantId: 'dd172b04-e4e2-4084-885c-47c9cc57f059'
    };
    // Execute
    const target = new StorageService(params.storage, params.accountId, params.tenantId);
    target.setTabType(TabType.search);
    // Assert
    expect(params.storage.setItem).toHaveBeenCalledWith(`${params.accountId}.${params.tenantId}.tabType`, '1');
  });

  it('should remove the value when the undefined is passed', () => {
    // Setup
    const params = {
      storage: {
        removeItem: vi.fn()
      } as unknown as Storage,
      accountId: '3a2bc284-f11c-4676-a9e1-6310eea60f26',
      tenantId: 'dd172b04-e4e2-4084-885c-47c9cc57f059'
    };
    // Execute
    const target = new StorageService(params.storage, params.accountId, params.tenantId);
    target.setTabType(undefined);
    // Assert
    expect(params.storage.removeItem).toHaveBeenCalledWith(`${params.accountId}.${params.tenantId}.tabType`);
  });

});

describe('setThemeName', () => {

  it('should set the value to 0 when the light is passed', () => {
    // Setup
    const params = {
      storage: {
        setItem: vi.fn()
      } as unknown as Storage,
      accountId: '3a2bc284-f11c-4676-a9e1-6310eea60f26',
      tenantId: 'dd172b04-e4e2-4084-885c-47c9cc57f059'
    };
    // Execute
    const target = new StorageService(params.storage, params.accountId, params.tenantId);
    target.setThemeName(ThemeName.light);
    // Assert
    expect(params.storage.setItem).toHaveBeenCalledWith(`${params.accountId}.${params.tenantId}.themeName`, '0');
  });

  it('should set the value to 1 when the dark is passed', () => {
    // Setup
    const params = {
      storage: {
        setItem: vi.fn()
      } as unknown as Storage,
      accountId: '3a2bc284-f11c-4676-a9e1-6310eea60f26',
      tenantId: 'dd172b04-e4e2-4084-885c-47c9cc57f059'
    };
    // Execute
    const target = new StorageService(params.storage, params.accountId, params.tenantId);
    target.setThemeName(ThemeName.dark);
    // Assert
    expect(params.storage.setItem).toHaveBeenCalledWith(`${params.accountId}.${params.tenantId}.themeName`, '1');
  });

  it('should remove the value when the undefined is passed', () => {
    // Setup
    const params = {
      storage: {
        removeItem: vi.fn()
      } as unknown as Storage,
      accountId: '3a2bc284-f11c-4676-a9e1-6310eea60f26',
      tenantId: 'dd172b04-e4e2-4084-885c-47c9cc57f059'
    };
    // Execute
    const target = new StorageService(params.storage, params.accountId, params.tenantId);
    target.setThemeName(undefined);
    // Assert
    expect(params.storage.removeItem).toHaveBeenCalledWith(`${params.accountId}.${params.tenantId}.themeName`);
  });

});
