//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { Event } from '../../types/Event';
import { moveNext, movePrevious } from '../../utils/Keyboard';

import Presenter from './Tree.presenter';

interface TreeProps {
  disabled?: boolean
}

function Tree(props: Readonly<React.PropsWithChildren<TreeProps>>) {

  const {
    children,
    disabled
  } = props;

  const ref = React.useRef<HTMLDivElement>(null);

  const handleKeyDown = React.useCallback((event: Event) => {
    const { key } = event as KeyboardEvent;
    switch (key) {
      case 'ArrowDown': {
        moveNext(ref.current, 'div[role="menuitem"]');
        break;
      }
      case 'ArrowUp': {
        movePrevious(ref.current, 'div[role="menuitem"]');
        break;
      }
      default:
        break;
    }
  }, []);

  return (
    <Presenter
      ref={ref}
      disabled={disabled}
      onKeyDown={handleKeyDown}>
      {children}
    </Presenter>
  );

}

export default Tree;
