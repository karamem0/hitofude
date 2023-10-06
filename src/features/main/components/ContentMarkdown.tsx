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
import { ScrollPosition } from '../../../types/Model';

import Presenter from './ContentMarkdown.presenter';

interface MarkdownControlProps {
  onChangeText?: EventHandler<string>,
  onChangePreview?: EventHandler<boolean>,
  onSave?: EventHandler,
  onScroll?: EventHandler<ScrollPosition>
}

function MarkdownControl(props: MarkdownControlProps) {

  const {
    onChangeText,
    onChangePreview,
    onSave,
    onScroll
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
      onChangePreview={onChangePreview}
      onChangeText={handleChangeText}
      onSave={onSave}
      onScroll={onScroll} />
  );

}

export default MarkdownControl;
