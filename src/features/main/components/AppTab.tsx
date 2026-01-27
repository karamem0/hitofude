//
// Copyright (c) 2023-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { useToast } from '../../../common/providers/ToastProvider';
import { useRoute } from '../../../providers/RouteProvider';
import { useService } from '../../../providers/ServiceProvider';
import { useStore } from '../../../providers/StoreProvider';
import {
  setContentFile,
  setContentLoading,
  setContentPreviewUrl,
  setContentText,
  setExplorerSelectedFile,
  setExplorerSelectedFolder,
  setSearchQuery,
  setSearchResultFiles,
  setSearchSelectedFile,
  setTabLoading
} from '../../../stores/Action';
import {
  DependencyNullError,
  FolderNotFoundError,
  InvalidOperationError
} from '../../../types/Error';
import { TabType } from '../../../types/Model';
import { isMarkdown } from '../../../utils/File';

import Presenter from './AppTab.presenter';

function AppTab() {

  const { route } = useRoute();
  const {
    dispatch,
    state: {
      explorerProps,
      tabProps = {
        loading: false,
        open: true,
        type: undefined
      }
    }
  } = useStore();
  const {
    graph,
    storage
  } = useService();
  const dispatchToast = useToast();
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
        .then(() => params.folder ? graph.getFolderById(params.folder) : Promise.reject(new FolderNotFoundError()))
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
      if (error instanceof Error) {
        dispatchToast(error, 'error');
      } else {
        throw error;
      }
    } finally {
      dispatch(setTabLoading(false));
    }
  }, [
    explorerProps?.allFiles,
    explorerProps?.rootFolder,
    explorerProps?.selectedFolder,
    graph,
    route,
    dispatch,
    dispatchToast
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
      if (error instanceof Error) {
        dispatchToast(error, 'error');
      } else {
        throw error;
      }
    } finally {
      dispatch(setTabLoading(false));
    }
  }, [
    graph,
    route,
    dispatch,
    dispatchToast
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
                file: storage.getExplorerFileId(),
                folder: storage.getExplorerFolderId() ?? rootFolder.id,
                tab: params.tab
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
        if (error instanceof Error) {
          dispatchToast(error, 'error');
        } else {
          throw error;
        }
      } finally {
        executionLock.current = false;
      }
    })();
  }, [
    explorerProps?.rootFolder,
    route,
    storage,
    dispatch,
    dispatchToast,
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
