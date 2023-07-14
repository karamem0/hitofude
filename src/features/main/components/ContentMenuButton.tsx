//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { EventHandler } from '../../../types/Event';
import {
  ContentMenuAction,
  File,
  FileContent
} from '../../../types/Model';

import Presenter from './ContentMenuButton.presenter';

interface ContentMenuButtonProps {
  minimapEnabled?: boolean,
  value?: File & FileContent,
  onMenuClick?: EventHandler<ContentMenuAction>
}

function ContentMenuButton(props: ContentMenuButtonProps) {

  const {
    minimapEnabled,
    value,
    onMenuClick
  } = props;

  return (
    <Presenter
      minimapEnabled={minimapEnabled}
      value={value}
      onMenuClick={onMenuClick} />
  );

}

export default ContentMenuButton;
