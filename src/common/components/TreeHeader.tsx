//
// Copyright (c) 2023-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { EventHandler } from '../../types/Event';

import Presenter from './TreeHeader.presenter';

interface TreeHeaderProps {
  menu?: React.ReactNode,
  name?: string,
  root?: boolean,
  onClick?: EventHandler
}

function TreeHeader(props: Readonly<TreeHeaderProps>) {

  const {
    menu,
    name,
    root,
    onClick
  } = props;

  return (
    <Presenter
      menu={menu}
      name={name}
      root={root}
      onClick={onClick} />
  );

}

export default TreeHeader;
