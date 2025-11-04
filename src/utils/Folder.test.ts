//
// Copyright (c) 2023-2025 karamem0
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
      folder: {
        id: 'foo',
        folders: [],
        files: []
      },
      allFiles: false
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
      folder: {
        id: 'foo',
        folders: [],
        files: [
          {
            id: 'bar',
            fullName: 'bar.dat',
            baseName: 'bar',
            mimeType: 'application/octet-stream'
          }
        ]
      },
      allFiles: false
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
      folder: {
        id: 'foo',
        folders: [
          {
            id: 'bar',
            folders: [],
            files: []
          }
        ],
        files: []
      },
      allFiles: false
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
      folder: {
        id: 'foo',
        folders: [],
        files: [
          {
            id: 'bar',
            fullName: 'bar.md',
            baseName: 'bar',
            mimeType: 'text/markdown'
          }
        ]
      },
      allFiles: false
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
      folder: {
        id: 'foo',
        folders: [],
        files: [
          {
            id: 'bar',
            fullName: 'bar.dat',
            baseName: 'bar',
            mimeType: 'application/octet-stream'
          }
        ]
      },
      allFiles: true
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
