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
import { Event } from '../../../types/Event';
import {
  File,
  ContentMenuAction,
  ContentMenuType,
  SidePanelAction
} from '../../../types/Model';
import { downloadFile } from '../../../utils/File';

import Presenter from './ContentMenuButton.presenter';

function ContentMenuButton() {

  const {
    dispatch,
    state: {
      contentProps
    }
  } = useStore();

  const handleMenuClick = React.useCallback((_: Event, data?: ContentMenuAction) => {
    switch (data?.type) {
      case ContentMenuType.downloadFile: {
        downloadFile(data.data as File);
        break;
      }
      case ContentMenuType.openFileVersionPanel: {
        dispatch(setSidePanelAction(data?.data as SidePanelAction));
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
    dispatch
  ]);

  return (
    <Presenter
      {...contentProps}
      onMenuClick={handleMenuClick} />
  );

}

export default ContentMenuButton;
