//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import { isAbsoluteUrl } from './Url';

describe('isAbsoluteUrl', () => {

  it('should retrieve true when the URL is an absolute URL', () => {
    const param = {
      value: 'https://www.example.com/path/to/file'
    };
    const expected = {
      value: true
    };
    const actual = isAbsoluteUrl(param.value);
    expect(actual).toStrictEqual(expected.value);
  });

  it('should retrieve false when the URL is a relative URL', () => {
    const param = {
      value: '/path/to/file'
    };
    const expected = {
      value: false
    };
    const actual = isAbsoluteUrl(param.value);
    expect(actual).toStrictEqual(expected.value);
  });

  it('should retrieve false when the URL is null', () => {
    const param = {
      value: null
    };
    const expected = {
      value: false
    };
    const actual = isAbsoluteUrl(param.value);
    expect(actual).toStrictEqual(expected.value);
  });

  it('should retrieve false when the URL is undefined', () => {
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
