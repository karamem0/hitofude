//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import {
  DialogType,
  ExplorerMenuAction,
  ExplorerMenuType,
  Folder
} from '../../../types/Model';
import { ArgumentNullError } from '../../../types/Error';
import { Event } from '../../../types/Event';
import Presenter from './ExplorerFolderMenuList.presenter';
import { setDialogAction } from '../../../stores/Action';
import { useStore } from '../../../providers/StoreProvider';

interface ExplorerFolderMenuListProps {
  folder?: Folder
}

function ExplorerFolderMenuList(props: Readonly<ExplorerFolderMenuListProps>) {

  const { dispatch } = useStore();

  const handleMenuClick = React.useCallback((_: Event, data?: ExplorerMenuAction) => {
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
      case ExplorerMenuType.deleteFolder: {
        const value = data?.data as Folder | undefined;
        if (value == null) {
          throw new ArgumentNullError();
        }
        dispatch(setDialogAction({
          type: DialogType.deleteFolder,
          data: value
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
      case ExplorerMenuType.renameFolder: {
        const value = data?.data as Folder | undefined;
        if (value == null) {
          throw new ArgumentNullError();
        }
        dispatch(setDialogAction({
          type: DialogType.renameFolder,
          data: value
        }));
        break;
      }
      default:
        break;
    }
  }, [
    dispatch
  ]);

  return (
    <Presenter
      {...props}
      onMenuClick={handleMenuClick} />
  );

}

export default ExplorerFolderMenuList;
