//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { EventHandler } from '../../../types/Event';

import Presenter from './TreeHeaderControl.presenter';

interface TreeHeaderControlProps {
  disabled?: boolean,
  menu?: React.ReactNode,
  name?: string,
  onClick?: EventHandler
}

function TreeHeaderControl(props: TreeHeaderControlProps) {

  const {
    disabled,
    menu,
    name,
    onClick
  } = props;

  return (
    <Presenter
      disabled={disabled}
      menu={menu}
      name={name}
      onClick={onClick} />
  );

}

export default TreeHeaderControl;
