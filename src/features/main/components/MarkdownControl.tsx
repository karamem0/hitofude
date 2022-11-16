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
import { setEditMode, setWorkFile } from '../../../stores/Action';
import { EventHandler } from '../../../types/Event';

import Presenter from './MarkdownControl.presenter';

interface MarkdownControlProps {
  onError?: EventHandler<unknown>
}

function MarkdownControl(props: MarkdownControlProps) {

  const { onError } = props;

  const {
    dispatch,
    state: {
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
        editMode: false
      }));
    } catch (e) {
      onError?.({}, e as Error);
    }
  }, [
    dispatch,
    graph,
    onError,
    workFile
  ]);

  const handleCancel = React.useCallback(() => {
    dispatch(setEditMode(false));
  }, [
    dispatch
  ]);

  const handleEdit = React.useCallback(() => {
    dispatch(setEditMode(true));
  }, [
    dispatch
  ]);

  return (
    <Presenter
      workFile={workFile}
      workFolder={workFolder}
      onCancel={handleCancel}
      onEdit={handleEdit}
      onSave={handleSave} />
  );

}

export default MarkdownControl;
