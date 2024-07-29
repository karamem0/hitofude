//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { useStore } from '../../../providers/StoreProvider';
import {
  setContentMinimap,
  setContentPreview,
  setContentScroll,
  setContentWordWrap,
  setSidePanelAction
} from '../../../stores/Action';
import { Event, EventHandler } from '../../../types/Event';
import {
  File,
  ContentMenuAction,
  ContentMenuType,
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
      case ContentMenuType.closeFile: {
        onCancel?.(event);
        break;
      }
      case ContentMenuType.downloadFile: {
        downloadFile(data.data as File);
        break;
      }
      case ContentMenuType.editFile: {
        onEdit?.(event);
        break;
      }
      case ContentMenuType.openFileVersionPanel: {
        dispatch(setSidePanelAction(data?.data as SidePanelAction));
        break;
      }
      case ContentMenuType.saveFile: {
        onSave?.(event, data.data as boolean);
        break;
      }
      case ContentMenuType.toggleMinimap: {
        dispatch(setContentMinimap(data?.data as boolean));
        break;
      }
      case ContentMenuType.togglePreview: {
        dispatch(setContentPreview(data?.data as boolean));
        break;
      }
      case ContentMenuType.toggleScroll: {
        dispatch(setContentScroll(data?.data as boolean));
        break;
      }
      case ContentMenuType.toggleWordWrap: {
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
