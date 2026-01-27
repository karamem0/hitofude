//
// Copyright (c) 2023-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import Dexie from 'dexie';
import { CacheRepository } from './CacheRepository';

beforeEach(() => {
  vi.clearAllMocks();
  vi.resetModules();
});

describe('getFolder', () => {

  it('should get the value value when the folder is cached', async () => {
    // Setup
    const params = {
      folder: {
        expired: Date.now() + 10000,
        id: '01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K',
        value: {
          createdDate: new Date('2017-07-31T18:56:29Z'),
          files: [],
          folders: [],
          id: '01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K',
          name: 'Attachments',
          parentId: '01BYE5RZ56Y2GOVW7725BZO354PWSELRRZ',
          root: false,
          updatedDate: new Date('2017-07-31T18:56:29Z'),
          webUrl: 'https://m365x214355-my.sharepoint.com/personal/meganb_m365x214355_onmicrosoft_com/Documents/Attachments'
        }
      },
      id: '01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K'
    };
    const expected = {
      createdDate: new Date('2017-07-31T18:56:29Z'),
      files: [],
      folders: [],
      id: '01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K',
      name: 'Attachments',
      parentId: '01BYE5RZ56Y2GOVW7725BZO354PWSELRRZ',
      root: false,
      updatedDate: new Date('2017-07-31T18:56:29Z'),
      webUrl: 'https://m365x214355-my.sharepoint.com/personal/meganb_m365x214355_onmicrosoft_com/Documents/Attachments'
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
      folder: undefined,
      id: '01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K'
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
      folder: {
        expired: Date.now() - 10000,
        id: '01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K',
        value: {
          createdDate: new Date('2017-07-31T18:56:29Z'),
          files: [],
          folders: [],
          id: '01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K',
          name: 'Attachments',
          parentId: '01BYE5RZ56Y2GOVW7725BZO354PWSELRRZ',
          root: false,
          updatedDate: new Date('2017-07-31T18:56:29Z'),
          webUrl: 'https://m365x214355-my.sharepoint.com/personal/meganb_m365x214355_onmicrosoft_com/Documents/Attachments'
        }
      },
      id: '01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K'
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
        createdDate: new Date('2017-07-31T18:56:29Z'),
        files: [],
        folders: [],
        id: '01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K',
        name: 'Attachments',
        parentId: '01BYE5RZ56Y2GOVW7725BZO354PWSELRRZ',
        root: false,
        updatedDate: new Date('2017-07-31T18:56:29Z'),
        webUrl: 'https://m365x214355-my.sharepoint.com/personal/meganb_m365x214355_onmicrosoft_com/Documents/Attachments'
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
