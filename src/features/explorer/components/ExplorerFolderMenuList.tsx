//
// Copyright (c) 2023-2026 karamem0
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
import { ExplorerMenuAction, Folder } from '../../../types/Model';

import Presenter from './ExplorerFolderMenuList.presenter';

interface ExplorerFolderMenuListProps {
  folder?: Folder
}

function ExplorerFolderMenuList(props: Readonly<ExplorerFolderMenuListProps>) {

  const { dispatch } = useStore();

  const handleMenuClick = React.useCallback((_: Event, data?: ExplorerMenuAction) => {
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
      case 'deleteFolder': {
        const value = data?.data as Folder | undefined;
        if (value == null) {
          throw new ArgumentNullError();
        }
        dispatch(setDialogAction({
          data: value,
          type: 'deleteFolder'
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
      case 'renameFolder': {
        const value = data?.data as Folder | undefined;
        if (value == null) {
          throw new ArgumentNullError();
        }
        dispatch(setDialogAction({
          data: value,
          type: 'renameFolder'
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
