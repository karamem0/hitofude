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
import { setError, setLoading, setWorkFile, setWorkFolder } from '../../../stores/Action';
import { FileNotFoundError } from '../../../types/Error';
import { TabType } from '../../../types/Model';

import Presenter from './AppTabControl.presenter';

function AppTabControl() {

  const {
    dispatch,
    state: {
      tabMode = {
        type: TabType.explorer,
        open: true
      }
    }
  } = useStore();
  const { graph, storage } = useService();
  const [ tabOpen, setTabOpen ] = React.useState(tabMode.open);
  const [ tabType, setTabType ] = React.useState(tabMode.type);

  React.useEffect(() => {
    (async () => {
      switch (tabMode.type) {
        case TabType.explorer:
          try {
            dispatch(setLoading(true));
            const workFolderId = storage.getWorkFolderId();
            const workFolder = await Promise.resolve()
              .then(() => workFolderId ? graph.getFolderById(workFolderId) : Promise.reject(new FileNotFoundError()))
              .catch(() => graph.getRootFolder());
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
          } finally {
            dispatch(setLoading(false));
            setTabType(tabMode.type);
          }
          break;
        default:
          dispatch(setWorkFile());
          setTabType(tabMode.type);
          break;
      }
    })();
  }, [
    dispatch,
    graph,
    storage,
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
