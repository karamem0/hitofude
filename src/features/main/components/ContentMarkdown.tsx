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

interface ContentMarkdownProps {
  onChangeText?: EventHandler<string>,
  onSave?: EventHandler,
  onScroll?: EventHandler<ScrollPosition>
}

function ContentMarkdown(props: Readonly<ContentMarkdownProps>) {

  const {
    onChangeText,
    onSave,
    onScroll
  } = props;

  const {
    state: {
      contentProps,
      tabProps
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
      tabOpen={tabProps?.open}
      onChangeText={handleChangeText}
      onSave={onSave}
      onScroll={onScroll} />
  );

}

export default ContentMarkdown;
