//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { MenuProps } from '@fluentui/react-components';

import Presenter from './AppBarMenuButton.presenter';

interface AppBarMenuButtonProps {
  icon?: React.ReactElement,
  menu?: React.ReactNode,
  menuProps?: Partial<MenuProps>,
  title?: string
}

function AppBarMenuButton(props: Readonly<AppBarMenuButtonProps>) {

  const {
    icon,
    menu,
    menuProps,
    title
  } = props;

  return (
    <Presenter
      icon={icon}
      menu={menu}
      menuProps={menuProps}
      title={title} />
  );

}

export default AppBarMenuButton;
