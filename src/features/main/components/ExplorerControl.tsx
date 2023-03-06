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
  setExploreFile,
  setExploreFolder,
  setIncludeUnsupportedFiles,
  setWorkFile
} from '../../../stores/Action';
import { Event } from '../../../types/Event';
import {
  DialogAction,
  File,
  Folder
} from '../../../types/Model';
import { isSupportedFile } from '../../../utils/File';

import Presenter from './ExplorerControl.presenter';

function ExplorerControl() {

  const {
    dispatch,
    state: {
      includeUnsupportedFiles,
      exploreFile,
      exploreFolder
    }
  } = useStore();
  const { graph } = useService();

  const handleOpenDialog = React.useCallback((_?: Event, data?: DialogAction) => {
    dispatch(setDialogAction(data));
  }, [
    dispatch
  ]);

  const handleOpenUrl = React.useCallback((_?: Event, data?: string) => {
    if (!data) {
      throw new Error();
    }
    window.open(data, '_blank', 'noreferrer');
  }, []);

  const handleRefreshFolder = React.useCallback(async (_?: Event, data?: Folder) => {
    try {
      if (!data) {
        throw new Error();
      }
      dispatch(setExploreFolder(await graph.getFolderById(data.id)));
    } catch (e) {
      dispatch(setError(e as Error));
    }
  }, [
    dispatch,
    graph
  ]);

  const handleToggleIncludeUnsupportedFiles = React.useCallback(async (_?: Event, data?: boolean) => {
    try {
      if (!exploreFolder) {
        throw new Error();
      }
      dispatch(setIncludeUnsupportedFiles(data));
      if (!data) {
        if (!exploreFile || !isSupportedFile(exploreFile)) {
          const file = exploreFolder.files?.filter((item) => isSupportedFile(item)).at(0);
          if (file) {
            dispatch(setExploreFile(file));
            dispatch(setWorkFile({
              ...file,
              content: await graph.getFileContent(file)
            }));
          } else {
            dispatch(setExploreFile());
            dispatch(setWorkFile());
          }
        }
      }
    } catch (e) {
      dispatch(setError(e as Error));
    }
  }, [
    dispatch,
    exploreFile,
    exploreFolder,
    graph
  ]);

  const handleSelectFile = React.useCallback(async (_?: Event, data?: File) => {
    try {
      if (!data) {
        throw new Error();
      }
      dispatch(setExploreFile(data));
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

  const handleSelectFolder = React.useCallback(async (_?: Event, data?: string) => {
    try {
      if (!data) {
        throw new Error();
      }
      const exploreFolder = await graph.getFolderById(data);
      dispatch(setExploreFolder(exploreFolder));
      const exploreFile = exploreFolder.files?.filter((item) => isSupportedFile(item)).at(0);
      if (exploreFile) {
        dispatch(setExploreFile(exploreFile));
        dispatch(setWorkFile({
          ...exploreFile,
          content: await graph.getFileContent(exploreFile)
        }));
      } else {
        dispatch(setExploreFile());
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
      exploreFile={exploreFile}
      exploreFolder={exploreFolder}
      includeUnsupportedFiles={includeUnsupportedFiles}
      onOpenDialog={handleOpenDialog}
      onOpenUrl={handleOpenUrl}
      onRefreshFolder={handleRefreshFolder}
      onSelectFile={handleSelectFile}
      onSelectFolder={handleSelectFolder}
      onToggleIncludeUnsupportedFiles={handleToggleIncludeUnsupportedFiles} />
  );

}

export default ExplorerControl;
