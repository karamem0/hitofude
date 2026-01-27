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
import { useRoute } from '../../../providers/RouteProvider';
import { useService } from '../../../providers/ServiceProvider';
import { useStore } from '../../../providers/StoreProvider';
import {
  appendExplorerFile,
  appendExplorerFileConflict,
  setDialogAction,
  setExplorerSelectedFile
} from '../../../stores/Action';
import {
  ArgumentNullError,
  DependencyNullError,
  FileConflictError,
  FileNotFoundError
} from '../../../types/Error';
import { Event } from '../../../types/Event';
import { TabType } from '../../../types/Model';
import { fromFile } from '../../../utils/Blob';
import { DropEventData } from '../types/Event';

import Presenter from './ExplorerTabPanel.presenter';

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
  const dispatchToast = useToast();

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
        await Promise.resolve()
          .then(() => graph.createFile(folder, fileName, fileBlob))
          .then((file) => graph.getFileById(file.id))
          .then((file) => {
            dispatch(appendExplorerFile(file));
            route.setParams({
              file: file?.id,
              folder: folder.id,
              tab: TabType.explorer
            });
          })
          .catch((error) => {
            if (error instanceof FileConflictError) {
              const file = folder.files?.find((item) => item.fullName === fileName);
              if (file == null) {
                throw new FileNotFoundError();
              }
              dispatch(appendExplorerFileConflict({
                data: fileBlob,
                id: file.id,
                name: fileName
              }));
            } else {
              throw error;
            }
          });
      }
      setProgress();
    } catch (error) {
      if (error instanceof Error) {
        dispatchToast(error, 'error');
      } else {
        throw error;
      }
    }
  }, [
    explorerProps?.selectedFolder,
    graph,
    route,
    dispatch,
    dispatchToast,
    setProgress
  ]);

  const handleCreateFile = React.useCallback(() => {
    dispatch(setDialogAction({
      data: undefined,
      type: 'createFile'
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
        file: file?.id,
        folder: selectedFolder.id,
        tab: TabType.explorer
      });
    } catch (error) {
      if (error instanceof Error) {
        dispatchToast(error, 'error');
      } else {
        throw error;
      }
    }
  }, [
    explorerProps?.selectedFolder,
    explorerProps?.selectedFile,
    route,
    dispatch,
    dispatchToast
  ]);

  const handleSelectFolder = React.useCallback(async (_: Event, data?: string) => {
    try {
      if (data == null) {
        throw new ArgumentNullError();
      }
      route.setParams({
        folder: data,
        tab: TabType.explorer
      });
    } catch (error) {
      if (error instanceof Error) {
        dispatchToast(error, 'error');
      } else {
        throw error;
      }
    }
  }, [
    route,
    dispatchToast
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
