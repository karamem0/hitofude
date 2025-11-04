//
// Copyright (c) 2023-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import { CacheRepository } from '../repositories/CacheRepository';
import { Client } from '@microsoft/microsoft-graph-client';
import Dexie from 'dexie';
import { GraphRepository } from '../repositories/GraphRepository';
import { GraphService } from './GraphService';
import { Mock } from 'vitest';

vi.mock('../repositories/CacheRepository');
vi.mock('../repositories/GraphRepository');

beforeEach(() => {
  vi.clearAllMocks();
  vi.resetModules();
});

describe('copyFile', () => {

  it('should copy the file when the parentId is provided', async () => {
    // Setup
    const params = {
      sourceFile: {
        id: '01BYE5RZ4FL7NVUU4UDVHIRG32OLTW4IKM',
        baseName: 'Annual Financial Report (DRAFT)',
        extension: '.docx',
        parentId: '01BYE5RZ56Y2GOVW7725BZO354PWSELRRZ'
      },
      destinationFile: {
        id: '01BYE5RZ4FL7NVUU4UDVHIRG32OLTW4IKM',
        baseName: 'Annual Financial Report (FINAL)',
        extension: '.docx',
        parentId: '01BYE5RZ56Y2GOVW7725BZO354PWSELRRZ'
      },
      name: 'Annual Financial Report (FINAL).docx'
    };
    const expected = {
      id: '01BYE5RZ4FL7NVUU4UDVHIRG32OLTW4IKM',
      baseName: 'Annual Financial Report (FINAL)',
      extension: '.docx',
      parentId: '01BYE5RZ56Y2GOVW7725BZO354PWSELRRZ'
    };
    const cacheRepository = new CacheRepository({} as Dexie);
    const graphRepository = new GraphRepository({} as Client);
    const mockCopyFile = graphRepository.copyFile as Mock;
    mockCopyFile.mockResolvedValue(params.destinationFile);
    const mockGetFolderById = graphRepository.getFolderById as Mock;
    const mockSetFolder = cacheRepository.setFolder as Mock;
    // Execute
    const target = new GraphService(cacheRepository, graphRepository);
    const actual = await target.copyFile(params.sourceFile, params.name);
    // Assert
    expect(actual).toStrictEqual(expected);
    expect(mockCopyFile).toBeCalledWith(params.sourceFile, params.name);
    expect(mockGetFolderById).toBeCalledWith(params.destinationFile.parentId);
    expect(mockSetFolder).toBeCalled();
  });

  it('should throw an error when the parentId is undefined', async () => {
    // Setup
    const params = {
      sourceFile: {
        id: '01BYE5RZ4FL7NVUU4UDVHIRG32OLTW4IKM',
        baseName: 'Annual Financial Report (DRAFT)',
        extension: '.docx',
        parentId: '01BYE5RZ56Y2GOVW7725BZO354PWSELRRZ'
      },
      destinationFile: {
        id: '01BYE5RZ4FL7NVUU4UDVHIRG32OLTW4IKM',
        baseName: 'Annual Financial Report (FINAL)',
        extension: '.docx',
        parentId: undefined
      },
      name: 'Annual Financial Report (FINAL).docx'
    };
    const cacheRepository = new CacheRepository({} as Dexie);
    const graphRepository = new GraphRepository({} as Client);
    const mockCopyFile = graphRepository.copyFile as Mock;
    mockCopyFile.mockResolvedValue(params.destinationFile);
    const mockGetFolderById = graphRepository.getFolderById as Mock;
    const mockSetFolder = cacheRepository.setFolder as Mock;
    // Execute
    const target = new GraphService(cacheRepository, graphRepository);
    await expect(target.copyFile(params.sourceFile, params.name)).rejects.toThrowError();
    // Assert
    expect(mockCopyFile).toBeCalled();
    expect(mockGetFolderById).not.toBeCalled();
    expect(mockSetFolder).not.toBeCalled();
  });

});

describe('createFile', () => {

  it('should create a new file when the parentId is provided', async () => {
    // Setup
    const params = {
      parentFolder: {
        id: '01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K',
        name: 'Attachments',
        parentId: '01BYE5RZ56Y2GOVW7725BZO354PWSELRRZ'
      },
      newFile: {
        id: '01BYE5RZ4FL7NVUU4UDVHIRG32OLTW4IKM',
        baseName: 'Annual Financial Report (DRAFT)',
        extension: '.md',
        parentId: '01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K'
      },
      name: 'Annual Financial Report (DRAFT).md',
      content: new Blob([ '' ], { type: 'text/markdown' })
    };
    const expected = {
      id: '01BYE5RZ4FL7NVUU4UDVHIRG32OLTW4IKM',
      baseName: 'Annual Financial Report (DRAFT)',
      extension: '.md',
      parentId: '01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K'
    };
    const cacheRepository = new CacheRepository({} as Dexie);
    const graphRepository = new GraphRepository({} as Client);
    const mockCreateFile = graphRepository.createFile as Mock;
    mockCreateFile.mockResolvedValue(params.newFile);
    const mockGetFolderById = graphRepository.getFolderById as Mock;
    const mockSetFolder = cacheRepository.setFolder as Mock;
    // Execute
    const target = new GraphService(cacheRepository, graphRepository);
    const actual = await target.createFile(params.parentFolder, params.name, params.content);
    // Assert
    expect(actual).toStrictEqual(expected);
    expect(mockCreateFile).toBeCalledWith(params.parentFolder, params.name, params.content);
    expect(mockGetFolderById).toBeCalledWith(params.newFile.parentId);
    expect(mockSetFolder).toBeCalled();
  });

  it('should throw an error when the parentId is undefined', async () => {
    // Setup
    const params = {
      parentFolder: {
        id: '01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K',
        name: 'Attachments',
        parentId: '01BYE5RZ56Y2GOVW7725BZO354PWSELRRZ'
      },
      newFile: {
        id: '01BYE5RZ4FL7NVUU4UDVHIRG32OLTW4IKM',
        baseName: 'Annual Financial Report (DRAFT)',
        extension: '.md',
        parentId: undefined
      },
      name: 'Annual Financial Report (DRAFT).md',
      content: new Blob([ '' ], { type: 'text/markdown' })
    };
    const cacheRepository = new CacheRepository({} as Dexie);
    const graphRepository = new GraphRepository({} as Client);
    const mockCreateFile = graphRepository.createFile as Mock;
    mockCreateFile.mockResolvedValue(params.newFile);
    const mockGetFolderById = graphRepository.getFolderById as Mock;
    const mockSetFolder = cacheRepository.setFolder as Mock;
    // Execute
    const target = new GraphService(cacheRepository, graphRepository);
    await expect(target.createFile(params.parentFolder, params.name, params.content)).rejects.toThrowError();
    // Assert
    expect(mockCreateFile).toBeCalled();
    expect(mockGetFolderById).not.toBeCalled();
    expect(mockSetFolder).not.toBeCalled();
  });

});

describe('createFolder', () => {

  it('should create a new folder when the parentId is provided', async () => {
    // Setup
    const params = {
      parentFolder: {
        id: '01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K',
        name: 'Attachments',
        parentId: '01BYE5RZ56Y2GOVW7725BZO354PWSELRRZ'
      },
      newFolder: {
        id: '01Y2C275TA3MBZ4IEGIFCJPWWFSSPSHADL',
        name: 'Demo Files',
        parentId: '01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K'
      },
      name: 'Demo Files'
    };
    const expected = {
      id: '01Y2C275TA3MBZ4IEGIFCJPWWFSSPSHADL',
      name: 'Demo Files',
      parentId: '01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K'
    };
    const cacheRepository = new CacheRepository({} as Dexie);
    const graphRepository = new GraphRepository({} as Client);
    const mockCreateFolder = graphRepository.createFolder as Mock;
    mockCreateFolder.mockResolvedValue(params.newFolder);
    const mockGetFolderById = graphRepository.getFolderById as Mock;
    const mockSetFolder = cacheRepository.setFolder as Mock;
    // Execute
    const target = new GraphService(cacheRepository, graphRepository);
    const actual = await target.createFolder(params.parentFolder, params.name);
    // Assert
    expect(actual).toStrictEqual(expected);
    expect(mockCreateFolder).toBeCalledWith(params.parentFolder, params.name);
    expect(mockGetFolderById).toBeCalledWith(params.newFolder.parentId);
    expect(mockSetFolder).toBeCalled();
  });

  it('should throw an error when the parentId is undefined', async () => {
    // Setup
    const params = {
      parentFolder: {
        id: '01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K',
        name: 'Attachments',
        parentId: '01BYE5RZ56Y2GOVW7725BZO354PWSELRRZ'
      },
      newFolder: {
        id: '01Y2C275TA3MBZ4IEGIFCJPWWFSSPSHADL',
        name: 'Demo Files',
        parentId: undefined
      },
      name: 'Demo Files'
    };
    const cacheRepository = new CacheRepository({} as Dexie);
    const graphRepository = new GraphRepository({} as Client);
    const mockCreateFolder = graphRepository.createFolder as Mock;
    mockCreateFolder.mockResolvedValue(params.newFolder);
    const mockGetFolderById = graphRepository.getFolderById as Mock;
    const mockSetFolder = cacheRepository.setFolder as Mock;
    // Execute
    const target = new GraphService(cacheRepository, graphRepository);
    await expect(target.createFolder(params.parentFolder, params.name)).rejects.toThrowError();
    // Assert
    expect(mockCreateFolder).toBeCalled();
    expect(mockGetFolderById).not.toBeCalled();
    expect(mockSetFolder).not.toBeCalled();
  });

});

describe('deleteFile', () => {

  it('should delete a file when the parentId is provided', async () => {
    // Setup
    const params = {
      file: {
        id: '01BYE5RZ4FL7NVUU4UDVHIRG32OLTW4IKM',
        baseName: 'Annual Financial Report (DRAFT)',
        extension: '.docx',
        parentId: '01BYE5RZ56Y2GOVW7725BZO354PWSELRRZ'
      }
    };
    const cacheRepository = new CacheRepository({} as Dexie);
    const graphRepository = new GraphRepository({} as Client);
    const mockDeleteFile = graphRepository.deleteFile as Mock;
    const mockGetFolderById = graphRepository.getFolderById as Mock;
    const mockSetFolder = cacheRepository.setFolder as Mock;
    // Execute
    const target = new GraphService(cacheRepository, graphRepository);
    await target.deleteFile(params.file);
    // Assert
    expect(mockDeleteFile).toBeCalledWith(params.file);
    expect(mockGetFolderById).toBeCalledWith(params.file.parentId);
    expect(mockSetFolder).toBeCalled();
  });

  it('should throw an error when the parentId is undefined', async () => {
    // Setup
    const params = {
      file: {
        id: '01BYE5RZ4FL7NVUU4UDVHIRG32OLTW4IKM',
        baseName: 'Annual Financial Report (DRAFT)',
        extension: '.docx',
        parentId: undefined
      }
    };
    const cacheRepository = new CacheRepository({} as Dexie);
    const graphRepository = new GraphRepository({} as Client);
    const mockDeleteFile = graphRepository.deleteFile as Mock;
    const mockGetFolderById = graphRepository.getFolderById as Mock;
    const mockSetFolder = cacheRepository.setFolder as Mock;
    // Execute
    const target = new GraphService(cacheRepository, graphRepository);
    await expect(() => target.deleteFile(params.file)).rejects.toThrowError();
    // Assert
    expect(mockDeleteFile).toBeCalled();
    expect(mockGetFolderById).not.toBeCalled();
    expect(mockSetFolder).not.toBeCalled();
  });

});

describe('deleteFolder', () => {

  it('should delete a folder when the parentId is provided', async () => {
    // Setup
    const params = {
      folder: {
        id: '01Y2C275TA3MBZ4IEGIFCJPWWFSSPSHADL',
        name: 'Demo Files',
        parentId: '01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K'
      }
    };
    const cacheRepository = new CacheRepository({} as Dexie);
    const graphRepository = new GraphRepository({} as Client);
    const mockDeleteFolder = graphRepository.deleteFolder as Mock;
    const mockGetFolderById = graphRepository.getFolderById as Mock;
    const mockSetFolder = cacheRepository.setFolder as Mock;
    // Execute
    const target = new GraphService(cacheRepository, graphRepository);
    await target.deleteFolder(params.folder);
    // Assert
    expect(mockDeleteFolder).toBeCalledWith(params.folder);
    expect(mockGetFolderById).toBeCalledWith(params.folder.parentId);
    expect(mockSetFolder).toBeCalled();
  });

  it('should throw an error when the parentId is undefined', async () => {
    // Setup
    const params = {
      folder: {
        id: '01Y2C275TA3MBZ4IEGIFCJPWWFSSPSHADL',
        name: 'Demo Files',
        parentId: undefined
      }
    };
    const cacheRepository = new CacheRepository({} as Dexie);
    const graphRepository = new GraphRepository({} as Client);
    const mockDeleteFolder = graphRepository.deleteFolder as Mock;
    const mockGetFolderById = graphRepository.getFolderById as Mock;
    const mockSetFolder = cacheRepository.setFolder as Mock;
    // Execute
    const target = new GraphService(cacheRepository, graphRepository);
    await expect(() => target.deleteFolder(params.folder)).rejects.toThrowError();
    // Assert
    expect(mockDeleteFolder).toBeCalled();
    expect(mockGetFolderById).not.toBeCalled();
    expect(mockSetFolder).not.toBeCalled();
  });

});

describe('getFileById', () => {

  it('should get a file by ID', async () => {
    // Setup
    const params = {
      file: {
        id: '01BYE5RZ4FL7NVUU4UDVHIRG32OLTW4IKM',
        baseName: 'Annual Financial Report (DRAFT)',
        extension: '.docx',
        parentId: '01BYE5RZ56Y2GOVW7725BZO354PWSELRRZ'
      },
      id: '01BYE5RZ4FL7NVUU4UDVHIRG32OLTW4IKM'
    };
    const expected = {
      id: '01BYE5RZ4FL7NVUU4UDVHIRG32OLTW4IKM',
      baseName: 'Annual Financial Report (DRAFT)',
      extension: '.docx',
      parentId: '01BYE5RZ56Y2GOVW7725BZO354PWSELRRZ'
    };
    const cacheRepository = new CacheRepository({} as Dexie);
    const graphRepository = new GraphRepository({} as Client);
    const mockGetFileById = graphRepository.getFileById as Mock;
    mockGetFileById.mockResolvedValue(params.file);
    // Execute
    const target = new GraphService(cacheRepository, graphRepository);
    const actual = await target.getFileById(params.id);
    // Assert
    expect(actual).toStrictEqual(expected);
    expect(mockGetFileById).toBeCalledWith(params.id);
  });

});

describe('getFileByUrl', () => {

  it('should get a file by URL', async () => {
    // Setup
    const params = {
      file: {
        id: '01BYE5RZ4FL7NVUU4UDVHIRG32OLTW4IKM',
        baseName: 'Annual Financial Report (DRAFT)',
        extension: '.docx',
        parentId: '01BYE5RZ56Y2GOVW7725BZO354PWSELRRZ'
      },
      url: 'Attachments/Annual%20Financial%20Report%20(DRAFT).docx'
    };
    const expected = {
      id: '01BYE5RZ4FL7NVUU4UDVHIRG32OLTW4IKM',
      baseName: 'Annual Financial Report (DRAFT)',
      extension: '.docx',
      parentId: '01BYE5RZ56Y2GOVW7725BZO354PWSELRRZ'
    };
    const cacheRepository = new CacheRepository({} as Dexie);
    const graphRepository = new GraphRepository({} as Client);
    const getFileByUrl = graphRepository.getFileByUrl as Mock;
    getFileByUrl.mockResolvedValue(params.file);
    // Execute
    const target = new GraphService(cacheRepository, graphRepository);
    const actual = await target.getFileByUrl(params.url);
    // Assert
    expect(actual).toStrictEqual(expected);
    expect(getFileByUrl).toBeCalledWith(params.url);
  });

});

describe('getFilePreviewUrl', () => {

  it('should get a file preview URL', async () => {
    // Setup
    const params = {
      file: {
        id: '01BYE5RZ4FL7NVUU4UDVHIRG32OLTW4IKM',
        baseName: 'Annual Financial Report (DRAFT)',
        extension: '.docx',
        parentId: '01BYE5RZ56Y2GOVW7725BZO354PWSELRRZ'
      },
      previewUrl: 'https://m365x214355-my.sharepoint.com/personal/meganb_m365x214355_onmicrosoft_com/_layouts/15/embed.aspx?UniqueId=5adb5f85-9453-4e1d-889b-7a72e76e214c'
    };
    const expected = 'https://m365x214355-my.sharepoint.com/personal/meganb_m365x214355_onmicrosoft_com/_layouts/15/embed.aspx?UniqueId=5adb5f85-9453-4e1d-889b-7a72e76e214c';
    const cacheRepository = new CacheRepository({} as Dexie);
    const graphRepository = new GraphRepository({} as Client);
    const getFilePreviewUrl = graphRepository.getFilePreviewUrl as Mock;
    getFilePreviewUrl.mockResolvedValue(params.previewUrl);
    // Execute
    const target = new GraphService(cacheRepository, graphRepository);
    const actual = await target.getFilePreviewUrl(params.file);
    // Assert
    expect(actual).toStrictEqual(expected);
    expect(getFilePreviewUrl).toBeCalledWith(params.file);
  });

});

describe('getFileText', () => {

  it('should get the text of a file', async () => {
    // Setup
    const params = {
      file: {
        id: '01BYE5RZ4FL7NVUU4UDVHIRG32OLTW4IKM',
        baseName: 'Annual Financial Report (DRAFT)',
        extension: '.docx',
        downloadUrl: 'https://m365x214355-my.sharepoint.com/personal/meganb_m365x214355_onmicrosoft_com/_layouts/15/download.aspx?UniqueId=5adb5f85-9453-4e1d-889b-7a72e76e214c&Translate=false&tempauth=v1.eyJzaXRlaWQiOiJkODIzMTJmOS1iMjNiLTRjYmMtOTVkNS0zZTBkOTRlNjhjMWUiLCJhcHBfZGlzcGxheW5hbWUiOiJhcGlzYW5kYm94cHJveHkiLCJhcHBpZCI6IjA1YjEwYTJkLTYyZGItNDIwYy04NjI2LTU1ZjNhNWU3ODY1YiIsImF1ZCI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMC9tMzY1eDIxNDM1NS1teS5zaGFyZXBvaW50LmNvbUBkY2QyMTlkZC1iYzY4LTRiOWItYmYwYi00YTMzYTc5NmJlMzUiLCJleHAiOiIxNzQ0MTYxNjk2In0.CgoKBHNuaWQSAjY0EgsIiprM2dDB-z0QBRoOMjAuMTkwLjE0NC4xNzAqLHJXOGFHck92ckUzbGc2bUZEeHVQQUNFeFJUZ1g2NGdpYkwyNmlWMGl6eDg9MKkBOAFCEKGSoZUzoAAAlxBRVhTEOzpKEGhhc2hlZHByb29mdG9rZW5yKTBoLmZ8bWVtYmVyc2hpcHwxMDAzYmZmZGEzODEzMWFmQGxpdmUuY29tegEyggESCd0Z0txovJtLEb8LSjOnlr41kgEFTWVnYW6aAQVCb3dlbqIBIm1lZ2FuYkBtMzY1eDIxNDM1NS5vbm1pY3Jvc29mdC5jb22qARAxMDAzQkZGREEzODEzMUFGsgFWbXlmaWxlcy5yZWFkIGdyb3VwLnJlYWQgYWxsc2l0ZXMucmVhZCBhbGxwcm9maWxlcy5yZWFkIGFsbHByb2ZpbGVzLnJlYWQgdGVybXN0b3JlLnJlYWTIAQE.98_0VuXaD1fwkqDhqlKpGFwTSPzEitJYd3wxh5tAKcI&ApiVersion=2.0',
        parentId: '01BYE5RZ56Y2GOVW7725BZO354PWSELRRZ'
      },
      text: 'Annual Financial Report'
    };
    const expected = 'Annual Financial Report';
    const cacheRepository = new CacheRepository({} as Dexie);
    const graphRepository = new GraphRepository({} as Client);
    const getFileText = graphRepository.getFileText as Mock;
    getFileText.mockResolvedValue(params.text);
    // Execute
    const target = new GraphService(cacheRepository, graphRepository);
    const actual = await target.getFileText(params.file);
    // Assert
    expect(actual).toStrictEqual(expected);
    expect(getFileText).toBeCalledWith(params.file);
  });

});

describe('getFileVersion', () => {

  it('should get the versions of a file', async () => {
    // Setup
    const params = {
      file: {
        id: '01BYE5RZ4FL7NVUU4UDVHIRG32OLTW4IKM',
        baseName: 'Annual Financial Report (DRAFT)',
        extension: '.docx',
        parentId: '01BYE5RZ56Y2GOVW7725BZO354PWSELRRZ'
      },
      fileVersions: [
        {
          id: '1.0',
          version: '1.0'
        }
      ]
    };
    const expected = [
      {
        id: '1.0',
        version: '1.0'
      }
    ];
    const cacheRepository = new CacheRepository({} as Dexie);
    const graphRepository = new GraphRepository({} as Client);
    const getFileVersions = graphRepository.getFileVersions as Mock;
    getFileVersions.mockResolvedValue(params.fileVersions);
    // Execute
    const target = new GraphService(cacheRepository, graphRepository);
    const actual = await target.getFileVersions(params.file);
    // Assert
    expect(actual).toStrictEqual(expected);
    expect(getFileVersions).toBeCalledWith(params.file);
  });

});

describe('getFolderById', () => {

  it('should get a folder from chache', async () => {
    // Setup
    const params = {
      folder: {
        id: '01Y2C275TA3MBZ4IEGIFCJPWWFSSPSHADL',
        name: 'Demo Files',
        parentId: '01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K'
      },
      id: '01Y2C275TA3MBZ4IEGIFCJPWWFSSPSHADL',
      force: false
    };
    const expected = {
      id: '01Y2C275TA3MBZ4IEGIFCJPWWFSSPSHADL',
      name: 'Demo Files',
      parentId: '01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K'
    };
    const cacheRepository = new CacheRepository({} as Dexie);
    const graphRepository = new GraphRepository({} as Client);
    const mockGetFolderById = graphRepository.getFolderById as Mock;
    const mockGetFolder = cacheRepository.getFolder as Mock;
    mockGetFolder.mockResolvedValue(params.folder);
    const mockSetFolder = cacheRepository.setFolder as Mock;
    // Execute
    const target = new GraphService(cacheRepository, graphRepository);
    const actual = await target.getFolderById(params.id, params.force);
    // Assert
    expect(actual).toStrictEqual(expected);
    expect(mockGetFolderById).not.toBeCalled();
    expect(mockGetFolder).toBeCalledWith(params.id);
    expect(mockSetFolder).not.toBeCalled();
  });

  it('should get a folder from Graph', async () => {
    // Setup
    const params = {
      folder: {
        id: '01Y2C275TA3MBZ4IEGIFCJPWWFSSPSHADL',
        name: 'Demo Files',
        parentId: '01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K'
      },
      id: '01Y2C275TA3MBZ4IEGIFCJPWWFSSPSHADL',
      force: true
    };
    const expected = {
      id: '01Y2C275TA3MBZ4IEGIFCJPWWFSSPSHADL',
      name: 'Demo Files',
      parentId: '01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K'
    };
    const cacheRepository = new CacheRepository({} as Dexie);
    const graphRepository = new GraphRepository({} as Client);
    const mockGetFolderById = graphRepository.getFolderById as Mock;
    mockGetFolderById.mockResolvedValue(params.folder);
    const mockGetFolder = cacheRepository.getFolder as Mock;
    const mockSetFolder = cacheRepository.setFolder as Mock;
    // Execute
    const target = new GraphService(cacheRepository, graphRepository);
    const actual = await target.getFolderById(params.id, params.force);
    // Assert
    expect(actual).toStrictEqual(expected);
    expect(mockGetFolderById).toBeCalledWith(params.id);
    expect(mockGetFolder).not.toBeCalled();
    expect(mockSetFolder).toBeCalled();
  });

});

describe('renameFile', () => {

  it('should rename a file when the parentId is provided', async () => {
    // Setup
    const params = {
      sourceFile: {
        id: '01BYE5RZ4FL7NVUU4UDVHIRG32OLTW4IKM',
        baseName: 'Annual Financial Report (DRAFT)',
        extension: '.docx',
        parentId: '01BYE5RZ56Y2GOVW7725BZO354PWSELRRZ'
      },
      destinationFile: {
        id: '01BYE5RZ4FL7NVUU4UDVHIRG32OLTW4IKM',
        baseName: 'Annual Financial Report (FINAL)',
        extension: '.docx',
        parentId: '01BYE5RZ56Y2GOVW7725BZO354PWSELRRZ'
      },
      name: 'Annual Financial Report (FINAL).docx'
    };
    const expected = {
      id: '01BYE5RZ4FL7NVUU4UDVHIRG32OLTW4IKM',
      baseName: 'Annual Financial Report (FINAL)',
      extension: '.docx',
      parentId: '01BYE5RZ56Y2GOVW7725BZO354PWSELRRZ'
    };
    const cacheRepository = new CacheRepository({} as Dexie);
    const graphRepository = new GraphRepository({} as Client);
    const mockRenameFile = graphRepository.renameFile as Mock;
    mockRenameFile.mockResolvedValue(params.destinationFile);
    const mockGetFolderById = graphRepository.getFolderById as Mock;
    const mockSetFolder = cacheRepository.setFolder as Mock;
    // Execute
    const target = new GraphService(cacheRepository, graphRepository);
    const actual = await target.renameFile(params.sourceFile, params.name);
    // Assert
    expect(actual).toStrictEqual(expected);
    expect(mockRenameFile).toBeCalledWith(params.sourceFile, params.name);
    expect(mockGetFolderById).toBeCalledWith(params.destinationFile.parentId);
    expect(mockSetFolder).toBeCalled();
  });

  it('should throw an error when the parentId is undefined', async () => {
    // Setup
    const params = {
      sourceFile: {
        id: '01BYE5RZ4FL7NVUU4UDVHIRG32OLTW4IKM',
        baseName: 'Annual Financial Report (DRAFT)',
        extension: '.docx',
        parentId: '01BYE5RZ56Y2GOVW7725BZO354PWSELRRZ'
      },
      destinationFile: {
        id: '01BYE5RZ4FL7NVUU4UDVHIRG32OLTW4IKM',
        baseName: 'Annual Financial Report (FINAL)',
        extension: '.docx',
        parentId: undefined
      },
      name: 'Annual Financial Report (FINAL).docx'
    };
    const cacheRepository = new CacheRepository({} as Dexie);
    const graphRepository = new GraphRepository({} as Client);
    const mockRenameFile = graphRepository.renameFile as Mock;
    mockRenameFile.mockResolvedValue(params.destinationFile);
    const mockGetFolderById = graphRepository.getFolderById as Mock;
    const mockSetFolder = cacheRepository.setFolder as Mock;
    // Execute
    const target = new GraphService(cacheRepository, graphRepository);
    await expect(() => target.renameFile(params.sourceFile, params.name)).rejects.toThrowError();
    // Assert
    expect(mockRenameFile).toBeCalled();
    expect(mockGetFolderById).not.toBeCalled();
    expect(mockSetFolder).not.toBeCalled();
  });

});

describe('renameFolder', () => {

  it('should rename a folder when the parentId is provided', async () => {
    // Setup
    const params = {
      sourceFolder: {
        id: '01Y2C275TA3MBZ4IEGIFCJPWWFSSPSHADL',
        name: 'Demo Files',
        parentId: '01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K'
      },
      destinationFolder: {
        id: '01Y2C275TA3MBZ4IEGIFCJPWWFSSPSHADL',
        name: 'Review Files',
        parentId: '01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K'
      },
      name: 'Review Files'
    };
    const expected = {
      id: '01Y2C275TA3MBZ4IEGIFCJPWWFSSPSHADL',
      name: 'Review Files',
      parentId: '01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K'
    };
    const cacheRepository = new CacheRepository({} as Dexie);
    const graphRepository = new GraphRepository({} as Client);
    const mockRenameFolder = graphRepository.renameFolder as Mock;
    mockRenameFolder.mockResolvedValue(params.destinationFolder);
    const mockGetFolderById = graphRepository.getFolderById as Mock;
    const mockSetFolder = cacheRepository.setFolder as Mock;
    // Execute
    const target = new GraphService(cacheRepository, graphRepository);
    const actual = await target.renameFolder(params.sourceFolder, params.name);
    // Assert
    expect(actual).toStrictEqual(expected);
    expect(mockRenameFolder).toBeCalledWith(params.sourceFolder, params.name);
    expect(mockGetFolderById).toBeCalledWith(params.destinationFolder.parentId);
    expect(mockSetFolder).toBeCalled();
  });

  it('should throw an error when the parentId is undefined', async () => {
    // Setup
    const params = {
      sourceFolder: {
        id: '01Y2C275TA3MBZ4IEGIFCJPWWFSSPSHADL',
        name: 'Demo Files',
        parentId: '01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K'
      },
      destinationFolder: {
        id: '01Y2C275TA3MBZ4IEGIFCJPWWFSSPSHADL',
        name: 'Review Files',
        parentId: undefined
      },
      name: 'Review Files'
    };
    const cacheRepository = new CacheRepository({} as Dexie);
    const graphRepository = new GraphRepository({} as Client);
    const mockRenameFolder = graphRepository.renameFolder as Mock;
    mockRenameFolder.mockResolvedValue(params.destinationFolder);
    const mockGetFolderById = graphRepository.getFolderById as Mock;
    const mockSetFolder = cacheRepository.setFolder as Mock;
    // Execute
    const target = new GraphService(cacheRepository, graphRepository);
    await expect(() => target.renameFolder(params.sourceFolder, params.name)).rejects.toThrowError();
    // Assert
    expect(mockGetFolderById).not.toBeCalled();
    expect(mockSetFolder).not.toBeCalled();
  });

});

describe('getMyPhoto', () => {

  it('should get the my photo', async () => {
    // Setup
    const params = {
      photo: 'blob:https://developer.microsoft.com/05d616dc-8702-41db-b19d-12431f564705'
    };
    const expected = 'blob:https://developer.microsoft.com/05d616dc-8702-41db-b19d-12431f564705';
    const cacheRepository = new CacheRepository({} as Dexie);
    const graphRepository = new GraphRepository({} as Client);
    const mockGetMyPhoto = graphRepository.getMyPhoto as Mock;
    mockGetMyPhoto.mockResolvedValue(params.photo);
    // Execute
    const target = new GraphService(cacheRepository, graphRepository);
    const actual = await target.getMyPhoto();
    // Assert
    expect(actual).toStrictEqual(expected);
    expect(mockGetMyPhoto).toBeCalled();
  });

});

describe('getRootFolder', () => {

  it('should get the root folder', async () => {
    // Setup
    const params = {
      rootFolder: {
        id: '01HLPWYXN6Y2GOVW7725BZO354PWSELRRZ',
        name: 'root',
        root: true
      }
    };
    const expected = {
      id: '01HLPWYXN6Y2GOVW7725BZO354PWSELRRZ',
      name: 'root',
      root: true
    };
    const cacheRepository = new CacheRepository({} as Dexie);
    const graphRepository = new GraphRepository({} as Client);
    const mockGetRootFolder = graphRepository.getRootFolder as Mock;
    mockGetRootFolder.mockResolvedValue(params.rootFolder);
    // Execute
    const target = new GraphService(cacheRepository, graphRepository);
    const actual = await target.getRootFolder();
    // Assert
    expect(actual).toStrictEqual(expected);
    expect(mockGetRootFolder).toBeCalled();
  });

});

describe('restoreFile', () => {

  it('should restore a file', async () => {
    // Setup
    const params = {
      fileVersion: {
        id: '1.0',
        version: '1.0'
      }
    };
    const cacheRepository = new CacheRepository({} as Dexie);
    const graphRepository = new GraphRepository({} as Client);
    const mockRestoreFile = graphRepository.restoreFile as Mock;
    // Execute
    const target = new GraphService(cacheRepository, graphRepository);
    await target.restoreFile(params.fileVersion);
    // Assert
    expect(mockRestoreFile).toBeCalledWith(params.fileVersion);
  });

});

describe('searchFiles', () => {

  it('should search for files', async () => {
    // Setup
    const params = {
      query: 'Annual Financial Report (DRAFT)',
      files: [
        {
          id: '01BYE5RZ4FL7NVUU4UDVHIRG32OLTW4IKM',
          baseName: 'Annual Financial Report (DRAFT)',
          extension: '.docx'
        }
      ]
    };
    const expected = [
      {
        id: '01BYE5RZ4FL7NVUU4UDVHIRG32OLTW4IKM',
        baseName: 'Annual Financial Report (DRAFT)',
        extension: '.docx'
      }
    ];
    const cacheRepository = new CacheRepository({} as Dexie);
    const graphRepository = new GraphRepository({} as Client);
    const mockSearchFiles = graphRepository.searchFiles as Mock;
    mockSearchFiles.mockResolvedValue(params.files);
    // Execute
    const target = new GraphService(cacheRepository, graphRepository);
    const actual = await target.searchFiles(params.query);
    // Assert
    expect(actual).toStrictEqual(expected);
    expect(mockSearchFiles).toBeCalledWith(params.query);
  });

});

describe('setFileContent', () => {

  it('should set the content of a file', async () => {
    // Setup
    const params = {
      file: {
        id: '01BYE5RZ4FL7NVUU4UDVHIRG32OLTW4IKM',
        baseName: 'Annual Financial Report (DRAFT)',
        extension: '.md',
        parentId: '01BYE5RZ56Y2GOVW7725BZO354PWSELRRZ'
      },
      content: new Blob([ '' ], { type: 'text/markdown' })
    };
    const expected = {
      id: '01BYE5RZ4FL7NVUU4UDVHIRG32OLTW4IKM',
      baseName: 'Annual Financial Report (DRAFT)',
      extension: '.md',
      parentId: '01BYE5RZ56Y2GOVW7725BZO354PWSELRRZ'
    };
    const cacheRepository = new CacheRepository({} as Dexie);
    const graphRepository = new GraphRepository({} as Client);
    const mockSetFileContent = graphRepository.setFileContent as Mock;
    mockSetFileContent.mockResolvedValue(params.file);
    // Execute
    const target = new GraphService(cacheRepository, graphRepository);
    const actual = await target.setFileContent(params.file, params.content);
    // Assert
    expect(actual).toStrictEqual(expected);
    expect(mockSetFileContent).toBeCalledWith(params.file, params.content);
  });

});
