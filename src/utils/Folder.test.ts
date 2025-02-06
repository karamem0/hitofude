//
// Copyright (c) 2023-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import { isEmpty } from './Folder';

describe('isEmpty', () => {

  it('should retrieve true when the folder is empty', () => {
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
    const actual = isEmpty(param.folder, param.allFiles);
    expect(actual).toStrictEqual(expected.value);
  });

  it('should retrieve true when the folder contains unsupported files', () => {
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
    const actual = isEmpty(param.folder, param.allFiles);
    expect(actual).toStrictEqual(expected.value);
  });

  it('should retrieve false when the folder contains folders', () => {
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
    const actual = isEmpty(param.folder, param.allFiles);
    expect(actual).toStrictEqual(expected.value);
  });

  it('should retrieve false when the folder contains supported files', () => {
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
    const actual = isEmpty(param.folder, param.allFiles);
    expect(actual).toStrictEqual(expected.value);
  });

  it('should retrieve false when the folder contains unsupported files but is specified to show all files', () => {
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
    const actual = isEmpty(param.folder, param.allFiles);
    expect(actual).toStrictEqual(expected.value);
  });

});
