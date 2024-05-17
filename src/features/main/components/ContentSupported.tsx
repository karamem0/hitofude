//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { useProgress } from '../../../common/providers/ProgressProvider';
import { useService } from '../../../providers/ServiceProvider';
import { useStore } from '../../../providers/StoreProvider';
import {
  setContentEditing,
  setContentFile,
  setContentScrollPosition,
  setContentText,
  setError,
  setMarkdownChanged,
  setMarkdownCursorPosition,
  setMarkdownCursorSelection,
  setMarkdownScrollPosition,
  setMarkdownText
} from '../../../stores/Action';
import { DependencyNullError } from '../../../types/Error';
import { Event } from '../../../types/Event';
import { CursorPosition, CursorSelection, ProgressType, ScrollPosition } from '../../../types/Model';

import Presenter from './ContentSupported.presenter';

function ContentSupported() {

  const {
    dispatch,
    state: {
      contentProps,
      markdownProps
    }
  } = useStore();
  const { graph } = useService();
  const { setProgress } = useProgress();

  const handleCancel = React.useCallback(() => {
    try {
      dispatch(setContentScrollPosition());
      dispatch(setContentEditing(false));
    } catch (e) {
      dispatch(setError(e as Error));
    }
  }, [
    dispatch
  ]);

  const handleCursorPositionChange = React.useCallback((_?: Event, data?: CursorPosition) => {
    dispatch(setMarkdownCursorPosition(data));
  }, [
    dispatch
  ]);

  const handleCursorSelectionChange = React.useCallback((_?: Event, data?: CursorSelection) => {
    dispatch(setMarkdownCursorSelection(data));
  }, [
    dispatch
  ]);

  const handleEdit = React.useCallback(() => {
    try {
      dispatch(setContentEditing(true));
      dispatch(setMarkdownChanged(false));
    } catch (e) {
      dispatch(setError(e as Error));
    }
  }, [
    dispatch
  ]);

  const handleSave = React.useCallback(async (_?: Event, data?: boolean) => {
    try {
      if (markdownProps == null) {
        throw new DependencyNullError();
      }
      const {
        changed,
        text,
        scrollPosition
      } = markdownProps;
      if (changed) {
        const contentFile = contentProps?.file;
        if (contentFile == null) {
          throw new DependencyNullError();
        }
        setProgress(ProgressType.save);
        const file = await Promise.resolve()
          .then(() => graph.setFileContent(contentFile, text ?? ''))
          .then((file) => graph.getFileById(file.id));
        dispatch(setContentFile(file));
        dispatch(setContentText(text));
        dispatch(setContentScrollPosition(data ? scrollPosition : undefined));
        dispatch(setContentEditing(data));
      }
    } catch (e) {
      dispatch(setError(e as Error));
    } finally {
      setProgress();
    }
  }, [
    contentProps?.file,
    graph,
    markdownProps,
    dispatch,
    setProgress
  ]);

  const handleScrollChange = React.useCallback((_?: Event, data?: ScrollPosition) => {
    dispatch(setMarkdownScrollPosition(data));
  }, [
    dispatch
  ]);

  const handleTextChange = React.useCallback((_?: Event, data?: string) => {
    dispatch(setMarkdownText(data));
  }, [
    dispatch
  ]);

  React.useEffect(() => {
    dispatch(setMarkdownChanged(contentProps?.text !== markdownProps?.text));
  }, [
    contentProps?.text,
    markdownProps?.text,
    dispatch
  ]);

  return (
    <Presenter
      changed={markdownProps?.changed}
      file={contentProps?.file}
      onCancel={handleCancel}
      onCursorPositionChange={handleCursorPositionChange}
      onCursorSelectionChange={handleCursorSelectionChange}
      onEdit={handleEdit}
      onSave={handleSave}
      onScrollPositonChange={handleScrollChange}
      onTextChange={handleTextChange} />
  );

}

export default ContentSupported;
