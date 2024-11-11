//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { ExplorerMenuAction, File } from '../../../types/Model';
import { ArgumentNullError } from '../../../types/Error';
import { Event } from '../../../types/Event';
import Presenter from './ExplorerFileMenuList.presenter';
import { downloadFile } from '../../../utils/File';
import { setDialogAction } from '../../../stores/Action';
import { useStore } from '../../../providers/StoreProvider';

interface ExplorerFileMenuListProps {
  file?: File
}

function ExplorerFileMenuList(props: Readonly<ExplorerFileMenuListProps>) {

  const { dispatch } = useStore();

  const handleMenuClick = React.useCallback((_: Event, data?: ExplorerMenuAction) => {
    switch (data?.type) {
      case 'copyFile': {
        const value = data?.data as File | undefined;
        if (value == null) {
          throw new ArgumentNullError();
        }
        dispatch(setDialogAction({
          type: 'copyFile',
          data: value
        }));
        break;
      }
      case 'copyLink': {
        const value = data?.data as File | undefined;
        if (value?.webUrl == null) {
          throw new ArgumentNullError();
        }
        dispatch(setDialogAction({
          type: 'copyLink',
          data: value.webUrl
        }));
        break;
      }
      case 'deleteFile': {
        const value = data?.data as File | undefined;
        if (value == null) {
          throw new ArgumentNullError();
        }
        dispatch(setDialogAction({
          type: 'deleteFile',
          data: value
        }));
        break;
      }
      case 'downloadFile': {
        const value = data?.data as File | undefined;
        if (value?.downloadUrl == null) {
          throw new ArgumentNullError();
        }
        if (value?.fullName == null) {
          throw new ArgumentNullError();
        }
        downloadFile(value);
        break;
      }
      case 'openWithOneDrive': {
        const value = data?.data as File | undefined;
        if (value?.webUrl == null) {
          throw new ArgumentNullError();
        }
        window.open(value.webUrl, '_blank', 'noreferrer');
        break;
      }
      case 'renameFile': {
        const value = data?.data as File | undefined;
        if (value == null) {
          throw new ArgumentNullError();
        }
        dispatch(setDialogAction({
          type: 'renameFile',
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

export default ExplorerFileMenuList;
