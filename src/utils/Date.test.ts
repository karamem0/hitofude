//
// Copyright (c) 2023-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import { toDate } from './Date';

beforeEach(() => {
  vi.clearAllMocks();
  vi.resetModules();
});

describe('toDate', () => {

  it('should get a convert date string to a date object', () => {
    // Setup
    const param = {
      value: '2000-01-01T09:00:00'
    };
    const expected = {
      value: new Date(2000, 0, 1, 9, 0, 0)
    };
    // Execute
    const actual = toDate(param.value);
    // Assert
    expect(actual).toStrictEqual(expected.value);
  });

  it('should get undefined when the date string is null', () => {
    // Setup
    const param = {
      value: null
    };
    const expected = {
      value: undefined
    };
    // Execute
    const actual = toDate(param.value);
    expect(actual).toStrictEqual(expected.value);
  });

  it('should get undefined when the date string is undefined', () => {
    // Setup
    const param = {
      value: undefined
    };
    const expected = {
      value: undefined
    };
    // Execute
    const actual = toDate(param.value);
    // Assert
    expect(actual).toStrictEqual(expected.value);
  });

});
