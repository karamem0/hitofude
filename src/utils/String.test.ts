//
// Copyright (c) 2023-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import { compare } from './String';

describe('compare', () => {

  it('should get 0 when the values are equal', () => {
    const param = {
      a: 'foo',
      b: 'foo'
    };
    const expected = {
      value: 0
    };
    const actual = compare(param.a, param.b);
    expect(actual).toStrictEqual(expected.value);
  });

  it('should get a positive value when the first value is greater than the second', () => {
    const param = {
      a: 'foo',
      b: 'bar'
    };
    const expected = {
      value: 1
    };
    const actual = compare(param.a, param.b);
    expect(actual).toStrictEqual(expected.value);
  });

  it('should get a positive value when the first value is null', () => {
    const param = {
      a: null,
      b: 'bar'
    };
    const expected = {
      value: 1
    };
    const actual = compare(param.a, param.b);
    expect(actual).toStrictEqual(expected.value);
  });

  it('should get a positive value when the first value is undefined', () => {
    const param = {
      a: undefined,
      b: 'bar'
    };
    const expected = {
      value: 1
    };
    const actual = compare(param.a, param.b);
    expect(actual).toStrictEqual(expected.value);
  });

  it('should get a negative value when the first value is less than the second', () => {
    const param = {
      a: 'bar',
      b: 'foo'
    };
    const expected = {
      value: -1
    };
    const actual = compare(param.a, param.b);
    expect(actual).toStrictEqual(expected.value);
  });

  it('should get a negative value when the second value is null', () => {
    const param = {
      a: 'bar',
      b: null
    };
    const expected = {
      value: -1
    };
    const actual = compare(param.a, param.b);
    expect(actual).toStrictEqual(expected.value);
  });

  it('should get a negative value when the second value is undefined', () => {
    const param = {
      a: 'bar',
      b: undefined
    };
    const expected = {
      value: -1
    };
    const actual = compare(param.a, param.b);
    expect(actual).toStrictEqual(expected.value);
  });

});
