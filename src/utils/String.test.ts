//
// Copyright (c) 2023-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import { compare } from './String';

beforeEach(() => {
  vi.clearAllMocks();
  vi.resetModules();
});

describe('compare', () => {

  it('should get 0 when the values are equal', () => {
    // Setup
    const param = {
      a: 'foo',
      b: 'foo'
    };
    const expected = {
      value: 0
    };
    // Execute
    const actual = compare(param.a, param.b);
    // Assert
    expect(actual).toStrictEqual(expected.value);
  });

  it('should get a positive value when the first value is greater than the second', () => {
    // Setup
    const param = {
      a: 'foo',
      b: 'bar'
    };
    const expected = {
      value: 1
    };
    // Execute
    const actual = compare(param.a, param.b);
    // Assert
    expect(actual).toStrictEqual(expected.value);
  });

  it('should get a positive value when the first value is null', () => {
    // Setup
    const param = {
      a: null,
      b: 'bar'
    };
    const expected = {
      value: 1
    };
    // Execute
    const actual = compare(param.a, param.b);
    // Assert
    expect(actual).toStrictEqual(expected.value);
  });

  it('should get a positive value when the first value is undefined', () => {
    // Setup
    const param = {
      a: undefined,
      b: 'bar'
    };
    const expected = {
      value: 1
    };
    // Execute
    const actual = compare(param.a, param.b);
    // Assert
    expect(actual).toStrictEqual(expected.value);
  });

  it('should get a negative value when the first value is less than the second', () => {
    // Setup
    const param = {
      a: 'bar',
      b: 'foo'
    };
    const expected = {
      value: -1
    };
    // Execute
    const actual = compare(param.a, param.b);
    // Assert
    expect(actual).toStrictEqual(expected.value);
  });

  it('should get a negative value when the second value is null', () => {
    // Setup
    const param = {
      a: 'bar',
      b: null
    };
    const expected = {
      value: -1
    };
    // Execute
    const actual = compare(param.a, param.b);
    // Assert
    expect(actual).toStrictEqual(expected.value);
  });

  it('should get a negative value when the second value is undefined', () => {
    // Setup
    const param = {
      a: 'bar',
      b: undefined
    };
    const expected = {
      value: -1
    };
    // Execute
    const actual = compare(param.a, param.b);
    // Assert
    expect(actual).toStrictEqual(expected.value);
  });

});
