//
// Copyright (c) 2023-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import { isAbsoluteUrl } from './Url';

beforeEach(() => {
  vi.clearAllMocks();
  vi.resetModules();
});

describe('isAbsoluteUrl', () => {

  it('should get true when the URL is absolute', () => {
    // Setup
    const param = {
      value: 'https://www.example.com/path/to/file'
    };
    const expected = {
      value: true
    };
    // Execute
    const actual = isAbsoluteUrl(param.value);
    // Assert
    expect(actual).toStrictEqual(expected.value);
  });

  it('should get false when the URL is relative', () => {
    // Setup
    const param = {
      value: '/path/to/file'
    };
    const expected = {
      value: false
    };
    // Execute
    const actual = isAbsoluteUrl(param.value);
    // Assert
    expect(actual).toStrictEqual(expected.value);
  });

  it('should get false when the URL is null', () => {
    // Setup
    const param = {
      value: null
    };
    const expected = {
      value: false
    };
    // Execute
    const actual = isAbsoluteUrl(param.value);
    // Assert
    expect(actual).toStrictEqual(expected.value);
  });

  it('should get false when the URL is undefined', () => {
    // Setup
    const param = {
      value: undefined
    };
    const expected = {
      value: false
    };
    // Execute
    const actual = isAbsoluteUrl(param.value);
    // Assert
    expect(actual).toStrictEqual(expected.value);
  });

});
