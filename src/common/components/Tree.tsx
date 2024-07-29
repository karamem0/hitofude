//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { Event } from '../../types/Event';

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
        const { current: element } = ref;
        const items = element?.querySelectorAll<HTMLDivElement>('div[role="menuitem"]');
        if (items == null) {
          break;
        }
        for (let i = 0; i < items?.length - 1; i++) {
          if (items[i] === document.activeElement) {
            items[i + 1].focus();
            break;
          }
        }
        break;
      }
      case 'ArrowUp': {
        const { current: element } = ref;
        const items = element?.querySelectorAll<HTMLDivElement>('div[role="menuitem"]');
        if (items == null) {
          break;
        }
        for (let i = 1; i < items?.length; i++) {
          if (items[i] === document.activeElement) {
            items[i - 1].focus();
            break;
          }
        }
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
