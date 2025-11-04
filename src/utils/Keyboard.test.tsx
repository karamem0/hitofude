//
// Copyright (c) 2023-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { moveNext, movePrevious } from './Keyboard';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

beforeEach(() => {
  vi.clearAllMocks();
  vi.resetModules();
});

describe('moveNext', () => {

  it('should change focus to the next node', async () => {
    // Setup
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
    // Execute
    moveNext(screen.getByTestId('test-Root'), 'button');
    // Assert
    expect(screen.getByTestId('test-Baz').matches(':focus')).toBe(true);
  });

  it('should not change focus when the last node is focused', async () => {
    // Setup
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
    // Execute
    moveNext(screen.getByTestId('test-Root'), 'button');
    // Assert
    expect(screen.getByTestId('test-Baz').matches(':focus')).toBe(true);
  });

  it('should not change focus when the node list is empty', async () => {
    // Setup
    const user = userEvent.setup();
    render(
      <React.Fragment>
        <button data-testid="test-Foo">foo</button>
        <div data-testid="test-Root" />
      </React.Fragment>
    );
    await user.tab();
    // Execute
    moveNext(screen.getByTestId('test-Root'), 'button');
    // Assert
    expect(screen.getByTestId('test-Foo').matches(':focus')).toBe(true);
  });

});

describe('movePrevious', () => {

  it('should change focus to the previous node', async () => {
    // Setup
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
    // Execute
    movePrevious(screen.getByTestId('test-Root'), 'button');
    // Assert
    expect(screen.getByTestId('test-Foo').matches(':focus')).toBe(true);
  });

  it('should not change focus when the first node is focused', async () => {
    // Setup
    const user = userEvent.setup();
    render(
      <div data-testid="test-Root">
        <button data-testid="test-Foo">foo</button>
        <button data-testid="test-Bar">bar</button>
        <button data-testid="test-Baz">baz</button>
      </div>
    );
    await user.tab();
    // Execute
    movePrevious(screen.getByTestId('test-Root'), 'button');
    // Assert
    expect(screen.getByTestId('test-Foo').matches(':focus')).toBe(true);
  });

  it('should not change focus when the node list is empty', async () => {
    // Setup
    const user = userEvent.setup();
    render(
      <React.Fragment>
        <button data-testid="test-Foo">foo</button>
        <div data-testid="test-Root" />
      </React.Fragment>
    );
    await user.tab();
    // Execute
    movePrevious(screen.getByTestId('test-Root'), 'button');
    // Assert
    expect(screen.getByTestId('test-Foo').matches(':focus')).toBe(true);
  });

});
