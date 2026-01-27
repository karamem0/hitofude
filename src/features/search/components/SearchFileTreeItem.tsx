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
import { setDialogAction } from '../../../stores/Action';
import { ArgumentNullError, FolderNotFoundError } from '../../../types/Error';
import { Event } from '../../../types/Event';
import {
  File,
  SearchMenuAction,
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
  const dispatchToast = useToast();

  const handleMenuClick = React.useCallback(async (_: Event, data?: SearchMenuAction) => {
    try {
      switch (data?.type) {
        case 'copyLink': {
          const value = data?.data as File | undefined;
          if (value?.id == null) {
            throw new ArgumentNullError();
          }
          const file = await graph.getFileById(value?.id);
          dispatch(setDialogAction({
            data: file.webUrl,
            type: 'copyLink'
          }));
          break;
        }
        case 'openFileLocation': {
          const value = data?.data as File | undefined;
          if (value?.id == null) {
            throw new ArgumentNullError();
          }
          const file = await graph.getFileById(value.id);
          if (file.parentId == null) {
            throw new FolderNotFoundError();
          }
          const folder = await graph.getFolderById(file.parentId);
          route.setParams({
            file: value.id,
            folder: folder.id,
            tab: TabType.explorer
          });
          break;
        }
        default:
          break;
      }
    } catch (error) {
      if (error instanceof Error) {
        dispatchToast(error, 'error');
      } else {
        throw error;
      }
    }
  }, [
    graph,
    route,
    dispatch,
    dispatchToast
  ]);

  const handleClick = React.useCallback(async (_: Event, data?: File) => {
    if (data == null) {
      throw new ArgumentNullError();
    }
    route.setParams({
      file: data.id,
      search: searchProps?.query,
      tab: TabType.search
    });
  }, [
    route,
    searchProps?.query
  ]);

  return (
    <Presenter
      {...searchProps}
      onClick={handleClick}
      onMenuClick={handleMenuClick} />
  );

}

export default SearchFileTreeItem;
