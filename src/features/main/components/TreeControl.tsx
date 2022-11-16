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
import {
  setTabMode,
  setWorkFile,
  setWorkFolder
} from '../../../stores/Action';
import { EventHandler } from '../../../types/Event';
import { File } from '../../../types/Model';
import { DialogAction } from '../types/Dialog';

import Presenter from './TreeControl.presenter';

interface TreeControlProps {
  onOpenDialog?: EventHandler<DialogAction>,
  onError?: EventHandler<unknown>
}

function TreeControl(props: TreeControlProps) {

  const {
    onOpenDialog,
    onError
  } = props;

  const {
    dispatch,
    state: {
      tabMode,
      workFile,
      workFolder
    }
  } = useStore();
  const { graph, storage } = useService();

  const handleOpenUrl = React.useCallback((_, data?: string) => {
    if (!data) {
      throw new Error();
    }
    window.open(data, '_blank');
  }, []);

  const handleSelectFile = React.useCallback(async (_, data?: File) => {
    try {
      if (!data) {
        throw new Error();
      }
      const content = await graph.getFileContent(data);
      dispatch(setWorkFile({
        ...data,
        content
      }));
    } catch (e) {
      onError?.({}, e as Error);
    }
  }, [
    dispatch,
    graph,
    onError
  ]);

  const handleSelectFolder = React.useCallback(async (_, data?: string) => {
    try {
      if (!data) {
        throw new Error();
      }
      const workFolder = await graph.getFolderById(data);
      storage.setWorkFolderId(workFolder?.id);
      dispatch(setWorkFolder(workFolder));
      const workFile = workFolder.files?.at(0);
      if (workFile) {
        dispatch(setWorkFile({
          ...workFile,
          content: await graph.getFileContent(workFile)
        }));
      } else {
        dispatch(setWorkFile(undefined));
      }
    } catch (e) {
      onError?.({}, e as Error);
    }
  }, [
    graph,
    dispatch,
    onError,
    storage
  ]);

  const handleToggleTab = React.useCallback((_, data?: boolean) => {
    storage.setTabMode(data);
    dispatch(setTabMode(data));
  }, [
    dispatch,
    storage
  ]);

  return (
    <Presenter
      tabMode={tabMode}
      workFile={workFile}
      workFolder={workFolder}
      onOpenDialog={onOpenDialog}
      onOpenUrl={handleOpenUrl}
      onSelectFile={handleSelectFile}
      onSelectFolder={handleSelectFolder}
      onToggleTab={handleToggleTab} />
  );

}

export default TreeControl;
