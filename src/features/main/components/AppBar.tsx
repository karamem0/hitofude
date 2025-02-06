//
// Copyright (c) 2023-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { AppBarMenuAction, TabType } from '../../../types/Model';
import { moveNext, movePrevious } from '../../../utils/Keyboard';
import { setDialogAction, setTabOpen } from '../../../stores/Action';
import { Event } from '../../../types/Event';
import Presenter from './AppBar.presenter';
import { useRoute } from '../../../providers/RouteProvider';
import { useStore } from '../../../providers/StoreProvider';

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
  const ref = React.useRef<HTMLDivElement>(null);

  const handleMenuClick = React.useCallback((_: Event, data?: AppBarMenuAction) => {
    switch (data?.type) {
      case 'changeTheme': {
        dispatch(setDialogAction({
          type: 'changeTheme',
          data: undefined
        }));
        break;
      }
      default:
        break;
    }
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

  const handleKeyDown = React.useCallback((event: Event) => {
    const { key } = event as KeyboardEvent;
    switch (key) {
      case 'ArrowDown': {
        moveNext(ref.current, 'button');
        break;
      }
      case 'ArrowUp': {
        movePrevious(ref.current, 'button');
        break;
      }
      default:
        break;
    }
  }, []);

  return (
    <Presenter
      ref={ref}
      onKeyDown={handleKeyDown}
      onMenuClick={handleMenuClick}
      onToggleTab={handleToggleTab} />
  );

}

export default AppBar;
