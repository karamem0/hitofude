//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { useRoute } from '../../../providers/RouteProvider';
import { useStore } from '../../../providers/StoreProvider';
import { setDialogAction, setTabOpen } from '../../../stores/Action';
import { Event } from '../../../types/Event';
import { DialogAction, TabType } from '../../../types/Model';

import Presenter from './AppBar.presenter';

function AppBar() {

  const { route } = useRoute();
  const {
    dispatch,
    state: {
      explorerProps,
      searchProps,
      tabProps
    }
  } = useStore();

  const handleOpenDialog = React.useCallback((_: Event, data?: DialogAction) => {
    dispatch(setDialogAction(data));
  }, [
    dispatch
  ]);

  const handleToggleTab = React.useCallback((_: Event, data?: TabType) => {
    if (tabProps?.type === data) {
      dispatch(setTabOpen(!tabProps?.open));
    } else {
      switch (data) {
        case TabType.explorer:
          route.setParams({
            tab: data,
            folder: explorerProps?.selectedFolder?.id,
            file: explorerProps?.selectedFile?.id
          });
          break;
        case TabType.search:
          route.setParams({
            tab: data,
            search: searchProps?.query
          });
          break;
        default:
          break;
      }
    }
  }, [
    explorerProps?.selectedFile,
    explorerProps?.selectedFolder,
    searchProps?.query,
    tabProps?.open,
    tabProps?.type,
    route,
    dispatch
  ]);

  return (
    <Presenter
      tabLoading={tabProps?.loading}
      tabType={tabProps?.type}
      onOpenDialog={handleOpenDialog}
      onToggleTab={handleToggleTab} />
  );

}

export default AppBar;
