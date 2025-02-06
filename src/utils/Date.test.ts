//
// Copyright (c) 2023-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import { toDate } from './Date';

describe('toDate', () => {

  it('should convert a date string to the date object', () => {
    const param = {
      value: '2000-01-01T09:00:00'
    };
    const expected = {
      value: new Date(2000, 0, 1, 9, 0, 0)
    };
    const actual = toDate(param.value);
    expect(actual).toStrictEqual(expected.value);
  });

  it('should retrieve undefined when the date string is null', () => {
    const param = {
      value: null
    };
    const expected = {
      value: undefined
    };
    const actual = toDate(param.value);
    expect(actual).toStrictEqual(expected.value);
  });

  it('should retrieve undefined when the date string is undefined', () => {
    const param = {
      value: undefined
    };
    const expected = {
      value: undefined
    };
    const actual = toDate(param.value);
    expect(actual).toStrictEqual(expected.value);
  });

});
