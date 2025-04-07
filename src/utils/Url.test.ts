//
// Copyright (c) 2023-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import { isAbsoluteUrl } from './Url';

describe('isAbsoluteUrl', () => {

  it('should get true when the URL is absolute', () => {
    const param = {
      value: 'https://www.example.com/path/to/file'
    };
    const expected = {
      value: true
    };
    const actual = isAbsoluteUrl(param.value);
    expect(actual).toStrictEqual(expected.value);
  });

  it('should get false when the URL is relative', () => {
    const param = {
      value: '/path/to/file'
    };
    const expected = {
      value: false
    };
    const actual = isAbsoluteUrl(param.value);
    expect(actual).toStrictEqual(expected.value);
  });

  it('should get false when the URL is null', () => {
    const param = {
      value: null
    };
    const expected = {
      value: false
    };
    const actual = isAbsoluteUrl(param.value);
    expect(actual).toStrictEqual(expected.value);
  });

  it('should get false when the URL is undefined', () => {
    const param = {
      value: undefined
    };
    const expected = {
      value: false
    };
    const actual = isAbsoluteUrl(param.value);
    expect(actual).toStrictEqual(expected.value);
  });

});
