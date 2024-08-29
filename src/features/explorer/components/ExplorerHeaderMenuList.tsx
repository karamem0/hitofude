//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { ArgumentNullError, DependencyNullError } from '../../../types/Error';
import {
  DialogType,
  ExplorerMenuAction,
  ExplorerMenuType,
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
import { isSupportedFile } from '../../../utils/File';
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
      case ExplorerMenuType.copyLink: {
        const value = data?.data as Folder | undefined;
        if (value?.webUrl == null) {
          throw new ArgumentNullError();
        }
        dispatch(setDialogAction({
          type: DialogType.copyLink,
          data: value.webUrl
        }));
        break;
      }
      case ExplorerMenuType.createFile: {
        dispatch(setDialogAction({
          type: DialogType.createFile,
          data: null
        }));
        break;
      }
      case ExplorerMenuType.createFolder: {
        dispatch(setDialogAction({
          type: DialogType.createFolder,
          data: null
        }));
        break;
      }
      case ExplorerMenuType.openWithOneDrive: {
        const value = data?.data as Folder | undefined;
        if (value?.webUrl == null) {
          throw new ArgumentNullError();
        }
        window.open(value.webUrl, '_blank', 'noreferrer');
        break;
      }
      case ExplorerMenuType.refreshFolder: {
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
      case ExplorerMenuType.toggleAllFiles: {
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
          const file = folder?.files?.find((item) => isSupportedFile(explorerProps?.selectedFile) && isSupportedFile(item));
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
