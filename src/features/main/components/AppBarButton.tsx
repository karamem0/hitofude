//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { Event, EventHandler } from '../../../types/Event';

import Presenter from './AppBarButton.presenter';

interface AppBarButtonProps {
  disabled?: boolean,
  icon?: React.ReactElement,
  selected?: boolean,
  title?: string,
  onClick?: EventHandler
}

function AppBarButton(props: Readonly<AppBarButtonProps>) {

  const {
    disabled,
    icon,
    selected,
    title,
    onClick
  } = props;

  const [ focused, setFocused ] = React.useState(false);

  const handleFocusChanged = React.useCallback((_: Event, data?: boolean) => {
    setFocused(data ?? false);
  }, []);

  return (
    <Presenter
      disabled={disabled}
      focused={focused}
      icon={icon}
      selected={selected}
      title={title}
      onClick={onClick}
      onFocusChanged={handleFocusChanged} />
  );

}

export default AppBarButton;
