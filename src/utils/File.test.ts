//
// Copyright (c) 2023-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import {
  downloadFile,
  getBaseName,
  getExtension,
  getMimeType,
  isMarkdown,
  isMimeType
} from './File';

beforeEach(() => {
  vi.clearAllMocks();
  vi.resetModules();
});

describe('downloadFile', () => {

  it('should download a file when the downloadUrl and fullName are provided', () => {
    // Setup
    const param = {
      value: {
        downloadUrl: 'https://www.example.com/foo.txt',
        fullName: 'foo.txt'
      }
    };
    const mockClick = vi.fn();
    const mockRemove = vi.fn();
    vi.spyOn(window.document, 'createElement')
      .mockImplementation(() => ({
        click: mockClick,
        remove: mockRemove
      } as unknown as HTMLAnchorElement));
    // Execute
    downloadFile(param.value);
    // Assert
    expect(mockClick).toHaveBeenCalled();
    expect(mockRemove).toHaveBeenCalled();
  });

  it('should throw an error when downloadUrl is undefined', () => {
    // Setup
    const param = {
      value: {
        downloadUrl: undefined,
        fullName: 'foo.txt'
      }
    };
    const mockcreateElement = vi.spyOn(window.document, 'createElement');
    // Execute
    expect(() => downloadFile(param.value)).toThrowError();
    // Assert
    expect(mockcreateElement).not.toHaveBeenCalled();
  });

  it('should throw an error when fullName is undefined', () => {
    // Setup
    const param = {
      value: {
        downloadUrl: 'https://www.example.com/foo.txt',
        fullName: undefined
      }
    };
    const mockcreateElement = vi.spyOn(window.document, 'createElement');
    // Execute
    expect(() => downloadFile(param.value)).toThrowError();
    // Assert
    expect(mockcreateElement).not.toHaveBeenCalled();
  });

});

describe('getBaseName', () => {

  it('should get the base name when the file name has an extension', () => {
    // Setup
    const param = {
      value: 'foo.txt'
    };
    const expected = {
      value: 'foo'
    };
    // Execute
    const actual = getBaseName(param.value);
    // Assert
    expect(actual).toStrictEqual(expected.value);
  });

  it('should get the base name when the file name has multiple extensions', () => {
    // Setup
    const param = {
      value: 'foo.txt.bak'
    };
    const expected = {
      value: 'foo.txt'
    };
    // Execute
    const actual = getBaseName(param.value);
    // Assert
    expect(actual).toStrictEqual(expected.value);
  });

  it('should get the file name when it has no extension', () => {
    // Setup
    const param = {
      value: 'foo'
    };
    const expected = {
      value: 'foo'
    };
    // Execute
    const actual = getBaseName(param.value);
    // Assert
    expect(actual).toStrictEqual(expected.value);
  });

  it('should get undefined when the file name is null', () => {
    // Setup
    const param = {
      value: null
    };
    const expected = {
      value: undefined
    };
    // Execute
    const actual = getBaseName(param.value);
    // Assert
    expect(actual).toStrictEqual(expected.value);
  });

  it('should get undefined when the file name is undefined', () => {
    // Setup
    const param = {
      value: undefined
    };
    const expected = {
      value: undefined
    };
    // Execute
    const actual = getBaseName(param.value);
    // Assert
    expect(actual).toStrictEqual(expected.value);
  });

});

describe('getExtension', () => {

  it('should get the extension when the file name has an extension', () => {
    // Setup
    const param = {
      value: 'foo.txt'
    };
    const expected = {
      value: '.txt'
    };
    // Execute
    const actual = getExtension(param.value);
    // Assert
    expect(actual).toStrictEqual(expected.value);
  });

  it('should get the last extension when the file name has multiple extensions', () => {
    // Setup
    const param = {
      value: 'foo.txt.bak'
    };
    const expected = {
      value: '.bak'
    };
    // Execute
    const actual = getExtension(param.value);
    // Assert
    expect(actual).toStrictEqual(expected.value);
  });

  it('should get undefined when the file name has no extension', () => {
    // Setup
    const param = {
      value: 'foo'
    };
    const expected = {
      value: undefined
    };
    // Execute
    const actual = getExtension(param.value);
    // Assert
    expect(actual).toStrictEqual(expected.value);
  });

  it('should get undefined when the file name is null', () => {
    // Setup
    const param = {
      value: null
    };
    const expected = {
      value: undefined
    };
    // Execute
    const actual = getExtension(param.value);
    // Assert
    expect(actual).toStrictEqual(expected.value);
  });

  it('should get undefined when the file name is undefined', () => {
    // Setup
    const param = {
      value: undefined
    };
    const expected = {
      value: undefined
    };
    // Execute
    const actual = getBaseName(param.value);
    // Assert
    expect(actual).toStrictEqual(expected.value);
  });

});

describe('getMimeType', () => {

  it('should get text/plain for a plain text file', () => {
    // Setup
    const param = {
      fileName: 'foo.txt',
      mimeType: 'text/plain'
    };
    const expected = {
      value: 'text/plain'
    };
    // Execute
    const actual = getMimeType(param.fileName, param.mimeType);
    // Assert
    expect(actual).toStrictEqual(expected.value);
  });

  it('should get text/markdown for a markdown file', () => {
    // Setup
    const param = {
      fileName: 'foo.md',
      mimeType: ''
    };
    const expected = {
      value: 'text/markdown'
    };
    // Execute
    const actual = getMimeType(param.fileName, param.mimeType);
    // Assert
    expect(actual).toStrictEqual(expected.value);
  });

  it('should get undefined when the file name is null', () => {
    // Setup
    const param = {
      fileName: null,
      mimeType: 'text/plain'
    };
    const expected = {
      value: undefined
    };
    // Execute
    const actual = getMimeType(param.fileName, param.mimeType);
    // Assert
    expect(actual).toStrictEqual(expected.value);
  });

  it('should get undefined when the file name is undefined', () => {
    // Setup
    const param = {
      fileName: undefined,
      mimeType: 'text/plain'
    };
    const expected = {
      value: undefined
    };
    // Execute
    const actual = getMimeType(param.fileName, param.mimeType);
    // Assert
    expect(actual).toStrictEqual(expected.value);
  });

  it('should get undefined when the MIME type is undefined', () => {
    // Setup
    const param = {
      fileName: 'foo.txt',
      mimeType: undefined
    };
    const expected = {
      value: undefined
    };
    // Execute
    const actual = getMimeType(param.fileName, param.mimeType);
    // Assert
    expect(actual).toStrictEqual(expected.value);
  });

  it('should get undefined when the MIME type is invalid', () => {
    // Setup
    const param = {
      fileName: 'foo.txt',
      mimeType: 'unknown'
    };
    const expected = {
      value: undefined
    };
    // Execute
    const actual = getMimeType(param.fileName, param.mimeType);
    // Assert
    expect(actual).toStrictEqual(expected.value);
  });

});

describe('isMimeType', () => {

  it('should get true when the value matches the type pattern', () => {
    // Setup
    const param = {
      value: 'text/plain',
      match: 'text/*'
    };
    const expected = {
      value: true
    };
    // Execute
    const actual = isMimeType(param.value, param.match);
    // Assert
    expect(actual).toStrictEqual(expected.value);
  });

  it('should get true when the value matches the subtype pattern', () => {
    // Setup
    const param = {
      value: 'text/plain',
      match: '*/plain'
    };
    const expected = {
      value: true
    };
    // Execute
    const actual = isMimeType(param.value, param.match);
    // Assert
    expect(actual).toStrictEqual(expected.value);
  });

  it('should get true when the value matches both type and subtype', () => {
    // Setup
    const param = {
      value: 'text/plain',
      match: 'text/plain'
    };
    const expected = {
      value: true
    };
    // Execute
    const actual = isMimeType(param.value, param.match);
    // Assert
    expect(actual).toStrictEqual(expected.value);
  });

  it('should get false when the value does not match the type pattern', () => {
    // Setup
    const param = {
      value: 'text/plain',
      match: 'image/*'
    };
    const expected = {
      value: false
    };
    // Execute
    const actual = isMimeType(param.value, param.match);
    // Assert
    expect(actual).toStrictEqual(expected.value);
  });

  it('should get false when the value does not match the subtype pattern', () => {
    // Setup
    const param = {
      value: 'text/plain',
      match: '*/markdown'
    };
    const expected = {
      value: false
    };
    // Execute
    const actual = isMimeType(param.value, param.match);
    // Assert
    expect(actual).toStrictEqual(expected.value);
  });

  it('should get false when the value is null', () => {
    // Setup
    const param = {
      value: undefined,
      match: 'text/plain'
    };
    const expected = {
      value: false
    };
    // Execute
    const actual = isMimeType(param.value, param.match);
    // Assert
    expect(actual).toStrictEqual(expected.value);
  });

  it('should get false when the value is null', () => {
    // Setup
    const param = {
      value: null,
      match: 'text/plain'
    };
    const expected = {
      value: false
    };
    // Execute
    const actual = isMimeType(param.value, param.match);
    // Assert
    expect(actual).toStrictEqual(expected.value);
  });

  it('should get false when the value is undefined', () => {
    // Setup
    const param = {
      value: undefined,
      match: 'text/plain'
    };
    const expected = {
      value: false
    };
    // Execute
    const actual = isMimeType(param.value, param.match);
    // Assert
    expect(actual).toStrictEqual(expected.value);
  });

  it('should get false when the value is invalid', () => {
    // Setup
    const param = {
      value: 'unknown',
      match: 'text/plain'
    };
    const expected = {
      value: false
    };
    // Execute
    const actual = isMimeType(param.value, param.match);
    // Assert
    expect(actual).toStrictEqual(expected.value);
  });

  it('should get false when the match pattern is null', () => {
    // Setup
    const param = {
      value: 'text/plain',
      match: null
    };
    const expected = {
      value: false
    };
    // Execute
    const actual = isMimeType(param.value, param.match);
    // Assert
    expect(actual).toStrictEqual(expected.value);
  });

  it('should get false when the match pattern is undefined', () => {
    // Setup
    const param = {
      value: 'text/plain',
      match: undefined
    };
    const expected = {
      value: false
    };
    // Execute
    const actual = isMimeType(param.value, param.match);
    // Assert
    expect(actual).toStrictEqual(expected.value);
  });

  it('should get false when the match pattern is invalid', () => {
    // Setup
    const param = {
      value: 'text/plain',
      match: 'unknown'
    };
    const expected = {
      value: false
    };
    // Execute
    const actual = isMimeType(param.value, param.match);
    // Assert
    expect(actual).toStrictEqual(expected.value);
  });

});

describe('isMarkdown', () => {

  it('should get true for a markdown text file', () => {
    // Setup
    const param = {
      value: {
        mimeType: 'text/markdown'
      }
    };
    const expected = {
      value: true
    };
    // Execute
    const actual = isMarkdown(param.value);
    // Assert
    expect(actual).toStrictEqual(expected.value);
  });

  it('should get false when the file format is unsupported', () => {
    // Setup
    const param = {
      value: {
        mimeType: 'text/plain'
      }
    };
    const expected = {
      value: false
    };
    // Execute
    const actual = isMarkdown(param.value);
    // Assert
    expect(actual).toStrictEqual(expected.value);
  });

  it('should get false when the file is undefined', () => {
    // Setup
    const param = {
      value: undefined
    };
    const expected = {
      value: false
    };
    // Execute
    const actual = isMarkdown(param.value);
    // Assert
    expect(actual).toStrictEqual(expected.value);
  });

});
