//
// Copyright (c) 2023-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { Event, EventHandler } from '../../../types/Event';
import { MarkdownToolbarAction, ScrollPosition } from '../../../types/Model';
import {
  setMarkdownChanged,
  setMarkdownScrollPosition,
  setMarkdownText
} from '../../../stores/Action';
import { DependencyNullError } from '../../../types/Error';
import { MarkdownEditorHandle } from '../../markdown/types/Handle';
import Presenter from './ContentMarkdown.presenter';
import { useStore } from '../../../providers/StoreProvider';

interface ContentMarkdownProps {
  onSave?: EventHandler
}

function ContentMarkdown(props: Readonly<ContentMarkdownProps>) {

  const { onSave } = props;

  const {
    dispatch,
    state: {
      contentProps,
      markdownProps,
      tabProps
    }
  } = useStore();
  const editorRef = React.useRef<MarkdownEditorHandle>(null);

  const handleScrollPositionChange = React.useCallback((_: Event, data?: ScrollPosition) => {
    dispatch(setMarkdownScrollPosition(data));
  }, [
    dispatch
  ]);

  const handleTextChange = React.useCallback((_: Event, data?: string) => {
    dispatch(setMarkdownText(data));
  }, [
    dispatch
  ]);

  const handleToolbarClick = React.useCallback((_: Event, data?: MarkdownToolbarAction) => {
    if (data == null) {
      throw new DependencyNullError();
    }
    const { current: editorEl } = editorRef;
    if (editorEl == null) {
      return;
    }
    editorEl[data]();
  }, []);

  React.useEffect(() => {
    dispatch(setMarkdownChanged(contentProps?.text !== markdownProps?.text));
  }, [
    contentProps?.text,
    markdownProps?.text,
    dispatch
  ]);

  return (
    <Presenter
      {...contentProps}
      {...markdownProps}
      ref={editorRef}
      tabOpen={tabProps?.open}
      onSave={onSave}
      onScrollPositonChange={handleScrollPositionChange}
      onTextChange={handleTextChange}
      onToolbarClick={handleToolbarClick} />
  );

}

export default ContentMarkdown;
