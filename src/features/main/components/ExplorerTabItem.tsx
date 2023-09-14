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
  setExploreAllFiles,
  setContentFile,
  setContentText
} from '../../../stores/Action';
import { ArgumentNullError, DependencyNullError } from '../../../types/Error';
import { Event } from '../../../types/Event';
import {
  DialogAction,
  File,
  Folder
} from '../../../types/Model';
import { downloadFile, isSupportedFile } from '../../../utils/File';

import Presenter from './ExplorerTabItem.presenter';

function ExplorerTabItem() {

  const {
    dispatch,
    state: {
      exploreTabProps
    }
  } = useStore();
  const { graph } = useService();

  const handleDownloadFile = React.useCallback(async (_?: Event, data?: File) => {
    if (data?.fullName == null) {
      throw new ArgumentNullError();
    }
    downloadFile(data);
  }, []);

  const handleOpenDialog = React.useCallback((_?: Event, data?: DialogAction) => {
    dispatch(setDialogAction(data));
  }, [
    dispatch
  ]);

  const handleOpenUrl = React.useCallback((_?: Event, data?: string) => {
    if (data == null) {
      throw new ArgumentNullError();
    }
    window.open(data, '_blank', 'noreferrer');
  }, []);

  const handleRefreshFolder = React.useCallback(async (_?: Event, data?: Folder) => {
    try {
      if (data == null) {
        throw new ArgumentNullError();
      }
      dispatch(setExploreFolder(await graph.getFolderById(data.id)));
    } catch (e) {
      dispatch(setError(e as Error));
    }
  }, [
    graph,
    dispatch
  ]);

  const handleSelectFile = React.useCallback(async (_?: Event, data?: File) => {
    try {
      if (data == null) {
        throw new ArgumentNullError();
      }
      const exploreFile = exploreTabProps?.file;
      if (data.id === exploreFile?.id) {
        return;
      }
      dispatch(setExploreFile(data));
      dispatch(setContentFile(data));
      dispatch(setContentText(await graph.getFileText(data)));
    } catch (e) {
      dispatch(setError(e as Error));
    }
  }, [
    exploreTabProps?.file,
    graph,
    dispatch
  ]);

  const handleSelectFolder = React.useCallback(async (_?: Event, data?: string) => {
    try {
      if (data == null) {
        throw new ArgumentNullError();
      }
      const exploreAllFiles = exploreTabProps?.allFiles;
      if (exploreAllFiles == null) {
        throw new DependencyNullError();
      }
      const folder = await graph.getFolderById(data);
      dispatch(setExploreFolder(folder));
      const file = folder.files?.filter((item) => exploreAllFiles || isSupportedFile(item)).at(0);
      if (file != null) {
        dispatch(setExploreFile(file));
        dispatch(setContentFile(file));
        dispatch(setContentText(await graph.getFileText(file)));
      } else {
        dispatch(setExploreFile());
        dispatch(setContentFile());
      }
    } catch (e) {
      dispatch(setError(e as Error));
    }
  }, [
    exploreTabProps?.allFiles,
    graph,
    dispatch
  ]);

  const handleToggleExploreAllFiles = React.useCallback(async (_?: Event, data?: boolean) => {
    try {
      if (data == null) {
        throw new ArgumentNullError();
      }
      const exploreFile = exploreTabProps?.file;
      const exploreFolder = exploreTabProps?.folder;
      if (exploreFolder == null) {
        throw new DependencyNullError();
      }
      dispatch(setExploreAllFiles(data));
      const file = isSupportedFile(exploreFile) ? (
        exploreFolder.files?.filter((item) => isSupportedFile(item)).at(0)
      ) : (
        undefined
      );
      if (file != null) {
        dispatch(setExploreFile(file));
        dispatch(setContentFile(file));
        dispatch(setContentText(await graph.getFileText(file)));
      } else {
        dispatch(setExploreFile());
        dispatch(setContentFile());
      }
    } catch (e) {
      dispatch(setError(e as Error));
    }
  }, [
    exploreTabProps?.file,
    exploreTabProps?.folder,
    graph,
    dispatch
  ]);

  return (
    <Presenter
      {...exploreTabProps}
      onDownloadFile={handleDownloadFile}
      onOpenDialog={handleOpenDialog}
      onOpenUrl={handleOpenUrl}
      onRefreshFolder={handleRefreshFolder}
      onSelectFile={handleSelectFile}
      onSelectFolder={handleSelectFolder}
      onToggleExploreAllFiles={handleToggleExploreAllFiles} />
  );

}

export default ExplorerTabItem;
