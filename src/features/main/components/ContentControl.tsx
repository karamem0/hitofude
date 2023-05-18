//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { useForm } from 'react-hook-form';

import { useProgress } from '../../../providers/ProgressProvider';
import { useService } from '../../../providers/ServiceProvider';
import { useStore } from '../../../providers/StoreProvider';
import {
  setError,
  setSidePanelAction,
  setWorkFile
} from '../../../stores/Action';
import { Event } from '../../../types/Event';
import { ProgressType, SidePanelAction } from '../../../types/Model';
import { ContentControlFormState } from '../types/Form';

import Presenter from './ContentControl.presenter';

function ContentControl() {

  const {
    dispatch,
    state: {
      loading,
      workFile
    }
  } = useStore();
  const { graph } = useService();
  const { setProgress } = useProgress();

  const form = useForm<ContentControlFormState>();

  const handleCancel = React.useCallback(() => {
    try {
      if (!workFile) {
        throw new Error();
      }
      dispatch(setWorkFile({
        ...workFile,
        editing: false
      }));
    } catch (e) {
      dispatch(setError(e as Error));
    }
  }, [
    dispatch,
    workFile
  ]);

  const handleChange = React.useCallback((_?: Event, data?: string) => {
    form.setValue('content', data || '');
  }, [
    form
  ]);

  const handleEdit = React.useCallback(() => {
    try {
      if (!workFile) {
        throw new Error();
      }
      dispatch(setWorkFile({
        ...workFile,
        editing: true
      }));
    } catch (e) {
      dispatch(setError(e as Error));
    }
  }, [
    dispatch,
    workFile
  ]);

  const handleOpenSidePanel = React.useCallback((_?: Event, data?: SidePanelAction) => {
    dispatch(setSidePanelAction(data));
  }, [
    dispatch
  ]);

  const handleSave = React.useCallback(async (_?: Event, data?: string) => {
    try {
      if (!workFile) {
        throw new Error();
      }
      setProgress(ProgressType.save);
      const file = await Promise.resolve()
        .then(() => graph.setFileContent(workFile, data || ''))
        .then((file) => file ? graph.getFileById(file.id) : undefined);
      if (!file) {
        throw new Error();
      }
      dispatch(setWorkFile({
        ...file,
        content: data || '',
        editing: false
      }));
    } catch (e) {
      dispatch(setError(e as Error));
    } finally {
      setProgress();
    }
  }, [
    dispatch,
    graph,
    setProgress,
    workFile
  ]);

  return (
    <Presenter
      form={form}
      loading={loading}
      value={workFile}
      onCancel={handleCancel}
      onChange={handleChange}
      onEdit={handleEdit}
      onOpenSidePanel={handleOpenSidePanel}
      onSave={handleSave} />
  );

}

export default ContentControl;
