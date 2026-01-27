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
import {
  setDialogAction,
  setExplorerAllFiles,
  setExplorerSelectedFolder
} from '../../../stores/Action';
import { ArgumentNullError, DependencyNullError } from '../../../types/Error';
import { Event } from '../../../types/Event';
import {
  ExplorerMenuAction,
  Folder,
  TabType
} from '../../../types/Model';
import { isMarkdown } from '../../../utils/File';

import Presenter from './ExplorerHeaderMenuList.presenter';

function ExplorerHeaderMenuList() {

  const { route } = useRoute();
  const {
    dispatch,
    state: {
      explorerProps
    }
  } = useStore();
  const { graph } = useService();
  const dispatchToast = useToast();

  const handleMenuClick = React.useCallback(async (_: Event, data?: ExplorerMenuAction) => {
    try {
      switch (data?.type) {
        case 'copyLink': {
          const value = data?.data as Folder | undefined;
          if (value?.webUrl == null) {
            throw new ArgumentNullError();
          }
          dispatch(setDialogAction({
            data: value.webUrl,
            type: 'copyLink'
          }));
          break;
        }
        case 'createFile': {
          dispatch(setDialogAction({
            data: null,
            type: 'createFile'
          }));
          break;
        }
        case 'createFolder': {
          dispatch(setDialogAction({
            data: null,
            type: 'createFolder'
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
          const value = data?.data as Folder | undefined;
          if (value == null) {
            throw new ArgumentNullError();
          }
          const folder = await graph.getFolderById(value.id, true);
          dispatch(setExplorerSelectedFolder(folder));
          break;
        }
        case 'toggleAllFiles': {
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
            file: file?.id,
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
    explorerProps?.selectedFile,
    explorerProps?.selectedFolder,
    graph,
    route,
    dispatch,
    dispatchToast
  ]);

  return (
    <Presenter
      {...explorerProps}
      onMenuClick={handleMenuClick} />
  );

}

export default ExplorerHeaderMenuList;
