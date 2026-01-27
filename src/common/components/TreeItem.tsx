//
// Copyright (c) 2023-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { Event, EventHandler } from '../../types/Event';

import Presenter from './TreeItem.presenter';

interface TreeItemProps {
  icon?: React.ReactElement,
  info?: React.ReactNode,
  menu?: React.ReactNode,
  menuEnabled?: boolean,
  name?: string,
  selected?: boolean,
  title?: React.ReactElement,
  onClick?: EventHandler
}

function TreeItem(props: Readonly<TreeItemProps>) {

  const {
    icon,
    info,
    menu,
    name,
    selected,
    title,
    onClick
  } = props;

  const handleKeyDown = React.useCallback((event: Event) => {
    const { key } = event as KeyboardEvent;
    if (key === 'Enter' || key === ' ') {
      onClick?.(event);
    }
  }, [
    onClick
  ]);

  return (
    <Presenter
      icon={icon}
      info={info}
      menu={menu}
      name={name}
      selected={selected}
      title={title}
      onClick={onClick}
      onKeyDown={handleKeyDown} />
  );

}

export default TreeItem;
