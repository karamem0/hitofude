//
// Copyright (c) 2023-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import {
  ContentMenuAction,
  File,
  SidePanelAction
} from '../../../types/Model';
import { Event, EventHandler } from '../../../types/Event';
import {
  setContentMinimap,
  setContentPreview,
  setContentScroll,
  setContentWordWrap,
  setSidePanelAction
} from '../../../stores/Action';
import Presenter from './ContentMenuList.presenter';
import { downloadFile } from '../../../utils/File';
import { useStore } from '../../../providers/StoreProvider';

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
      case 'saveFile': {
        onSave?.(event, data.data as boolean);
        break;
      }
      case 'toggleMinimap': {
        dispatch(setContentMinimap(data?.data as boolean));
        break;
      }
      case 'togglePreview': {
        dispatch(setContentPreview(data?.data as boolean));
        break;
      }
      case 'toggleScroll': {
        dispatch(setContentScroll(data?.data as boolean));
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
