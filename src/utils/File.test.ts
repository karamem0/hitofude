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

describe('downloadFile', () => {

  it('should download a file when the downloadUrl and fullName are provided', () => {
    const param = {
      value: {
        downloadUrl: 'https://www.example.com/foo.txt',
        fullName: 'foo.txt'
      }
    };
    const mockClick = vi.fn();
    const mockRemove = vi.fn();
    const mockCreateElement = vi.spyOn(window.document, 'createElement')
      .mockImplementation(() => ({
        click: mockClick,
        remove: mockRemove
      } as unknown as HTMLAnchorElement));
    downloadFile(param.value);
    expect(mockClick).toHaveBeenCalled();
    expect(mockRemove).toHaveBeenCalled();
    mockCreateElement.mockClear();
  });

  it('should throw an error when downloadUrl is undefined', () => {
    const param = {
      value: {
        downloadUrl: undefined,
        fullName: 'foo.txt'
      }
    };
    const mockCreateElement = vi.spyOn(window.document, 'createElement');
    expect(() => downloadFile(param.value)).toThrowError();
    expect(mockCreateElement).not.toHaveBeenCalled();
    mockCreateElement.mockClear();
  });

  it('should throw an error when fullName is undefined', () => {
    const param = {
      value: {
        downloadUrl: 'https://www.example.com/foo.txt',
        fullName: undefined
      }
    };
    const mockCreateElement = vi.spyOn(window.document, 'createElement');
    expect(() => downloadFile(param.value)).toThrowError();
    expect(mockCreateElement).not.toHaveBeenCalled();
    mockCreateElement.mockClear();
  });

});

describe('getBaseName', () => {

  it('should get the base name when the file name has an extension', () => {
    const param = {
      value: 'foo.txt'
    };
    const expected = {
      value: 'foo'
    };
    const actual = getBaseName(param.value);
    expect(actual).toStrictEqual(expected.value);
  });

  it('should get the base name when the file name has multiple extensions', () => {
    const param = {
      value: 'foo.txt.bak'
    };
    const expected = {
      value: 'foo.txt'
    };
    const actual = getBaseName(param.value);
    expect(actual).toStrictEqual(expected.value);
  });

  it('should get the file name when it has no extension', () => {
    const param = {
      value: 'foo'
    };
    const expected = {
      value: 'foo'
    };
    const actual = getBaseName(param.value);
    expect(actual).toStrictEqual(expected.value);
  });

  it('should get undefined when the file name is null', () => {
    const param = {
      value: null
    };
    const expected = {
      value: undefined
    };
    const actual = getBaseName(param.value);
    expect(actual).toStrictEqual(expected.value);
  });

  it('should get undefined when the file name is undefined', () => {
    const param = {
      value: undefined
    };
    const expected = {
      value: undefined
    };
    const actual = getBaseName(param.value);
    expect(actual).toStrictEqual(expected.value);
  });

});

describe('getExtension', () => {

  it('should get the extension when the file name has an extension', () => {
    const param = {
      value: 'foo.txt'
    };
    const expected = {
      value: '.txt'
    };
    const actual = getExtension(param.value);
    expect(actual).toStrictEqual(expected.value);
  });

  it('should get the last extension when the file name has multiple extensions', () => {
    const param = {
      value: 'foo.txt.bak'
    };
    const expected = {
      value: '.bak'
    };
    const actual = getExtension(param.value);
    expect(actual).toStrictEqual(expected.value);
  });

  it('should get undefined when the file name has no extension', () => {
    const param = {
      value: 'foo'
    };
    const expected = {
      value: undefined
    };
    const actual = getExtension(param.value);
    expect(actual).toStrictEqual(expected.value);
  });

  it('should get undefined when the file name is null', () => {
    const param = {
      value: null
    };
    const expected = {
      value: undefined
    };
    const actual = getExtension(param.value);
    expect(actual).toStrictEqual(expected.value);
  });

  it('should get undefined when the file name is undefined', () => {
    const param = {
      value: undefined
    };
    const expected = {
      value: undefined
    };
    const actual = getBaseName(param.value);
    expect(actual).toStrictEqual(expected.value);
  });

});

describe('getMimeType', () => {

  it('should get text/plain for a plain text file', () => {
    const param = {
      fileName: 'foo.txt',
      mimeType: 'text/plain'
    };
    const expected = {
      value: 'text/plain'
    };
    const actual = getMimeType(param.fileName, param.mimeType);
    expect(actual).toStrictEqual(expected.value);
  });

  it('should get text/markdown for a markdown file', () => {
    const param = {
      fileName: 'foo.md',
      mimeType: ''
    };
    const expected = {
      value: 'text/markdown'
    };
    const actual = getMimeType(param.fileName, param.mimeType);
    expect(actual).toStrictEqual(expected.value);
  });

  it('should get undefined when the file name is null', () => {
    const param = {
      fileName: null,
      mimeType: 'text/plain'
    };
    const expected = {
      value: undefined
    };
    const actual = getMimeType(param.fileName, param.mimeType);
    expect(actual).toStrictEqual(expected.value);
  });

  it('should get undefined when the file name is undefined', () => {
    const param = {
      fileName: undefined,
      mimeType: 'text/plain'
    };
    const expected = {
      value: undefined
    };
    const actual = getMimeType(param.fileName, param.mimeType);
    expect(actual).toStrictEqual(expected.value);
  });

  it('should get undefined when the MIME type is undefined', () => {
    const param = {
      fileName: 'foo.txt',
      mimeType: undefined
    };
    const expected = {
      value: undefined
    };
    const actual = getMimeType(param.fileName, param.mimeType);
    expect(actual).toStrictEqual(expected.value);
  });

  it('should get undefined when the MIME type is invalid', () => {
    const param = {
      fileName: 'foo.txt',
      mimeType: 'unknown'
    };
    const expected = {
      value: undefined
    };
    const actual = getMimeType(param.fileName, param.mimeType);
    expect(actual).toStrictEqual(expected.value);
  });

});

describe('isMimeType', () => {

  it('should get true when the value matches the type pattern', () => {
    const param = {
      value: 'text/plain',
      match: 'text/*'
    };
    const expected = {
      value: true
    };
    const actual = isMimeType(param.value, param.match);
    expect(actual).toStrictEqual(expected.value);
  });

  it('should get true when the value matches the subtype pattern', () => {
    const param = {
      value: 'text/plain',
      match: '*/plain'
    };
    const expected = {
      value: true
    };
    const actual = isMimeType(param.value, param.match);
    expect(actual).toStrictEqual(expected.value);
  });

  it('should get true when the value matches both type and subtype', () => {
    const param = {
      value: 'text/plain',
      match: 'text/plain'
    };
    const expected = {
      value: true
    };
    const actual = isMimeType(param.value, param.match);
    expect(actual).toStrictEqual(expected.value);
  });

  it('should get false when the value does not match the type pattern', () => {
    const param = {
      value: 'text/plain',
      match: 'image/*'
    };
    const expected = {
      value: false
    };
    const actual = isMimeType(param.value, param.match);
    expect(actual).toStrictEqual(expected.value);
  });

  it('should get false when the value does not match the subtype pattern', () => {
    const param = {
      value: 'text/plain',
      match: '*/markdown'
    };
    const expected = {
      value: false
    };
    const actual = isMimeType(param.value, param.match);
    expect(actual).toStrictEqual(expected.value);
  });

  it('should get false when the value is null', () => {
    const param = {
      value: undefined,
      match: 'text/plain'
    };
    const expected = {
      value: false
    };
    const actual = isMimeType(param.value, param.match);
    expect(actual).toStrictEqual(expected.value);
  });

  it('should get false when the value is null', () => {
    const param = {
      value: null,
      match: 'text/plain'
    };
    const expected = {
      value: false
    };
    const actual = isMimeType(param.value, param.match);
    expect(actual).toStrictEqual(expected.value);
  });

  it('should get false when the value is undefined', () => {
    const param = {
      value: undefined,
      match: 'text/plain'
    };
    const expected = {
      value: false
    };
    const actual = isMimeType(param.value, param.match);
    expect(actual).toStrictEqual(expected.value);
  });

  it('should get false when the value is invalid', () => {
    const param = {
      value: 'unknown',
      match: 'text/plain'
    };
    const expected = {
      value: false
    };
    const actual = isMimeType(param.value, param.match);
    expect(actual).toStrictEqual(expected.value);
  });

  it('should get false when the match pattern is null', () => {
    const param = {
      value: 'text/plain',
      match: null
    };
    const expected = {
      value: false
    };
    const actual = isMimeType(param.value, param.match);
    expect(actual).toStrictEqual(expected.value);
  });

  it('should get false when the match pattern is undefined', () => {
    const param = {
      value: 'text/plain',
      match: undefined
    };
    const expected = {
      value: false
    };
    const actual = isMimeType(param.value, param.match);
    expect(actual).toStrictEqual(expected.value);
  });

  it('should get false when the match pattern is invalid', () => {
    const param = {
      value: 'text/plain',
      match: 'unknown'
    };
    const expected = {
      value: false
    };
    const actual = isMimeType(param.value, param.match);
    expect(actual).toStrictEqual(expected.value);
  });

});

describe('isMarkdown', () => {

  it('should get true for a markdown text file', () => {
    const param = {
      value: {
        mimeType: 'text/markdown'
      }
    };
    const expected = {
      value: true
    };
    const actual = isMarkdown(param.value);
    expect(actual).toStrictEqual(expected.value);
  });

  it('should get false when the file format is unsupported', () => {
    const param = {
      value: {
        mimeType: 'text/plain'
      }
    };
    const expected = {
      value: false
    };
    const actual = isMarkdown(param.value);
    expect(actual).toStrictEqual(expected.value);
  });

  it('should get false when the file is undefined', () => {
    const param = {
      value: undefined
    };
    const expected = {
      value: false
    };
    const actual = isMarkdown(param.value);
    expect(actual).toStrictEqual(expected.value);
  });

});
