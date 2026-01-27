//
// Copyright (c) 2023-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { useStore } from '../../../providers/StoreProvider';
import {
  setContentShowMinimap,
  setContentShowPreview,
  setContentSyncScroll,
  setContentWordWrap,
  setDialogAction,
  setSidePanelAction
} from '../../../stores/Action';
import { ArgumentNullError } from '../../../types/Error';
import { Event, EventHandler } from '../../../types/Event';
import {
  ContentMenuAction,
  File,
  SidePanelAction
} from '../../../types/Model';
import { downloadFile } from '../../../utils/File';

import Presenter from './ContentMenuList.presenter';

interface ContentMenuListProps {
  onCancel?: EventHandler,
  onEdit?: EventHandler,
  onSave?: EventHandler<boolean>
}

function ContentMenuList(props: Readonly<ContentMenuListProps>) {

  const {
    onCancel,
    onEdit,
    onSave
  } = props;

  const {
    dispatch,
    state: {
      contentProps,
      markdownProps
    }
  } = useStore();

  const handleMenuClick = React.useCallback((event: Event, data?: ContentMenuAction) => {
    switch (data?.type) {
      case 'closeFile': {
        onCancel?.(event);
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
      case 'downloadFile': {
        downloadFile(data.data as File);
        break;
      }
      case 'editFile': {
        onEdit?.(event);
        break;
      }
      case 'openFileVersionPanel': {
        dispatch(setSidePanelAction(data?.data as SidePanelAction));
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
      case 'saveFile': {
        onSave?.(event, data.data as boolean);
        break;
      }
      case 'toggleShowMinimap': {
        dispatch(setContentShowMinimap(data?.data as boolean));
        break;
      }
      case 'toggleShowPreview': {
        dispatch(setContentShowPreview(data?.data as boolean));
        break;
      }
      case 'toggleSyncScroll': {
        dispatch(setContentSyncScroll(data?.data as boolean));
        break;
      }
      case 'toggleWordWrap': {
        dispatch(setContentWordWrap(data?.data as boolean));
        break;
      }
      default:
        break;
    }
  }, [
    dispatch,
    onCancel,
    onEdit,
    onSave
  ]);

  return (
    <Presenter
      {...contentProps}
      {...markdownProps}
      onMenuClick={handleMenuClick} />
  );

}

export default ContentMenuList;
