//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import {
  getMimeType,
  isMimeType,
  isSupportedFile
} from './File';

describe('getMimeType', () => {

  it('should return "text/plain" if the file is plain text', () => {
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

  it('should return "text/markdown" if the file is markdown text', () => {
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

  it('should return the "undefined" if the file name is "undefined"', () => {
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

  it('should return the "undefined" if the MIME type is "undefined"', () => {
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

  it('should return the "undefined" if the MIME type is invalid format', () => {
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

  it('should return true if the value matches the type', () => {
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

  it('should return true if the value matches the subtype', () => {
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

  it('should return true if the value matches the type and subtype', () => {
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

  it('should return false if the value does not match the type', () => {
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

  it('should return false if the value does not match the subtype', () => {
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

  it('should return true if the file is image', () => {
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

  it('should return true if the file is video', () => {
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

  it('should return true if the file is markdown text', () => {
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

  it('should return false if the file is other format', () => {
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

  it('should return false if the file is "undefined"', () => {
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
