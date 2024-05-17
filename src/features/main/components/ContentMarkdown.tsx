//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { useStore } from '../../../providers/StoreProvider';
import { EventHandler } from '../../../types/Event';
import {
  CursorPosition,
  CursorSelection,
  ScrollPosition
} from '../../../types/Model';

import Presenter from './ContentMarkdown.presenter';

interface ContentMarkdownProps {
  onCursorPositionChange?: EventHandler<CursorPosition>,
  onCursorSelectionChange?: EventHandler<CursorSelection>,
  onSave?: EventHandler,
  onScrollPositonChange?: EventHandler<ScrollPosition>,
  onTextChange?: EventHandler<string>
}

function ContentMarkdown(props: Readonly<ContentMarkdownProps>) {

  const {
    onCursorPositionChange,
    onCursorSelectionChange,
    onSave,
    onScrollPositonChange,
    onTextChange
  } = props;

  const {
    state: {
      contentProps,
      markdownProps,
      tabProps
    }
  } = useStore();

  return (
    <Presenter
      {...contentProps}
      {...markdownProps}
      tabOpen={tabProps?.open}
      onCursorPositionChange={onCursorPositionChange}
      onCursorSelectionChange={onCursorSelectionChange}
      onSave={onSave}
      onScrollPositonChange={onScrollPositonChange}
      onTextChange={onTextChange} />
  );

}

export default ContentMarkdown;
