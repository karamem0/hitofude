//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { useStore } from '../../../providers/StoreProvider';
import { EventHandler } from '../../../types/Event';
import { ContentMenuAction } from '../../../types/Model';

import Presenter from './ContentMenuButton.presenter';

interface ContentMenuButtonProps {
  onMenuClick?: EventHandler<ContentMenuAction>
}

function ContentMenuButton(props: ContentMenuButtonProps) {

  const {
    onMenuClick
  } = props;

  const {
    state: {
      contentProps
    }
  } = useStore();

  return (
    <Presenter
      {...contentProps}
      onMenuClick={onMenuClick} />
  );

}

export default ContentMenuButton;
