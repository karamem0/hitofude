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
  setDialogAction,
  setError,
  setWorkFile,
  setWorkFolder
} from '../../../stores/Action';
import {
  DialogAction,
  File,
  Folder
} from '../../../types/Model';

import Presenter from './ExplorerControl.presenter';

function ExplorerControl() {

  const {
    dispatch,
    state: {
      workFile,
      workFolder
    }
  } = useStore();
  const { graph } = useService();

  const handleOpenDialog = React.useCallback((_, data?: DialogAction) => {
    dispatch(setDialogAction(data));
  }, [
    dispatch
  ]);

  const handleOpenUrl = React.useCallback((_, data?: string) => {
    if (!data) {
      throw new Error();
    }
    window.open(data, '_blank', 'noreferrer');
  }, []);

  const handleRefreshFolder = React.useCallback(async (_, data?: Folder) => {
    try {
      if (!data) {
        throw new Error();
      }
      dispatch(setWorkFolder(await graph.getFolderById(data.id)));
    } catch (e) {
      dispatch(setError(e as Error));
    }
  }, [
    dispatch,
    graph
  ]);

  const handleSelectFile = React.useCallback(async (_, data?: File) => {
    try {
      if (!data) {
        throw new Error();
      }
      dispatch(setWorkFile({
        ...data,
        content: await graph.getFileContent(data)
      }));
    } catch (e) {
      dispatch(setError(e as Error));
    }
  }, [
    dispatch,
    graph
  ]);

  const handleSelectFolder = React.useCallback(async (_, data?: string) => {
    try {
      if (!data) {
        throw new Error();
      }
      const workFolder = await graph.getFolderById(data);
      dispatch(setWorkFolder(workFolder));
      const workFile = workFolder.files?.at(0);
      if (workFile) {
        dispatch(setWorkFile({
          ...workFile,
          content: await graph.getFileContent(workFile)
        }));
      } else {
        dispatch(setWorkFile());
      }
    } catch (e) {
      dispatch(setError(e as Error));
    }
  }, [
    dispatch,
    graph
  ]);

  return (
    <Presenter
      workFile={workFile}
      workFolder={workFolder}
      onOpenDialog={handleOpenDialog}
      onOpenUrl={handleOpenUrl}
      onRefreshFolder={handleRefreshFolder}
      onSelectFile={handleSelectFile}
      onSelectFolder={handleSelectFolder} />
  );

}

export default ExplorerControl;
