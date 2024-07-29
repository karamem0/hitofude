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
import { setError } from '../../../stores/Action';
import { ArgumentNullError, FolderNotFoundError } from '../../../types/Error';
import { Event } from '../../../types/Event';
import {
  File,
  SearchMenuAction,
  SearchMenuType,
  TabType
} from '../../../types/Model';

import Presenter from './SearchFileTreeItem.presenter';

function SearchFileTreeItem() {

  const { route } = useRoute();
  const {
    dispatch,
    state: {
      searchProps
    }
  } = useStore();
  const { graph } = useService();

  const handleMenuClick = React.useCallback(async (_: Event, data?: SearchMenuAction) => {
    switch (data?.type) {
      case SearchMenuType.openFileLocation: {
        try {
          const value = data?.data as string;
          if (value == null) {
            throw new ArgumentNullError();
          }
          const file = await graph.getFileById(value);
          if (file.parentId == null) {
            throw new FolderNotFoundError();
          }
          const folder = await graph.getFolderById(file.parentId);
          route.setParams({
            tab: TabType.explorer,
            folder: folder.id,
            file: value
          });
        } catch (error) {
          dispatch(setError(error as Error));
        }
        break;
      }
      default:
        break;
    }
  }, [
    graph,
    route,
    dispatch
  ]);

  const handleClick = React.useCallback(async (_: Event, data?: File) => {
    try {
      if (data == null) {
        throw new ArgumentNullError();
      }
      route.setParams({
        tab: TabType.search,
        search: searchProps?.query,
        file: data.id
      });
    } catch (error) {
      dispatch(setError(error as Error));
    }
  }, [
    searchProps?.query,
    route,
    dispatch
  ]);

  return (
    <Presenter
      {...searchProps}
      onClick={handleClick}
      onMenuClick={handleMenuClick} />
  );

}

export default SearchFileTreeItem;
