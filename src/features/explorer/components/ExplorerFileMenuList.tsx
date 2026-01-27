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
import { ExplorerMenuAction, File } from '../../../types/Model';
import { downloadFile } from '../../../utils/File';

import Presenter from './ExplorerFileMenuList.presenter';

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
          data: value,
          type: 'copyFile'
        }));
        break;
      }
      case 'copyLink': {
        const value = data?.data as File | undefined;
        if (value?.webUrl == null) {
          throw new ArgumentNullError();
        }
        dispatch(setDialogAction({
          data: value.webUrl,
          type: 'copyLink'
        }));
        break;
      }
      case 'deleteFile': {
        const value = data?.data as File | undefined;
        if (value == null) {
          throw new ArgumentNullError();
        }
        dispatch(setDialogAction({
          data: value,
          type: 'deleteFile'
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
          data: value,
          type: 'renameFile'
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
