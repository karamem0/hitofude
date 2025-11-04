//
// Copyright (c) 2023-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import { CacheRepository } from './CacheRepository';
import Dexie from 'dexie';

beforeEach(() => {
  vi.clearAllMocks();
  vi.resetModules();
});

describe('getFolder', () => {

  it('should get the value value when the folder is cached', async () => {
    // Setup
    const params = {
      id: '01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K',
      folder: {
        id: '01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K',
        expired: Date.now() + 10000,
        value: {
          id: '01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K',
          name: 'Attachments',
          createdDate: new Date('2017-07-31T18:56:29Z'),
          updatedDate: new Date('2017-07-31T18:56:29Z'),
          root: false,
          webUrl: 'https://m365x214355-my.sharepoint.com/personal/meganb_m365x214355_onmicrosoft_com/Documents/Attachments',
          parentId: '01BYE5RZ56Y2GOVW7725BZO354PWSELRRZ',
          folders: [],
          files: []
        }
      }
    };
    const expected = {
      id: '01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K',
      name: 'Attachments',
      createdDate: new Date('2017-07-31T18:56:29Z'),
      updatedDate: new Date('2017-07-31T18:56:29Z'),
      root: false,
      webUrl: 'https://m365x214355-my.sharepoint.com/personal/meganb_m365x214355_onmicrosoft_com/Documents/Attachments',
      parentId: '01BYE5RZ56Y2GOVW7725BZO354PWSELRRZ',
      folders: [],
      files: []
    };
    const mockGet = vi.fn().mockResolvedValue(params.folder);
    const database = {
      table: vi.fn().mockReturnValue({
        get: mockGet
      })
    } as unknown as Dexie;
    // Execute
    const target = new CacheRepository(database);
    const actual = await target.getFolder(params.id);
    // Assert
    expect(mockGet).toHaveBeenCalled();
    expect(actual).toStrictEqual(expected);
  });

  it('should get undefined when the folder is not cached', async () => {
    // Setup
    const params = {
      id: '01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K',
      folder: undefined
    };
    const expected = undefined;
    const mockGet = vi.fn().mockResolvedValue(params.folder);
    const database = {
      table: vi.fn().mockReturnValue({
        get: mockGet
      })
    } as unknown as Dexie;
    // Execute
    const target = new CacheRepository(database);
    const actual = await target.getFolder(params.id);
    // Assert
    expect(mockGet).toHaveBeenCalled();
    expect(actual).toStrictEqual(expected);
  });

  it('should get undefined when the cached folder is expired', async () => {
    // Setup
    const params = {
      id: '01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K',
      folder: {
        id: '01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K',
        expired: Date.now() - 10000,
        value: {
          id: '01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K',
          name: 'Attachments',
          createdDate: new Date('2017-07-31T18:56:29Z'),
          updatedDate: new Date('2017-07-31T18:56:29Z'),
          root: false,
          webUrl: 'https://m365x214355-my.sharepoint.com/personal/meganb_m365x214355_onmicrosoft_com/Documents/Attachments',
          parentId: '01BYE5RZ56Y2GOVW7725BZO354PWSELRRZ',
          folders: [],
          files: []
        }
      }
    };
    const expected = undefined;
    const mockGet = vi.fn().mockResolvedValue(params.folder);
    const database = {
      table: vi.fn().mockReturnValue({
        get: mockGet
      })
    } as unknown as Dexie;
    // Execute
    const target = new CacheRepository(database);
    const actual = await target.getFolder(params.id);
    // Assert
    expect(mockGet).toHaveBeenCalled();
    expect(actual).toStrictEqual(expected);
  });

});

describe('setFolder', () => {

  it('should set the folder in cache', async () => {
    // Setup
    const params = {
      folder: {
        id: '01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K',
        name: 'Attachments',
        createdDate: new Date('2017-07-31T18:56:29Z'),
        updatedDate: new Date('2017-07-31T18:56:29Z'),
        root: false,
        webUrl: 'https://m365x214355-my.sharepoint.com/personal/meganb_m365x214355_onmicrosoft_com/Documents/Attachments',
        parentId: '01BYE5RZ56Y2GOVW7725BZO354PWSELRRZ',
        folders: [],
        files: []
      }
    };
    const mockPut = vi.fn().mockResolvedValue(undefined);
    const database = {
      table: vi.fn().mockReturnValue({
        put: mockPut
      })
    } as unknown as Dexie;
    // Execute
    const target = new CacheRepository(database);
    await target.setFolder(params.folder);
    // Assert
    expect(mockPut).toHaveBeenCalled();
  });

});
