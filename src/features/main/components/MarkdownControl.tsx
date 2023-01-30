//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { useService } from '../../../providers/ServiceProvider';
import { useStore } from '../../../providers/StoreProvider';
import { setError, setWorkFile } from '../../../stores/Action';

import Presenter from './MarkdownControl.presenter';

function MarkdownControl() {

  const {
    dispatch,
    state: {
      loading,
      workFile,
      workFolder
    }
  } = useStore();
  const { graph } = useService();

  const handleSave = React.useCallback(async (_, data?: string) => {
    try {
      if (!workFile) {
        throw new Error();
      }
      const file = await graph.setFileContent(workFile, data || '');
      if (!file) {
        throw new Error();
      }
      dispatch(setWorkFile({
        ...file,
        content: data,
        editing: false
      }));
    } catch (e) {
      dispatch(setError(e as Error));
    }
  }, [
    dispatch,
    graph,
    workFile
  ]);

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

  return (
    <Presenter
      loading={loading}
      workFile={workFile}
      workFolder={workFolder}
      onCancel={handleCancel}
      onEdit={handleEdit}
      onSave={handleSave} />
  );

}

export default MarkdownControl;
