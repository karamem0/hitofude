//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { Event, EventHandler } from '../../../types/Event';

import Presenter from './AppBarButton.presenter';

interface AppBarButtonProps {
  icon?: React.ReactElement,
  selected?: boolean,
  title?: string,
  onClick?: EventHandler
}

function AppBarButton(props: AppBarButtonProps) {

  const {
    icon,
    selected,
    title,
    onClick
  } = props;

  const [ focused, setFocused ] = React.useState(false);

  const handleFocusChanged = React.useCallback((_?: Event, data?: boolean) => {
    setFocused(data ?? false);
  }, []);

  return (
    <Presenter
      focused={focused}
      icon={icon}
      selected={selected}
      title={title}
      onClick={onClick}
      onFocusChanged={handleFocusChanged} />
  );

}

export default AppBarButton;
