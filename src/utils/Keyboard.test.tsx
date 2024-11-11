//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { moveNext, movePrevious } from './Keyboard';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

describe('moveNext', () => {

  it('should change focus to the next node', async () => {
    const user = userEvent.setup();
    render(
      <div data-testid="test-Root">
        <button data-testid="test-Foo">foo</button>
        <button data-testid="test-Bar">bar</button>
        <button data-testid="test-Baz">baz</button>
      </div>
    );
    await user.tab();
    await user.tab();
    moveNext(screen.getByTestId('test-Root'), 'button');
    expect(screen.getByTestId('test-Baz').matches(':focus')).toBe(true);
  });

  it('should not change focus when it is the last node', async () => {
    const user = userEvent.setup();
    render(
      <div data-testid="test-Root">
        <button data-testid="test-Foo">foo</button>
        <button data-testid="test-Bar">bar</button>
        <button data-testid="test-Baz">baz</button>
      </div>
    );
    await user.tab();
    await user.tab();
    await user.tab();
    moveNext(screen.getByTestId('test-Root'), 'button');
    expect(screen.getByTestId('test-Baz').matches(':focus')).toBe(true);
  });

});

describe('movePrevious', () => {

  it('should change focus to the previous node', async () => {
    const user = userEvent.setup();
    render(
      <div data-testid="test-Root">
        <button data-testid="test-Foo">foo</button>
        <button data-testid="test-Bar">bar</button>
        <button data-testid="test-Baz">baz</button>
      </div>
    );
    await user.tab();
    await user.tab();
    movePrevious(screen.getByTestId('test-Root'), 'button');
    expect(screen.getByTestId('test-Foo').matches(':focus')).toBe(true);
  });

  it('should not change focus when it is the first node', async () => {
    const user = userEvent.setup();
    render(
      <div data-testid="test-Root">
        <button data-testid="test-Foo">foo</button>
        <button data-testid="test-Bar">bar</button>
        <button data-testid="test-Baz">baz</button>
      </div>
    );
    await user.tab();
    movePrevious(screen.getByTestId('test-Root'), 'button');
    expect(screen.getByTestId('test-Foo').matches(':focus')).toBe(true);
  });

});
