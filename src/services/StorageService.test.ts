//
// Copyright (c) 2023-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import { TabType, ThemeName } from '../types/Model';
import { StorageService } from './StorageService';

describe('getContentShowMinimap', () => {

  it('should get false when the stored value is 0', () => {
    const storage = {
      getItem: vi.fn(() => '0')
    } as unknown as Storage;
    const target = new StorageService(storage);
    const actual = target.getContentShowMinimap();
    expect(actual).toBe(false);
    expect(storage.getItem).toHaveBeenCalledWith('contentShowMinimap');
  });

  it('should get true when the stored value is 1', () => {
    const storage = {
      getItem: vi.fn(() => '1')
    } as unknown as Storage;
    const target = new StorageService(storage);
    const actual = target.getContentShowMinimap();
    expect(actual).toBe(true);
    expect(storage.getItem).toHaveBeenCalledWith('contentShowMinimap');
  });

  it('should get false when the stored value does not exist', () => {
    const storage = {
      getItem: vi.fn()
    } as unknown as Storage;
    const target = new StorageService(storage);
    const actual = target.getContentShowMinimap();
    expect(actual).toBe(false);
    expect(storage.getItem).toHaveBeenCalledWith('contentShowMinimap');
  });

});

describe('getContentShowPreview', () => {

  it('should get false when the stored value is 0', () => {
    const storage = {
      getItem: vi.fn(() => '0')
    } as unknown as Storage;
    const target = new StorageService(storage);
    const actual = target.getContentShowPreview();
    expect(actual).toBe(false);
    expect(storage.getItem).toHaveBeenCalledWith('contentShowPreview');
  });

  it('should get true when the stored value is 1', () => {
    const storage = {
      getItem: vi.fn(() => '1')
    } as unknown as Storage;
    const target = new StorageService(storage);
    const actual = target.getContentShowPreview();
    expect(actual).toBe(true);
    expect(storage.getItem).toHaveBeenCalledWith('contentShowPreview');
  });

  it('should get false when the stored value does not exist', () => {
    const storage = {
      getItem: vi.fn()
    } as unknown as Storage;
    const target = new StorageService(storage);
    const actual = target.getContentShowPreview();
    expect(actual).toBe(false);
    expect(storage.getItem).toHaveBeenCalledWith('contentShowPreview');
  });

});

describe('getContentSyncScroll', () => {

  it('should get false when the stored value is 0', () => {
    const storage = {
      getItem: vi.fn(() => '0')
    } as unknown as Storage;
    const target = new StorageService(storage);
    const actual = target.getContentSyncScroll();
    expect(actual).toBe(false);
    expect(storage.getItem).toHaveBeenCalledWith('contentSyncScroll');
  });

  it('should get true when the stored value is 1', () => {
    const storage = {
      getItem: vi.fn(() => '1')
    } as unknown as Storage;
    const target = new StorageService(storage);
    const actual = target.getContentSyncScroll();
    expect(actual).toBe(true);
    expect(storage.getItem).toHaveBeenCalledWith('contentSyncScroll');
  });

  it('should get false when the stored value does not exist', () => {
    const storage = {
      getItem: vi.fn()
    } as unknown as Storage;
    const target = new StorageService(storage);
    const actual = target.getContentSyncScroll();
    expect(actual).toBe(false);
    expect(storage.getItem).toHaveBeenCalledWith('contentSyncScroll');
  });

});

describe('getContentWordWrap', () => {

  it('should get false when the stored value is 0', () => {
    const storage = {
      getItem: vi.fn(() => '0')
    } as unknown as Storage;
    const target = new StorageService(storage);
    const actual = target.getContentWordWrap();
    expect(actual).toBe(false);
    expect(storage.getItem).toHaveBeenCalledWith('contentWordWrap');
  });

  it('should get true when the stored value is 1', () => {
    const storage = {
      getItem: vi.fn(() => '1')
    } as unknown as Storage;
    const target = new StorageService(storage);
    const actual = target.getContentWordWrap();
    expect(actual).toBe(true);
    expect(storage.getItem).toHaveBeenCalledWith('contentWordWrap');
  });

  it('should get false when the stored value does not exist', () => {
    const storage = {
      getItem: vi.fn()
    } as unknown as Storage;
    const target = new StorageService(storage);
    const actual = target.getContentWordWrap();
    expect(actual).toBe(false);
    expect(storage.getItem).toHaveBeenCalledWith('contentWordWrap');
  });

});

describe('getExplorerAllFiles', () => {

  it('should get false when the stored value is 0', () => {
    const storage = {
      getItem: vi.fn(() => '0')
    } as unknown as Storage;
    const target = new StorageService(storage);
    const actual = target.getExplorerAllFiles();
    expect(actual).toBe(false);
    expect(storage.getItem).toHaveBeenCalledWith('explorerAllFiles');
  });

  it('should get true when the stored value is 1', () => {
    const storage = {
      getItem: vi.fn(() => '1')
    } as unknown as Storage;
    const target = new StorageService(storage);
    const actual = target.getExplorerAllFiles();
    expect(actual).toBe(true);
    expect(storage.getItem).toHaveBeenCalledWith('explorerAllFiles');
  });

  it('should get false when the stored value does not exist', () => {
    const storage = {
      getItem: vi.fn()
    } as unknown as Storage;
    const target = new StorageService(storage);
    const actual = target.getExplorerAllFiles();
    expect(actual).toBe(false);
    expect(storage.getItem).toHaveBeenCalledWith('explorerAllFiles');
  });

});

describe('getExplorerFileId', () => {

  it('should get the stored value when the it exists', () => {
    const storage = {
      getItem: vi.fn(() => '5afaf657-ba0d-4086-b265-dd49223554df')
    } as unknown as Storage;
    const target = new StorageService(storage);
    const actual = target.getExplorerFileId();
    expect(actual).toBe('5afaf657-ba0d-4086-b265-dd49223554df');
    expect(storage.getItem).toHaveBeenCalledWith('explorerFileId');
  });

  it('should get undefined when the stored value does not exist', () => {
    const storage = {
      getItem: vi.fn()
    } as unknown as Storage;
    const target = new StorageService(storage);
    const actual = target.getExplorerFileId();
    expect(actual).toBeUndefined();
    expect(storage.getItem).toHaveBeenCalledWith('explorerFileId');
  });

});

describe('getExplorerFolderId', () => {

  it('should get the stored value when the it exists', () => {
    const storage = {
      getItem: vi.fn(() => '2852c972-c060-4d93-a871-225ec23c4524')
    } as unknown as Storage;
    const target = new StorageService(storage);
    const actual = target.getExplorerFolderId();
    expect(actual).toBe('2852c972-c060-4d93-a871-225ec23c4524');
    expect(storage.getItem).toHaveBeenCalledWith('explorerFolderId');
  });

  it('should get undefined when the stored value does not exist', () => {
    const storage = {
      getItem: vi.fn()
    } as unknown as Storage;
    const target = new StorageService(storage);
    const actual = target.getExplorerFolderId();
    expect(actual).toBeUndefined();
    expect(storage.getItem).toHaveBeenCalledWith('explorerFolderId');
  });

});

describe('getTabOpen', () => {

  it('should get false when the stored value is 0', () => {
    const storage = {
      getItem: vi.fn(() => '0')
    } as unknown as Storage;
    const target = new StorageService(storage);
    const actual = target.getTabOpen();
    expect(actual).toBe(false);
    expect(storage.getItem).toHaveBeenCalledWith('tabOpen');
  });

  it('should get true when the stored value is 1', () => {
    const storage = {
      getItem: vi.fn(() => '1')
    } as unknown as Storage;
    const target = new StorageService(storage);
    const actual = target.getTabOpen();
    expect(actual).toBe(true);
    expect(storage.getItem).toHaveBeenCalledWith('tabOpen');
  });

  it('should get true when the stored value does not exist', () => {
    const storage = {
      getItem: vi.fn()
    } as unknown as Storage;
    const target = new StorageService(storage);
    const actual = target.getTabOpen();
    expect(actual).toBe(true);
    expect(storage.getItem).toHaveBeenCalledWith('tabOpen');
  });

});

describe('getTabType', () => {

  it('should get the stored value when the stored value is 0', () => {
    const storage = {
      getItem: vi.fn(() => '0')
    } as unknown as Storage;
    const target = new StorageService(storage);
    const actual = target.getTabType();
    expect(actual).toBe(TabType.explorer);
    expect(storage.getItem).toHaveBeenCalledWith('tabType');
  });

  it('should get the stored value when the stored value is 1', () => {
    const storage = {
      getItem: vi.fn(() => '1')
    } as unknown as Storage;
    const target = new StorageService(storage);
    const actual = target.getTabType();
    expect(actual).toBe(TabType.search);
    expect(storage.getItem).toHaveBeenCalledWith('tabType');
  });

  it('should get the default value when the stored value does not exist', () => {
    const storage = {
      getItem: vi.fn()
    } as unknown as Storage;
    const target = new StorageService(storage);
    const actual = target.getTabType();
    expect(actual).toBe(TabType.explorer);
    expect(storage.getItem).toHaveBeenCalledWith('tabType');
  });

});

describe('getThemeName', () => {

  it('should get the stored value when the stored value is 0', () => {
    const storage = {
      getItem: vi.fn(() => '0')
    } as unknown as Storage;
    const target = new StorageService(storage);
    const actual = target.getThemeName();
    expect(actual).toBe(ThemeName.light);
    expect(storage.getItem).toHaveBeenCalledWith('themeName');
  });

  it('should get the stored value when the stored value is 1', () => {
    const storage = {
      getItem: vi.fn(() => '1')
    } as unknown as Storage;
    const target = new StorageService(storage);
    const actual = target.getThemeName();
    expect(actual).toBe(ThemeName.dark);
    expect(storage.getItem).toHaveBeenCalledWith('themeName');
  });

  it('should get the default value when the stored value does not exist', () => {
    const storage = {
      getItem: vi.fn()
    } as unknown as Storage;
    const target = new StorageService(storage);
    const actual = target.getThemeName();
    expect(actual).toBe(ThemeName.light);
    expect(storage.getItem).toHaveBeenCalledWith('themeName');
  });

});

describe('setContentShowMinimap', () => {

  it('should set the value to 0 when the false is passed', () => {
    const storage = {
      setItem: vi.fn()
    } as unknown as Storage;
    const target = new StorageService(storage);
    target.setContentShowMinimap(false);
    expect(storage.setItem).toHaveBeenCalledWith('contentShowMinimap', '0');
  });

  it('should set the value to 1 when the true is passed', () => {
    const storage = {
      setItem: vi.fn()
    } as unknown as Storage;
    const target = new StorageService(storage);
    target.setContentShowMinimap(true);
    expect(storage.setItem).toHaveBeenCalledWith('contentShowMinimap', '1');
  });

  it('should remove the value when the undefined is passed', () => {
    const storage = {
      removeItem: vi.fn()
    } as unknown as Storage;
    const target = new StorageService(storage);
    target.setContentShowMinimap(undefined);
    expect(storage.removeItem).toHaveBeenCalledWith('contentShowMinimap');
  });

});

describe('setContentShowPreview', () => {

  it('should set the value to 0 when the false is passed', () => {
    const storage = {
      setItem: vi.fn()
    } as unknown as Storage;
    const target = new StorageService(storage);
    target.setContentShowPreview(false);
    expect(storage.setItem).toHaveBeenCalledWith('contentShowPreview', '0');
  });

  it('should set the value to 1 when the true is passed', () => {
    const storage = {
      setItem: vi.fn()
    } as unknown as Storage;
    const target = new StorageService(storage);
    target.setContentShowPreview(true);
    expect(storage.setItem).toHaveBeenCalledWith('contentShowPreview', '1');
  });

  it('should remove the value when the undefined is passed', () => {
    const storage = {
      removeItem: vi.fn()
    } as unknown as Storage;
    const target = new StorageService(storage);
    target.setContentShowPreview(undefined);
    expect(storage.removeItem).toHaveBeenCalledWith('contentShowPreview');
  });

});

describe('setContentSyncScroll', () => {

  it('should set the value to 0 when the false is passed', () => {
    const storage = {
      setItem: vi.fn()
    } as unknown as Storage;
    const target = new StorageService(storage);
    target.setContentSyncScroll(false);
    expect(storage.setItem).toHaveBeenCalledWith('contentSyncScroll', '0');
  });

  it('should set the value to 1 when the true is passed', () => {
    const storage = {
      setItem: vi.fn()
    } as unknown as Storage;
    const target = new StorageService(storage);
    target.setContentSyncScroll(true);
    expect(storage.setItem).toHaveBeenCalledWith('contentSyncScroll', '1');
  });

  it('should remove the value when the undefined is passed', () => {
    const storage = {
      removeItem: vi.fn()
    } as unknown as Storage;
    const target = new StorageService(storage);
    target.setContentSyncScroll(undefined);
    expect(storage.removeItem).toHaveBeenCalledWith('contentSyncScroll');
  });

});

describe('setContentWordWrap', () => {

  it('should set the value to 0 when the false is passed', () => {
    const storage = {
      setItem: vi.fn()
    } as unknown as Storage;
    const target = new StorageService(storage);
    target.setContentWordWrap(false);
    expect(storage.setItem).toHaveBeenCalledWith('contentWordWrap', '0');
  });

  it('should set the value to 1 when the true is passed', () => {
    const storage = {
      setItem: vi.fn()
    } as unknown as Storage;
    const target = new StorageService(storage);
    target.setContentWordWrap(true);
    expect(storage.setItem).toHaveBeenCalledWith('contentWordWrap', '1');
  });

  it('should remove the value when the undefined is passed', () => {
    const storage = {
      removeItem: vi.fn()
    } as unknown as Storage;
    const target = new StorageService(storage);
    target.setContentWordWrap(undefined);
    expect(storage.removeItem).toHaveBeenCalledWith('contentWordWrap');
  });

});

describe('setExplorerAllFiles', () => {

  it('should set the value to 0 when the false is passed', () => {
    const storage = {
      setItem: vi.fn()
    } as unknown as Storage;
    const target = new StorageService(storage);
    target.setExplorerAllFiles(false);
    expect(storage.setItem).toHaveBeenCalledWith('explorerAllFiles', '0');
  });

  it('should set the value to 1 when the true is passed', () => {
    const storage = {
      setItem: vi.fn()
    } as unknown as Storage;
    const target = new StorageService(storage);
    target.setExplorerAllFiles(true);
    expect(storage.setItem).toHaveBeenCalledWith('explorerAllFiles', '1');
  });

  it('should remove the value when the undefined is passed', () => {
    const storage = {
      removeItem: vi.fn()
    } as unknown as Storage;
    const target = new StorageService(storage);
    target.setExplorerAllFiles(undefined);
    expect(storage.removeItem).toHaveBeenCalledWith('explorerAllFiles');
  });

});

describe('setExplorerFileId', () => {

  it('should set the value when the a value is passed', () => {
    const storage = {
      setItem: vi.fn()
    } as unknown as Storage;
    const target = new StorageService(storage);
    target.setExplorerFileId('5afaf657-ba0d-4086-b265-dd49223554df');
    expect(storage.setItem).toHaveBeenCalledWith('explorerFileId', '5afaf657-ba0d-4086-b265-dd49223554df');
  });

  it('should remove the value when the undefined is passed', () => {
    const storage = {
      removeItem: vi.fn()
    } as unknown as Storage;
    const target = new StorageService(storage);
    target.setExplorerFileId(undefined);
    expect(storage.removeItem).toHaveBeenCalledWith('explorerFileId');
  });

});

describe('setExplorerFileId', () => {

  it('should set the value when the a value is passed', () => {
    const storage = {
      setItem: vi.fn()
    } as unknown as Storage;
    const target = new StorageService(storage);
    target.setExplorerFolderId('2852c972-c060-4d93-a871-225ec23c4524');
    expect(storage.setItem).toHaveBeenCalledWith('explorerFolderId', '2852c972-c060-4d93-a871-225ec23c4524');
  });

  it('should remove the value when the undefined is passed', () => {
    const storage = {
      removeItem: vi.fn()
    } as unknown as Storage;
    const target = new StorageService(storage);
    target.setExplorerFolderId(undefined);
    expect(storage.removeItem).toHaveBeenCalledWith('explorerFolderId');
  });

});

describe('setTabOpen', () => {

  it('should set the value to 0 when the false is passed', () => {
    const storage = {
      setItem: vi.fn()
    } as unknown as Storage;
    const target = new StorageService(storage);
    target.setTabOpen(false);
    expect(storage.setItem).toHaveBeenCalledWith('tabOpen', '0');
  });

  it('should set the value to 1 when the true is passed', () => {
    const storage = {
      setItem: vi.fn()
    } as unknown as Storage;
    const target = new StorageService(storage);
    target.setTabOpen(true);
    expect(storage.setItem).toHaveBeenCalledWith('tabOpen', '1');
  });

  it('should remove the value when the undefined is passed', () => {
    const storage = {
      removeItem: vi.fn()
    } as unknown as Storage;
    const target = new StorageService(storage);
    target.setTabOpen(undefined);
    expect(storage.removeItem).toHaveBeenCalledWith('tabOpen');
  });

});

describe('setTabType', () => {

  it('should set the value to 0 when the explorer is passed', () => {
    const storage = {
      setItem: vi.fn()
    } as unknown as Storage;
    const target = new StorageService(storage);
    target.setTabType(TabType.explorer);
    expect(storage.setItem).toHaveBeenCalledWith('tabType', '0');
  });

  it('should set the value to 1 when the search is passed', () => {
    const storage = {
      setItem: vi.fn()
    } as unknown as Storage;
    const target = new StorageService(storage);
    target.setTabType(TabType.search);
    expect(storage.setItem).toHaveBeenCalledWith('tabType', '1');
  });

  it('should remove the value when the undefined is passed', () => {
    const storage = {
      removeItem: vi.fn()
    } as unknown as Storage;
    const target = new StorageService(storage);
    target.setTabType(undefined);
    expect(storage.removeItem).toHaveBeenCalledWith('tabType');
  });

});

describe('setThemeName', () => {

  it('should set the value to 0 when the light is passed', () => {
    const storage = {
      setItem: vi.fn()
    } as unknown as Storage;
    const target = new StorageService(storage);
    target.setThemeName(ThemeName.light);
    expect(storage.setItem).toHaveBeenCalledWith('themeName', '0');
  });

  it('should set the value to 1 when the dark is passed', () => {
    const storage = {
      setItem: vi.fn()
    } as unknown as Storage;
    const target = new StorageService(storage);
    target.setThemeName(ThemeName.dark);
    expect(storage.setItem).toHaveBeenCalledWith('themeName', '1');
  });

  it('should remove the value when the undefined is passed', () => {
    const storage = {
      removeItem: vi.fn()
    } as unknown as Storage;
    const target = new StorageService(storage);
    target.setThemeName(undefined);
    expect(storage.removeItem).toHaveBeenCalledWith('themeName');
  });

});
