//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { ExplorerMenuAction, Folder } from '../../../types/Model';
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
      case 'deleteFolder': {
        const value = data?.data as Folder | undefined;
        if (value == null) {
          throw new ArgumentNullError();
        }
        dispatch(setDialogAction({
          type: 'deleteFolder',
          data: value
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
          type: 'renameFolder',
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
