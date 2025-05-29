//
// Copyright (c) 2023-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { ArgumentNullError, DependencyNullError } from '../../../types/Error';
import {
  ExplorerMenuAction,
  Folder,
  TabType
} from '../../../types/Model';
import {
  setDialogAction,
  setError,
  setExplorerAllFiles,
  setExplorerSelectedFolder
} from '../../../stores/Action';
import { Event } from '../../../types/Event';
import Presenter from './ExplorerHeaderMenuList.presenter';
import { isMarkdown } from '../../../utils/File';
import { useRoute } from '../../../providers/RouteProvider';
import { useService } from '../../../providers/ServiceProvider';
import { useStore } from '../../../providers/StoreProvider';

function ExplorerHeaderMenuList() {

  const { route } = useRoute();
  const {
    dispatch,
    state: {
      explorerProps
    }
  } = useStore();
  const { graph } = useService();

  const handleMenuClick = React.useCallback(async (_: Event, data?: ExplorerMenuAction) => {
    switch (data?.type) {
      case 'copyLink': {
        const value = data?.data as Folder | undefined;
        if (value?.webUrl == null) {
          throw new ArgumentNullError();
        }
        dispatch(setDialogAction({
          type: 'copyLink',
          data: value.webUrl
        }));
        break;
      }
      case 'createFile': {
        dispatch(setDialogAction({
          type: 'createFile',
          data: null
        }));
        break;
      }
      case 'createFolder': {
        dispatch(setDialogAction({
          type: 'createFolder',
          data: null
        }));
        break;
      }
      case 'openWithOneDrive': {
        const value = data?.data as Folder | undefined;
        if (value?.webUrl == null) {
          throw new ArgumentNullError();
        }
        window.open(value.webUrl, '_blank', 'noreferrer');
        break;
      }
      case 'refreshFolder': {
        try {
          const value = data?.data as Folder | undefined;
          if (value == null) {
            throw new ArgumentNullError();
          }
          const folder = await graph.getFolderById(value.id);
          dispatch(setExplorerSelectedFolder(folder));
        } catch (error) {
          dispatch(setError(error as Error));
        }
        break;
      }
      case 'toggleAllFiles': {
        try {
          const value = data?.data as boolean | undefined;
          if (value == null) {
            throw new ArgumentNullError();
          }
          dispatch(setExplorerAllFiles(value));
          const folder = explorerProps?.selectedFolder;
          if (folder == null) {
            throw new DependencyNullError();
          }
          const file = folder?.files?.find((item) => isMarkdown(explorerProps?.selectedFile) && isMarkdown(item));
          route.setParams({
            tab: TabType.explorer,
            folder: folder.id,
            file: file?.id
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
    explorerProps?.selectedFile,
    explorerProps?.selectedFolder,
    graph,
    route,
    dispatch
  ]);

  return (
    <Presenter
      {...explorerProps}
      onMenuClick={handleMenuClick} />
  );

}

export default ExplorerHeaderMenuList;
