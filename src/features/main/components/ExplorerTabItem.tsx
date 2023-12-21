//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { useRoute } from '../../../providers/RouteProvider';
import { useService } from '../../../providers/ServiceProvider';
import { useStore } from '../../../providers/StoreProvider';
import {
  setDialogAction,
  setError,
  setExploreFolder,
  setExploreAllFiles
} from '../../../stores/Action';
import { ArgumentNullError, DependencyNullError } from '../../../types/Error';
import { Event } from '../../../types/Event';
import {
  DialogAction,
  File,
  Folder,
  TabType
} from '../../../types/Model';
import { downloadFile, isSupportedFile } from '../../../utils/File';

import Presenter from './ExplorerTabItem.presenter';

function ExplorerTabItem() {

  const { route } = useRoute();
  const {
    dispatch,
    state: {
      explorerProps
    }
  } = useStore();
  const { graph } = useService();

  const handleDownloadFile = React.useCallback(async (_?: Event, data?: File) => {
    try {
      if (data?.fullName == null) {
        throw new ArgumentNullError();
      }
      downloadFile(data);
    } catch (e) {
      dispatch(setError(e as Error));
    }
  }, [
    dispatch
  ]);

  const handleOpenDialog = React.useCallback((_?: Event, data?: DialogAction) => {
    try {
      dispatch(setDialogAction(data));
    } catch (e) {
      dispatch(setError(e as Error));
    }
  }, [
    dispatch
  ]);

  const handleOpenUrl = React.useCallback((_?: Event, data?: string) => {
    try {
      if (data == null) {
        throw new ArgumentNullError();
      }
      window.open(data, '_blank', 'noreferrer');
    } catch (e) {
      dispatch(setError(e as Error));
    }
  }, [
    dispatch
  ]);

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
      const folder = explorerProps?.folder;
      if (folder == null) {
        throw new DependencyNullError();
      }
      const file = explorerProps?.file;
      if (data.id === file?.id) {
        return;
      }
      route.setParams({
        tab: TabType.explorer,
        folder: folder.id,
        file: data.id
      });
    } catch (e) {
      dispatch(setError(e as Error));
    }
  }, [
    explorerProps?.folder,
    explorerProps?.file,
    route,
    dispatch
  ]);

  const handleSelectFolder = React.useCallback(async (_?: Event, data?: string) => {
    try {
      if (data == null) {
        throw new ArgumentNullError();
      }
      const allFiles = explorerProps?.allFiles;
      if (allFiles == null) {
        throw new DependencyNullError();
      }
      const folder = await graph.getFolderById(data);
      dispatch(setExploreFolder(folder));
      const file = folder.files?.filter((item) => allFiles || isSupportedFile(item)).at(0);
      route.setParams({
        tab: TabType.explorer,
        folder: folder.id,
        file: file?.id
      });
    } catch (e) {
      dispatch(setError(e as Error));
    }
  }, [
    explorerProps?.allFiles,
    graph,
    route,
    dispatch
  ]);

  const handleToggleExploreAllFiles = React.useCallback(async (_?: Event, data?: boolean) => {
    try {
      if (data == null) {
        throw new ArgumentNullError();
      }
      dispatch(setExploreAllFiles(data));
      const folder = explorerProps?.folder;
      if (folder == null) {
        throw new DependencyNullError();
      }
      const files = folder?.files;
      const file = files?.filter((item) => isSupportedFile(explorerProps?.file) && isSupportedFile(item)).at(0);
      route.setParams({
        tab: TabType.explorer,
        folder: folder.id,
        file: file?.id
      });
    } catch (e) {
      dispatch(setError(e as Error));
    }
  }, [
    explorerProps?.file,
    explorerProps?.folder,
    route,
    dispatch
  ]);

  return (
    <Presenter
      {...explorerProps}
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
