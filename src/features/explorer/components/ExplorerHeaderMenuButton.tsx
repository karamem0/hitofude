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
import {
  setDialogAction,
  setError,
  setExplorerAllFiles,
  setExplorerSelectedFolder
} from '../../../stores/Action';
import { ArgumentNullError, DependencyNullError } from '../../../types/Error';
import { Event } from '../../../types/Event';
import {
  DialogType,
  ExplorerMenuAction,
  ExplorerMenuType,
  Folder,
  TabType
} from '../../../types/Model';
import { isSupportedFile } from '../../../utils/File';

import Presenter from './ExplorerHeaderMenuButton.presenter';

function ExplorerHeaderMenuButton() {

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
        const value = data?.data as Folder | undefined;
        if (value == null) {
          throw new ArgumentNullError();
        }
        const folder = await graph.getFolderById(value.id);
        dispatch(setExplorerSelectedFolder(folder));
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

export default ExplorerHeaderMenuButton;
