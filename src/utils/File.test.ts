//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import {
  getBaseName,
  getExtension,
  getMimeType,
  isMimeType,
  isSupportedFile
} from './File';

describe('getBaseName', () => {

  it('should retrieve the base name when the file name contains an extension', () => {
    const param = {
      value: 'foo.txt'
    };
    const expected = {
      value: 'foo'
    };
    const actual = getBaseName(param.value);
    expect(actual).toStrictEqual(expected.value);
  });

  it('should retrieve the base name when the file name contains multiple extensions', () => {
    const param = {
      value: 'foo.txt.bak'
    };
    const expected = {
      value: 'foo.txt'
    };
    const actual = getBaseName(param.value);
    expect(actual).toStrictEqual(expected.value);
  });

  it('should retrieve the base name when the file name does not contain an extension', () => {
    const param = {
      value: 'foo'
    };
    const expected = {
      value: 'foo'
    };
    const actual = getBaseName(param.value);
    expect(actual).toStrictEqual(expected.value);
  });

  it('should retrieve undefined when the file name is null', () => {
    const param = {
      value: null
    };
    const expected = {
      value: undefined
    };
    const actual = getBaseName(param.value);
    expect(actual).toStrictEqual(expected.value);
  });

  it('should retrieve undefined when the file name is undefined', () => {
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

  it('should retrieve the extension when the file name contains an extension', () => {
    const param = {
      value: 'foo.txt'
    };
    const expected = {
      value: '.txt'
    };
    const actual = getExtension(param.value);
    expect(actual).toStrictEqual(expected.value);
  });

  it('should retrieve the extension when the file name contains multiple extensions', () => {
    const param = {
      value: 'foo.txt.bak'
    };
    const expected = {
      value: '.bak'
    };
    const actual = getExtension(param.value);
    expect(actual).toStrictEqual(expected.value);
  });

  it('should retrieve undefined when the file name does not contain an extension', () => {
    const param = {
      value: 'foo'
    };
    const expected = {
      value: undefined
    };
    const actual = getExtension(param.value);
    expect(actual).toStrictEqual(expected.value);
  });

  it('should retrieve undefined when the file name is null', () => {
    const param = {
      value: null
    };
    const expected = {
      value: undefined
    };
    const actual = getExtension(param.value);
    expect(actual).toStrictEqual(expected.value);
  });

  it('should retrieve undefined when the file name is undefined', () => {
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

  it('should retrieve text/plain when the file is a plain text', () => {
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

  it('should retrieve text/markdown when the file is a markdown text', () => {
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

  it('should retrieve undefined when the file name is undefined', () => {
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

  it('should retrieve undefined when the MIME type is undefined', () => {
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

  it('should retrieve undefined when the MIME type is an invalid format', () => {
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

  it('should retrieve true when the value matches the type', () => {
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

  it('should retrieve true when the value matches the subtype', () => {
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

  it('should retrieve true when the value matches the type and subtype', () => {
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

  it('should retrieve false when the value does not match the type', () => {
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

  it('should retrieve false when the value does not match the subtype', () => {
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

});

describe('isSupportedFile', () => {

  it('should retrieve true when the file is an image', () => {
    const param = {
      value: {
        mimeType: 'image/png'
      }
    };
    const expected = {
      value: true
    };
    const actual = isSupportedFile(param.value);
    expect(actual).toStrictEqual(expected.value);
  });

  it('should retrieve true when the file is a video', () => {
    const param = {
      value: {
        mimeType: 'video/mp4'
      }
    };
    const expected = {
      value: true
    };
    const actual = isSupportedFile(param.value);
    expect(actual).toStrictEqual(expected.value);
  });

  it('should retrieve true when the file is a markdown text', () => {
    const param = {
      value: {
        mimeType: 'text/markdown'
      }
    };
    const expected = {
      value: true
    };
    const actual = isSupportedFile(param.value);
    expect(actual).toStrictEqual(expected.value);
  });

  it('should retrieve false when the file is an other format', () => {
    const param = {
      value: {
        mimeType: 'text/plain'
      }
    };
    const expected = {
      value: false
    };
    const actual = isSupportedFile(param.value);
    expect(actual).toStrictEqual(expected.value);
  });

  it('should retrieve false when the file is undefined', () => {
    const param = {
      value: undefined
    };
    const expected = {
      value: false
    };
    const actual = isSupportedFile(param.value);
    expect(actual).toStrictEqual(expected.value);
  });

});
