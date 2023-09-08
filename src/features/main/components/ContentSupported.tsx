//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { useProgress } from '../../../common/providers/ProgressProvider';
import { useService } from '../../../providers/ServiceProvider';
import { useStore } from '../../../providers/StoreProvider';
import {
  setContentEditing,
  setContentFile,
  setContentMinimap,
  setContentPosition,
  setContentPreview,
  setContentText,
  setContentWordWrap,
  setError,
  setMarkdownPosition,
  setMarkdownText,
  setSidePanelAction
} from '../../../stores/Action';
import { DependencyNullError } from '../../../types/Error';
import { Event } from '../../../types/Event';
import {
  ContentMenuAction,
  ContentMenuType,
  File,
  Position,
  ProgressType,
  SidePanelAction
} from '../../../types/Model';
import { downloadFile } from '../../../utils/File';

import Presenter from './ContentSupported.presenter';

function ContentSupported() {

  const {
    dispatch,
    state: {
      contentProps,
      markdownProps
    }
  } = useStore();
  const { graph } = useService();
  const { setProgress } = useProgress();

  const [ changed, setChanged ] = React.useState<boolean>(false);

  const handleCancel = React.useCallback(() => {
    try {
      dispatch(setContentPosition());
      dispatch(setContentEditing(false));
    } catch (e) {
      dispatch(setError(e as Error));
    }
  }, [
    dispatch
  ]);

  const handleChangePosition = React.useCallback((_?: Event, data?: Position) => {
    dispatch(setMarkdownPosition(data));
  }, [
    dispatch
  ]);

  const handleChangePreview = React.useCallback((_?: Event, data?: boolean) => {
    dispatch(setContentPreview(data));
  }, [
    dispatch
  ]);

  const handleChangeText = React.useCallback((_?: Event, data?: string) => {
    dispatch(setMarkdownText(data));
  }, [
    dispatch
  ]);

  const handleContextMenu = React.useCallback((_?: Event, data?: ContentMenuAction) => {
    switch (data?.type) {
      case ContentMenuType.downloadFile: {
        downloadFile(data.data as File);
        break;
      }
      case ContentMenuType.openSidePanel: {
        dispatch(setSidePanelAction(data?.data as SidePanelAction));
        break;
      }
      case ContentMenuType.toggleMinimap: {
        dispatch(setContentMinimap(data?.data as boolean));
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

  const handleEdit = React.useCallback(() => {
    try {
      setChanged(false);
      dispatch(setContentEditing(true));
    } catch (e) {
      dispatch(setError(e as Error));
    }
  }, [
    dispatch
  ]);

  const handleSave = React.useCallback(async (_?: Event, data?: boolean) => {
    try {
      if (changed) {
        const contentFile = contentProps?.file;
        if (contentFile == null) {
          throw new DependencyNullError();
        }
        setProgress(ProgressType.save);
        const file = await Promise.resolve()
          .then(() => graph.setFileContent(contentFile, markdownProps?.text ?? ''))
          .then((file) => graph.getFileById(file.id));
        dispatch(setContentFile(file));
        dispatch(setContentText(markdownProps?.text));
        dispatch(setContentPosition(data ? markdownProps?.position : undefined));
        dispatch(setContentEditing(data));
      }
    } catch (e) {
      dispatch(setError(e as Error));
    } finally {
      setProgress();
    }
  }, [
    changed,
    contentProps?.file,
    graph,
    markdownProps?.position,
    markdownProps?.text,
    dispatch,
    setProgress
  ]);

  React.useEffect(() => {
    setChanged(contentProps?.text !== markdownProps?.text);
  }, [
    contentProps?.text,
    markdownProps?.text
  ]);

  return (
    <Presenter
      {...contentProps}
      changed={changed}
      onCancel={handleCancel}
      onChangePosition={handleChangePosition}
      onChangePreview={handleChangePreview}
      onChangeText={handleChangeText}
      onContextMenu={handleContextMenu}
      onEdit={handleEdit}
      onSave={handleSave} />
  );

}

export default ContentSupported;
