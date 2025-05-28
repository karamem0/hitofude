//
// Copyright (c) 2023-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import {
  ArgumentNullError,
  DependencyNullError,
  FileConflictError,
  FileNotFoundError
} from '../../../types/Error';
import {
  appendExplorerFile,
  appendExplorerFileConflict,
  setDialogAction,
  setError,
  setExplorerSelectedFile
} from '../../../stores/Action';
import { DropEventData } from '../types/Event';
import { Event } from '../../../types/Event';
import Presenter from './ExplorerTabPanel.presenter';
import { TabType } from '../../../types/Model';
import { fromFile } from '../../../utils/Blob';
import { useProgress } from '../../../common/providers/ProgressProvider';
import { useRoute } from '../../../providers/RouteProvider';
import { useService } from '../../../providers/ServiceProvider';
import { useStore } from '../../../providers/StoreProvider';

function ExplorerTabPanel() {

  const { route } = useRoute();
  const {
    dispatch,
    state: {
      explorerProps
    }
  } = useStore();
  const { graph } = useService();
  const { setProgress } = useProgress();

  const handleDropFiles = React.useCallback(async (_: Event, data?: DropEventData) => {
    try {
      const folder = explorerProps?.selectedFolder;
      if (data == null) {
        throw new ArgumentNullError();
      }
      if (folder == null) {
        throw new DependencyNullError();
      }
      setProgress('upload');
      for (const acceptedFile of data.acceptedFiles) {
        const fileName = acceptedFile.name;
        const fileBlob = fromFile(acceptedFile);
        try {
          const file = await Promise.resolve()
            .then(() => graph.createFile(folder, fileName, fileBlob))
            .then((file) => graph.getFileById(file.id));
          dispatch(appendExplorerFile(file));
          route.setParams({
            tab: TabType.explorer,
            folder: folder.id,
            file: file?.id
          });
        } catch (error) {
          if (error instanceof FileConflictError) {
            const file = folder.files?.find((item) => item.fullName === fileName);
            if (file == null) {
              throw new FileNotFoundError();
            }
            dispatch(appendExplorerFileConflict({
              id: file.id,
              name: fileName,
              data: fileBlob
            }));
          } else {
            throw error;
          }
        }
      }
      setProgress();
    } catch (error) {
      dispatch(setError(error as Error));
    }
  }, [
    explorerProps?.selectedFolder,
    graph,
    route,
    dispatch,
    setProgress
  ]);

  const handleCreateFile = React.useCallback(() => {
    dispatch(setDialogAction({
      type: 'createFile',
      data: undefined
    }));
  }, [
    dispatch
  ]);

  const handleSelectFile = React.useCallback(async (_: Event, data?: string) => {
    try {
      if (data == null) {
        throw new ArgumentNullError();
      }
      const selectedFolder = explorerProps?.selectedFolder;
      if (selectedFolder == null) {
        throw new DependencyNullError();
      }
      const selectedFile = explorerProps?.selectedFile;
      if (data === selectedFile?.id) {
        return;
      }
      const file = selectedFolder.files?.find((item) => item.id === data);
      dispatch(setExplorerSelectedFile(file));
      route.setParams({
        tab: TabType.explorer,
        folder: selectedFolder.id,
        file: file?.id
      });
    } catch (error) {
      dispatch(setError(error as Error));
    }
  }, [
    explorerProps?.selectedFolder,
    explorerProps?.selectedFile,
    route,
    dispatch
  ]);

  const handleSelectFolder = React.useCallback(async (_: Event, data?: string) => {
    try {
      if (data == null) {
        throw new ArgumentNullError();
      }
      route.setParams({
        tab: TabType.explorer,
        folder: data
      });
    } catch (error) {
      dispatch(setError(error as Error));
    }
  }, [
    route,
    dispatch
  ]);

  return (
    <Presenter
      {...explorerProps}
      onCreateFile={handleCreateFile}
      onDropFiles={handleDropFiles}
      onSelectFile={handleSelectFile}
      onSelectFolder={handleSelectFolder} />
  );

}

export default ExplorerTabPanel;
