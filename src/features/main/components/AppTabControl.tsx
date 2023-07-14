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
  setError,
  setLoading,
  setExploreFile,
  setExploreFolder,
  setWorkFile,
  setSearchFile
} from '../../../stores/Action';
import { FileNotFoundError } from '../../../types/Error';
import { TabType } from '../../../types/Model';

import Presenter from './AppTabControl.presenter';

function AppTabControl() {

  const {
    dispatch,
    state: {
      rootFolder,
      tabMode = {
        type: TabType.explorer,
        open: true
      }
    }
  } = useStore();
  const { graph, storage } = useService();
  const [ tabOpen, setTabOpen ] = React.useState(tabMode.open);
  const [ tabType, setTabType ] = React.useState(tabMode.type);

  const handleExplorerOpen = React.useCallback(async () => {
    const exploreFolderId = storage.getExploreFolderId();
    const exploreFileId = storage.getExploreFileId();
    const exploreFolder = await Promise.resolve()
      .then(() => exploreFolderId ? graph.getFolderById(exploreFolderId) : Promise.reject(new FileNotFoundError()))
      .catch(() => rootFolder);
    const exploreFile = exploreFolder?.files?.filter((item) => item.id === exploreFileId)?.at(0);
    dispatch(setExploreFolder(exploreFolder));
    if (exploreFile != null) {
      dispatch(setExploreFile(exploreFile));
      dispatch(setWorkFile({
        ...exploreFile,
        content: await graph.getFileContent(exploreFile),
        editing: false
      }));
    } else {
      dispatch(setExploreFile());
      dispatch(setWorkFile());
    }
  }, [
    dispatch,
    graph,
    rootFolder,
    storage
  ]);

  const handleSearchOpen = React.useCallback(async () => {
    dispatch(setSearchFile());
    dispatch(setWorkFile());
    await Promise.resolve();
  }, [
    dispatch
  ]);

  React.useEffect(() => {
    (async () => {
      try {
        dispatch(setLoading(true));
        switch (tabMode.type) {
          case TabType.explorer: {
            await handleExplorerOpen();
            break;
          }
          case TabType.search: {
            await handleSearchOpen();
            break;
          }
          default:
            break;
        }
        setTabType(tabMode.type);
      } catch (e) {
        dispatch(setError(e as Error));
      } finally {
        dispatch(setLoading(false));
      }
    })();
  }, [
    dispatch,
    handleExplorerOpen,
    handleSearchOpen,
    tabMode.type
  ]);

  React.useEffect(() => {
    setTabOpen(tabMode.open);
  }, [
    tabMode.open
  ]);

  return (
    <Presenter
      tabMode={{
        type: tabType,
        open: tabOpen
      }} />
  );

}

export default AppTabControl;
