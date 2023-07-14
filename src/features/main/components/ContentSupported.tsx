//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { useProgress } from '../../../providers/ProgressProvider';
import { useService } from '../../../providers/ServiceProvider';
import { useStore } from '../../../providers/StoreProvider';
import {
  setError,
  setMinimapEnabled,
  setSidePanelAction,
  setWorkFile
} from '../../../stores/Action';
import { Event } from '../../../types/Event';
import {
  File,
  FileContent,
  ProgressType,
  SidePanelAction
} from '../../../types/Model';

import Presenter from './ContentSupported.presenter';

interface ContentSupportedProps {
  value?: File & FileContent
}

function ContentSupported(props: ContentSupportedProps) {

  const {
    value
  } = props;

  const {
    dispatch,
    state: {
      minimapEnabled
    }
  } = useStore();
  const { graph } = useService();
  const { setProgress } = useProgress();

  const [ changed, setChanged ] = React.useState<boolean>(false);
  const [ content, setContent ] = React.useState<string>('');

  const handleCancel = React.useCallback(() => {
    try {
      if (value == null) {
        throw new Error();
      }
      dispatch(setWorkFile({
        ...value,
        editing: false
      }));
    } catch (e) {
      dispatch(setError(e as Error));
    }
  }, [
    dispatch,
    value
  ]);

  const handleChange = React.useCallback((_?: Event, data?: string) => {
    setContent(data ?? '');
  }, []);

  const handleEdit = React.useCallback(() => {
    try {
      if (value == null) {
        throw new Error();
      }
      dispatch(setWorkFile({
        ...value,
        editing: true
      }));
    } catch (e) {
      dispatch(setError(e as Error));
    }
  }, [
    dispatch,
    value
  ]);

  const handleOpenSidePanel = React.useCallback((_?: Event, data?: SidePanelAction) => {
    dispatch(setSidePanelAction(data));
  }, [
    dispatch
  ]);

  const handleToggleMinimapEnabled = React.useCallback((_?: Event, data?: boolean) => {
    dispatch(setMinimapEnabled(data));
  }, [
    dispatch
  ]);

  const handleSave = React.useCallback(async (_?: Event, data?: boolean) => {
    try {
      if (value == null) {
        throw new Error();
      }
      setProgress(ProgressType.save);
      const file = await Promise.resolve()
        .then(() => graph.setFileContent(value, content))
        .then((file) => file ? graph.getFileById(file.id) : undefined);
      if (file == null) {
        throw new Error();
      }
      dispatch(setWorkFile({
        ...file,
        content,
        editing: data ?? false
      }));
    } catch (e) {
      dispatch(setError(e as Error));
    } finally {
      setProgress();
    }
  }, [
    content,
    dispatch,
    graph,
    setProgress,
    value
  ]);

  React.useEffect(() => {
    setContent(value?.content ?? '');
  }, [
    value
  ]);

  React.useEffect(() => {
    setChanged(value?.content !== content);
  }, [
    value?.content,
    content
  ]);

  return (
    <Presenter
      changed={changed}
      minimapEnabled={minimapEnabled}
      value={value}
      onCancel={handleCancel}
      onChange={handleChange}
      onEdit={handleEdit}
      onOpenSidePanel={handleOpenSidePanel}
      onSave={handleSave}
      onToggleMinimapEnabled={handleToggleMinimapEnabled} />
  );

}

export default ContentSupported;
