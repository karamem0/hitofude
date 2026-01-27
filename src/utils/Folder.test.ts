//
// Copyright (c) 2023-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import { isEmpty } from './Folder';

beforeEach(() => {
  vi.clearAllMocks();
  vi.resetModules();
});

describe('isEmpty', () => {

  it('should get true when the folder is empty', () => {
    // Setup
    const param = {
      allFiles: false,
      folder: {
        files: [],
        folders: [],
        id: 'foo'
      }
    };
    const expected = {
      value: true
    };
    // Execute
    const actual = isEmpty(param.folder, param.allFiles);
    // Assert
    expect(actual).toStrictEqual(expected.value);
  });

  it('should get true when the folder contains unsupported files', () => {
    // Setup
    const param = {
      allFiles: false,
      folder: {
        files: [
          {
            baseName: 'bar',
            fullName: 'bar.dat',
            id: 'bar',
            mimeType: 'application/octet-stream'
          }
        ],
        folders: [],
        id: 'foo'
      }
    };
    const expected = {
      value: true
    };
    // Execute
    const actual = isEmpty(param.folder, param.allFiles);
    // Assert
    expect(actual).toStrictEqual(expected.value);
  });

  it('should get false when the folder contains subfolders', () => {
    // Setup
    const param = {
      allFiles: false,
      folder: {
        files: [],
        folders: [
          {
            files: [],
            folders: [],
            id: 'bar'
          }
        ],
        id: 'foo'
      }
    };
    const expected = {
      value: false
    };
    // Execute
    const actual = isEmpty(param.folder, param.allFiles);
    // Assert
    expect(actual).toStrictEqual(expected.value);
  });

  it('should get false when the folder contains supported files', () => {
    // Setup
    const param = {
      allFiles: false,
      folder: {
        files: [
          {
            baseName: 'bar',
            fullName: 'bar.md',
            id: 'bar',
            mimeType: 'text/markdown'
          }
        ],
        folders: [],
        id: 'foo'
      }
    };
    const expected = {
      value: false
    };
    // Execute
    const actual = isEmpty(param.folder, param.allFiles);
    // Assert
    expect(actual).toStrictEqual(expected.value);
  });

  it('should get false when the folder contains unsupported files but is configured to show all files', () => {
    // Setup
    const param = {
      allFiles: true,
      folder: {
        files: [
          {
            baseName: 'bar',
            fullName: 'bar.dat',
            id: 'bar',
            mimeType: 'application/octet-stream'
          }
        ],
        folders: [],
        id: 'foo'
      }
    };
    const expected = {
      value: false
    };
    // Execute
    const actual = isEmpty(param.folder, param.allFiles);
    // Assert
    expect(actual).toStrictEqual(expected.value);
  });

});
