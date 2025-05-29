//
// Copyright (c) 2023-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import {
  DependencyNullError,
  FileNotFoundError,
  InvalidOperationError
} from '../../../types/Error';
import {
  setContentFile,
  setContentLoading,
  setContentPreviewUrl,
  setContentText,
  setError,
  setExplorerSelectedFile,
  setExplorerSelectedFolder,
  setSearchQuery,
  setSearchResultFiles,
  setSearchSelectedFile,
  setTabLoading
} from '../../../stores/Action';
import { TabType } from '../../../types/Model';
import { useRoute } from '../../../providers/RouteProvider';
import { useService } from '../../../providers/ServiceProvider';
import { useStore } from '../../../providers/StoreProvider';

import Presenter from './AppTab.presenter';
import { isMarkdown } from '../../../utils/File';

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

  const executionLock = React.useRef<boolean>(false);

  const handleExplorerOpen = React.useCallback(async () => {
    try {
      dispatch(setTabLoading(true));
      const params = route.getParams();
      if (params.tab !== TabType.explorer) {
        throw new InvalidOperationError();
      }
      const folder = explorerProps?.selectedFolder?.id === params.folder ? explorerProps?.selectedFolder : await Promise.resolve()
        .then(() => params.folder ? graph.getFolderById(params.folder) : Promise.reject(new FileNotFoundError()))
        .catch(() => explorerProps?.rootFolder);
      dispatch(setExplorerSelectedFolder(folder));
      const files = folder?.files ?? [];
      const file = params.file? files.find((item) => item.id === params.file): files.find((item) => explorerProps?.allFiles || isMarkdown(item));
      if (file != null) {
        try {
          dispatch(setContentLoading(true));
          dispatch(setExplorerSelectedFile(file));
          dispatch(setContentFile(file));
          if (isMarkdown(file)) {
            dispatch(setContentText(await graph.getFileText(file)));
            dispatch(setContentPreviewUrl());
          } else {
            dispatch(setContentText());
            dispatch(setContentPreviewUrl(await graph.getFilePreviewUrl(file)));
          }
        } finally {
          dispatch(setContentLoading(false));
        }
      } else {
        dispatch(setExplorerSelectedFile());
        dispatch(setContentFile());
      }
    } catch (error) {
      dispatch(setError(error as Error));
    } finally {
      dispatch(setTabLoading(false));
    }
  }, [
    explorerProps?.allFiles,
    explorerProps?.rootFolder,
    explorerProps?.selectedFolder,
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
        dispatch(setSearchResultFiles(await graph.searchFiles(params.search)));
      } else {
        dispatch(setSearchQuery());
        dispatch(setSearchResultFiles());
      }
      if (params.file != null) {
        try {
          dispatch(setContentLoading(true));
          const file = await graph.getFileById(params.file);
          dispatch(setSearchSelectedFile(file));
          dispatch(setContentFile(file));
          dispatch(setContentText(await graph.getFileText(file)));
        } finally {
          dispatch(setContentLoading(false));
        }
      } else {
        dispatch(setSearchSelectedFile());
        dispatch(setContentFile());
      }
    } catch (error) {
      dispatch(setError(error as Error));
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
      if (executionLock.current) {
        return;
      }
      try {
        executionLock.current = true;
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
                folder: storage.getExplorerFolderId() ?? rootFolder.id,
                file: storage.getExplorerFileId()
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
      } catch (error) {
        dispatch(setError(error as Error));
      } finally {
        executionLock.current = false;
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
