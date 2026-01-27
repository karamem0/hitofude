//
// Copyright (c) 2023-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { useProgress } from '../../../common/providers/ProgressProvider';
import { useToast } from '../../../common/providers/ToastProvider';
import { useService } from '../../../providers/ServiceProvider';
import { useStore } from '../../../providers/StoreProvider';
import {
  setContentEditing,
  setContentFile,
  setContentScrollPosition,
  setContentText
} from '../../../stores/Action';
import { DependencyNullError } from '../../../types/Error';
import { Event } from '../../../types/Event';
import { fromText } from '../../../utils/Blob';

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
  const dispatchToast = useToast();
  const { setProgress } = useProgress();

  const handleCancel = React.useCallback(() => {
    dispatch(setContentScrollPosition());
    dispatch(setContentEditing(false));
  }, [
    dispatch
  ]);

  const handleEdit = React.useCallback(() => {
    dispatch(setContentEditing(true));
  }, [
    dispatch
  ]);

  const handleSave = React.useCallback(async (_: Event, data?: boolean) => {
    try {
      if (markdownProps == null) {
        throw new DependencyNullError();
      }
      const {
        changed,
        scrollPosition,
        text
      } = markdownProps;
      if (changed) {
        const contentFile = contentProps?.file;
        if (contentFile == null) {
          throw new DependencyNullError();
        }
        setProgress('save');
        const file = await Promise.resolve()
          .then(() => graph.setFileContent(contentFile, fromText(text ?? '')))
          .then((file) => graph.getFileById(file.id));
        dispatch(setContentFile(file));
        dispatch(setContentText(text));
        dispatch(setContentScrollPosition(data ? scrollPosition : undefined));
        dispatch(setContentEditing(data));
      }
    } catch (error) {
      if (error instanceof Error) {
        dispatchToast(error, 'error');
      } else {
        throw error;
      }
    } finally {
      setProgress();
    }
  }, [
    contentProps?.file,
    graph,
    markdownProps,
    dispatch,
    dispatchToast,
    setProgress
  ]);

  return (
    <Presenter
      changed={markdownProps?.changed}
      file={contentProps?.file}
      onCancel={handleCancel}
      onEdit={handleEdit}
      onSave={handleSave} />
  );

}

export default ContentSupported;
