//
// Copyright (c) 2023-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { EventHandler } from '../../types/Event';

import Presenter from './TreeItemButton.presenter';

interface TreeItemButtonProps {
  icon?: React.ReactElement,
  name?: string,
  title?: string | React.ReactElement,
  onClick?: EventHandler
}

function TreeItemButton(props: Readonly<TreeItemButtonProps>) {

  return (
    <Presenter {...props} />
  );

}

export default TreeItemButton;
