//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { useStore } from '../../../providers/StoreProvider';
import { setDialogAction, setTabMode } from '../../../stores/Action';
import { Event } from '../../../types/Event';
import { DialogAction, TabType } from '../../../types/Model';

import Presenter from './AppBar.presenter';

function AppBar() {

  const {
    dispatch,
    state: {
      tabMode
    }
  } = useStore();

  const handleOpenDialog = React.useCallback((_?: Event, data?: DialogAction) => {
    dispatch(setDialogAction(data));
  }, [
    dispatch
  ]);

  const handleToggleTab = React.useCallback((_?: Event, data?: TabType) => {
    dispatch(setTabMode({
      type: data ?? TabType.explorer,
      open: data === tabMode?.type ? !tabMode?.open : true
    }));
  }, [
    tabMode,
    dispatch
  ]);

  return (
    <Presenter
      tabMode={tabMode}
      onOpenDialog={handleOpenDialog}
      onToggleTab={handleToggleTab} />
  );

}

export default AppBar;
