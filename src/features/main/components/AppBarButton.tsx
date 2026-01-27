//
// Copyright (c) 2023-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { useStore } from '../../../providers/StoreProvider';
import { EventHandler } from '../../../types/Event';
import { TabType } from '../../../types/Model';

import Presenter from './AppBarButton.presenter';

interface AppBarButtonProps {
  icon?: React.ReactElement,
  title?: string | React.ReactElement,
  type?: TabType,
  onClick?: EventHandler
}

function AppBarButton(props: Readonly<AppBarButtonProps>) {

  const {
    icon,
    title,
    type,
    onClick
  } = props;

  const {
    state: {
      tabProps
    }
  } = useStore();

  return (
    <Presenter
      disabled={tabProps?.loading}
      icon={icon}
      selected={tabProps?.type === type}
      title={title}
      onClick={onClick} />
  );

}

export default AppBarButton;
