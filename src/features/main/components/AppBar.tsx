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
import {
  AppBarMenuAction,
  AppBarMenuType,
  DialogType,
  TabType
} from '../../../types/Model';

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

  const ref = React.useRef<HTMLDivElement>(null);

  const handleMenuClick = React.useCallback((_: Event, data?: AppBarMenuAction) => {
    switch (data?.type) {
      case AppBarMenuType.changeTheme: {
        dispatch(setDialogAction({
          type: DialogType.changeTheme,
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
        const { current: element } = ref;
        const items = element?.querySelectorAll('button');
        if (items == null) {
          break;
        }
        for (let i = 0; i < items?.length - 1; i++) {
          if (items[i] === document.activeElement) {
            items[i + 1].focus();
            break;
          }
        }
        break;
      }
      case 'ArrowUp': {
        const { current: element } = ref;
        const items = element?.querySelectorAll('button');
        if (items == null) {
          break;
        }
        for (let i = 1; i < items?.length; i++) {
          if (items[i] === document.activeElement) {
            items[i - 1].focus();
            break;
          }
        }
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
