//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { EventHandler } from '../../../types/Event';

import Presenter from './TreeItemControl.presenter';

interface TreeItemControlProps {
  icon?: React.ReactNode,
  menu?: React.ReactNode,
  menuEnabled?: boolean,
  name?: string,
  selected?: boolean,
  onClick?: EventHandler
}

function TreeItemControl(props: TreeItemControlProps) {

  const {
    icon,
    menu,
    menuEnabled = true,
    name,
    selected,
    onClick
  } = props;

  return (
    <Presenter
      icon={icon}
      menu={menu}
      menuEnabled={menuEnabled}
      name={name}
      selected={selected}
      onClick={onClick} />
  );

}

export default TreeItemControl;
