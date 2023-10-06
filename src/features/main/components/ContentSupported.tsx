//
// Copyright (c) 2023 karamem0
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
  setContentPosition,
  setContentText,
  setError,
  setMarkdownChanged,
  setMarkdownPosition,
  setMarkdownText
} from '../../../stores/Action';
import { DependencyNullError } from '../../../types/Error';
import { Event } from '../../../types/Event';
import { ProgressType, ScrollPosition } from '../../../types/Model';

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
      dispatch(setContentPosition());
      dispatch(setContentEditing(false));
    } catch (e) {
      dispatch(setError(e as Error));
    }
  }, [
    dispatch
  ]);

  const handleChangeText = React.useCallback((_?: Event, data?: string) => {
    dispatch(setMarkdownText(data));
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
        position,
        text
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
        dispatch(setContentPosition(data ? position : undefined));
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

  const handleScroll = React.useCallback((_?: Event, data?: ScrollPosition) => {
    dispatch(setMarkdownPosition(data));
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
      onChangeText={handleChangeText}
      onEdit={handleEdit}
      onSave={handleSave}
      onScroll={handleScroll} />
  );

}

export default ContentSupported;
