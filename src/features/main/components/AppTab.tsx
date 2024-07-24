//
// Copyright (c) 2023-2024 karamem0
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
  setContentFile,
  setContentLoading,
  setContentText,
  setError,
  setExploreFile,
  setExploreFolder,
  setTabLoading,
  setSearchFile,
  setSearchQuery,
  setsearchFiles
} from '../../../stores/Action';
import { DependencyNullError, FileNotFoundError, InvalidOperationError } from '../../../types/Error';
import { TabType } from '../../../types/Model';

import Presenter from './AppTab.presenter';

function AppTab() {

  const { route } = useRoute();
  const {
    dispatch,
    state: {
      explorerProps,
      tabProps = {
        loading: false,
        type: undefined,
        open: true
      }
    }
  } = useStore();
  const { graph, storage } = useService();
  const [ tabOpen, setTabOpen ] = React.useState(tabProps.open);
  const [ tabType, setTabType ] = React.useState(tabProps.type);

  const handleExplorerOpen = React.useCallback(async () => {
    try {
      dispatch(setTabLoading(true));
      const rootFolder = explorerProps?.rootFolder;
      if (rootFolder == null) {
        throw new DependencyNullError();
      }
      const params = route.getParams();
      if (params.tab !== TabType.explorer) {
        throw new InvalidOperationError();
      }
      const folder = await Promise.resolve()
        .then(() => params.folder ? graph.getFolderById(params.folder) : Promise.reject(new FileNotFoundError()))
        .catch(() => rootFolder);
      dispatch(setExploreFolder(folder));
      const file = folder?.files?.filter((item) => item.id === params.file)?.at(0);
      if (file != null) {
        try {
          dispatch(setContentLoading(true));
          dispatch(setExploreFile(file));
          dispatch(setContentFile(file));
          dispatch(setContentText(await graph.getFileText(file)));
        } finally {
          dispatch(setContentLoading(false));
        }
      } else {
        dispatch(setExploreFile());
        dispatch(setContentFile());
      }
    } catch (e) {
      dispatch(setError(e as Error));
    } finally {
      dispatch(setTabLoading(false));
    }
  }, [
    explorerProps?.rootFolder,
    graph,
    route,
    dispatch
  ]);

  const handleSearchOpen = React.useCallback(async () => {
    try {
      dispatch(setTabLoading(true));
      const params = route.getParams();
      if (params.tab !== TabType.search) {
        throw new InvalidOperationError();
      }
      if (params.search != null) {
        dispatch(setSearchQuery(params.search));
        dispatch(setsearchFiles(await graph.searchFiles(params.search)));
      } else {
        dispatch(setSearchQuery());
        dispatch(setsearchFiles());
      }
      if (params.file != null) {
        try {
          dispatch(setContentLoading(true));
          const file = await graph.getFileById(params.file);
          dispatch(setSearchFile(file));
          dispatch(setContentFile(file));
          dispatch(setContentText(await graph.getFileText(file)));
        } finally {
          dispatch(setContentLoading(false));
        }
      } else {
        dispatch(setSearchFile());
        dispatch(setContentFile());
      }
    } catch (e) {
      dispatch(setError(e as Error));
    } finally {
      dispatch(setTabLoading(false));
    }
  }, [
    graph,
    route,
    dispatch
  ]);

  React.useEffect(() => {
    (async () => {
      try {
        const params = route.getParams();
        switch (params.tab) {
          case TabType.explorer: {
            const rootFolder = explorerProps?.rootFolder;
            if (rootFolder == null) {
              throw new DependencyNullError();
            }
            if (params.folder == null) {
              route.setParams({
                tab: params.tab,
                folder: storage.getExploreFolderId() ?? rootFolder.id,
                file: storage.getExploreFileId()
              });
            } else {
              await handleExplorerOpen();
            }
            break;
          }
          case TabType.search: {
            await handleSearchOpen();
            break;
          }
          default:
            route.setParams({
              tab: TabType.explorer
            });
        }
        setTabType(params.tab);
      } catch (e) {
        dispatch(setError(e as Error));
      }
    })();
  }, [
    explorerProps?.rootFolder,
    route,
    storage,
    dispatch,
    handleExplorerOpen,
    handleSearchOpen
  ]);

  React.useEffect(() => {
    setTabOpen(tabProps.open);
  }, [
    tabProps.open
  ]);

  return (
    <Presenter
      tabOpen={tabOpen}
      tabType={tabType} />
  );

}

export default AppTab;
