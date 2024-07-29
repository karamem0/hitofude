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
  File
} from '../../../types/Model';
import { downloadFile } from '../../../utils/File';

import Presenter from './ExplorerFileMenuButton.presenter';

interface ExplorerFileMenuButtonProps {
  file?: File
}

function ExplorerFileMenuButton(props: Readonly<ExplorerFileMenuButtonProps>) {

  const {
    dispatch
  } = useStore();

  const handleMenuClick = React.useCallback((_: Event, data?: ExplorerMenuAction) => {
    switch (data?.type) {
      case ExplorerMenuType.copyFile: {
        const value = data?.data as File | undefined;
        if (value == null) {
          throw new ArgumentNullError();
        }
        dispatch(setDialogAction({
          type: DialogType.copyFile,
          data: value
        }));
        break;
      }
      case ExplorerMenuType.deleteFile: {
        const value = data?.data as File | undefined;
        if (value == null) {
          throw new ArgumentNullError();
        }
        dispatch(setDialogAction({
          type: DialogType.deleteFile,
          data: value
        }));
        break;
      }
      case ExplorerMenuType.downloadFile: {
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
      case ExplorerMenuType.openWithOneDrive: {
        const value = data?.data as File | undefined;
        if (value?.webUrl == null) {
          throw new ArgumentNullError();
        }
        window.open(value.webUrl, '_blank', 'noreferrer');
        break;
      }
      case ExplorerMenuType.renameFile: {
        const value = data?.data as File | undefined;
        if (value == null) {
          throw new ArgumentNullError();
        }
        dispatch(setDialogAction({
          type: DialogType.renameFile,
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

export default ExplorerFileMenuButton;
