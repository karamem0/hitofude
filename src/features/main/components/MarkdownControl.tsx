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
import { Position } from '../../../types/Model';

import Presenter from './MarkdownControl.presenter';

interface MarkdownControlProps {
  onChangePosition?: EventHandler<Position>,
  onChangeText?: EventHandler<string>,
  onSave?: EventHandler
}

function MarkdownControl(props: MarkdownControlProps) {

  const {
    onChangePosition,
    onChangeText,
    onSave
  } = props;

  const {
    state: {
      contentProps
    }
  } = useStore();

  return (
    <Presenter
      {...contentProps}
      onChangePosition={onChangePosition}
      onChangeText={onChangeText}
      onSave={onSave} />
  );

}

export default MarkdownControl;
