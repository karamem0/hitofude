//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { render } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { moveNext, movePrevious } from './Keyboard';

describe('moveNext', () => {

  it('should change focus to the next node', async () => {
    const user = userEvent.setup();
    const { getByTestId } = render(
      <div data-testid="root">
        <button data-testid="foo">foo</button>
        <button data-testid="bar">bar</button>
        <button data-testid="baz">baz</button>
      </div>
    );
    await user.tab();
    await user.tab();
    moveNext(getByTestId('root'), 'button');
    expect(document.activeElement).toBe(getByTestId('baz'));
  });

  it('should not change focus if it is the last node', async () => {
    const user = userEvent.setup();
    const { getByTestId } = render(
      <div data-testid="root">
        <button data-testid="foo">foo</button>
        <button data-testid="bar">bar</button>
        <button data-testid="baz">baz</button>
      </div>
    );
    await user.tab();
    await user.tab();
    await user.tab();
    moveNext(getByTestId('root'), 'button');
    expect(document.activeElement).toBe(getByTestId('baz'));
  });

});

describe('movePrevious', () => {

  it('should change focus to the previous node', async () => {
    const user = userEvent.setup();
    const { getByTestId } = render(
      <div data-testid="root">
        <button data-testid="foo">foo</button>
        <button data-testid="bar">bar</button>
        <button data-testid="baz">baz</button>
      </div>
    );
    await user.tab();
    await user.tab();
    movePrevious(getByTestId('root'), 'button');
    expect(document.activeElement).toBe(getByTestId('foo'));
  });

  it('should not change focus if it is the first node', async () => {
    const user = userEvent.setup();
    const { getByTestId } = render(
      <div data-testid="root">
        <button data-testid="foo">foo</button>
        <button data-testid="bar">bar</button>
        <button data-testid="baz">baz</button>
      </div>
    );
    await user.tab();
    movePrevious(getByTestId('root'), 'button');
    expect(document.activeElement).toBe(getByTestId('foo'));
  });

});
