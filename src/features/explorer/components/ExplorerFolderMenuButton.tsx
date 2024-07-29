//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { useStore } from '../../../providers/StoreProvider';
import { setDialogAction } from '../../../stores/Action';
import { ArgumentNullError } from '../../../types/Error';
import { Event } from '../../../types/Event';
import {
  DialogType,
  ExplorerMenuAction,
  ExplorerMenuType,
  Folder
} from '../../../types/Model';

import Presenter from './ExplorerFolderMenuButton.presenter';

interface ExplorerFolderMenuButtonProps {
  folder?: Folder
}

function ExplorerFolderMenuButton(props: Readonly<ExplorerFolderMenuButtonProps>) {

  const {
    dispatch
  } = useStore();

  const handleMenuClick = React.useCallback((_: Event, data?: ExplorerMenuAction) => {
    switch (data?.type) {
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

export default ExplorerFolderMenuButton;
