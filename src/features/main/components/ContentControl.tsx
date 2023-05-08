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
import { setEditing, setError, setSidePanelAction, setWorkFile } from '../../../stores/Action';
import { Event } from '../../../types/Event';
import { SidePanelAction } from '../../../types/Model';

import Presenter from './ContentControl.presenter';

function ContentControl() {

  const {
    dispatch,
    state: {
      editing,
      loading,
      workFile
    }
  } = useStore();
  const { graph } = useService();

  const handleCancel = React.useCallback(() => {
    try {
      dispatch(setEditing(false));
    } catch (e) {
      dispatch(setError(e as Error));
    }
  }, [
    dispatch
  ]);

  const handleEdit = React.useCallback(() => {
    try {
      dispatch(setEditing(true));
    } catch (e) {
      dispatch(setError(e as Error));
    }
  }, [
    dispatch
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
      const file = await graph.setFileContent(workFile, data || '');
      if (!file) {
        throw new Error();
      }
      dispatch(setWorkFile(file));
    } catch (e) {
      dispatch(setError(e as Error));
    }
  }, [
    dispatch,
    graph,
    workFile
  ]);

  return (
    <Presenter
      editing={editing}
      loading={loading}
      value={workFile}
      onCancel={handleCancel}
      onEdit={handleEdit}
      onOpenSidePanel={handleOpenSidePanel}
      onSave={handleSave} />
  );

}

export default ContentControl;
