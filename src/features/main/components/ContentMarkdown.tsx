//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { useStore } from '../../../providers/StoreProvider';
import { Event, EventHandler } from '../../../types/Event';
import { Position } from '../../../types/Model';

import Presenter from './ContentMarkdown.presenter';

interface MarkdownControlProps {
  onChangePosition?: EventHandler<Position>,
  onChangeText?: EventHandler<string>,
  onChangePreview?: EventHandler<boolean>,
  onSave?: EventHandler
}

function MarkdownControl(props: MarkdownControlProps) {

  const {
    onChangePosition,
    onChangeText,
    onChangePreview,
    onSave
  } = props;

  const {
    state: {
      contentProps,
      tabMode
    }
  } = useStore();

  const [ previewText, setPreviewText ] = React.useState<string>('');

  const handleChangeText = React.useCallback((e?: Event, data?: string) => {
    onChangeText?.(e, data);
    setPreviewText(data ?? '');
  }, [
    onChangeText
  ]);

  return (
    <Presenter
      {...contentProps}
      previewText={previewText}
      tabOpen={tabMode?.open}
      onChangePosition={onChangePosition}
      onChangePreview={onChangePreview}
      onChangeText={handleChangeText}
      onSave={onSave} />
  );

}

export default MarkdownControl;
