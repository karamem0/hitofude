//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { MessageDescriptor } from 'react-intl';
import { useError } from 'react-use';

import { useService } from '../../../providers/ServiceProvider';
import { useStore } from '../../../providers/StoreProvider';
import {
  setTabMode,
  setWorkFile,
  setWorkFolder
} from '../../../stores/Action';
import {
  FileConflictError,
  FileNotFoundError,
  FolderConflictError,
  FolderNotFoundError
} from '../../../types/Error';
import messages from '../messages';
import { DialogAction } from '../types/Dialog';

import Presenter from './MainPage.presenter';

function MainPage() {

  const setError = useError();
  const { dispatch } = useStore();
  const { graph, storage } = useService();
  const [ alert, setAlert ] = React.useState<MessageDescriptor>();
  const [ dialogAction, setDialogAction ] = React.useState<DialogAction>();
  const [ loading, setLoading ] = React.useState(true);

  const handleDismiss = React.useCallback(() => {
    setAlert(undefined);
  }, []);

  const handleError = React.useCallback((_, data?: unknown) => {
    if (data instanceof FileConflictError) {
      setAlert(messages.FileAlreadyExists);
      return;
    }
    if (data instanceof FileNotFoundError) {
      setAlert(messages.FileDoesNotExists);
      return;
    }
    if (data instanceof FolderConflictError) {
      setAlert(messages.FolderAlreadyExists);
      return;
    }
    if (data instanceof FolderNotFoundError) {
      setAlert(messages.FolderDoesNotExists);
      return;
    }
    if (data instanceof Error) {
      setError(data);
      return;
    }
    throw data;
  }, [
    setError
  ]);

  const handleOpenDialog = React.useCallback((_, data?: DialogAction) => {
    setDialogAction(data);
  }, []);

  React.useEffect(() => {
    (async () => {
      try {
        dispatch(setTabMode(storage.getTabMode()));
        const workFolderId = storage.getWorkFolderId();
        const workFolder = await Promise.resolve()
          .then(() => workFolderId ? graph.getFolderById(workFolderId) : Promise.reject(new FileNotFoundError()))
          .catch(() => graph.getRootFolder());
        dispatch(setWorkFolder(workFolder));
        const workFile = workFolder.files?.at(0);
        if (workFile) {
          dispatch(setWorkFile({
            ...workFile,
            content: await graph.getFileContent(workFile)
          }));
        }
      } catch (e) {
        handleError?.({}, e);
      } finally {
        setLoading(false);
      }
    })();
  }, [
    dispatch,
    graph,
    handleError,
    setAlert,
    setError,
    storage
  ]);

  return (
    <Presenter
      alert={alert}
      dialogAction={dialogAction}
      loading={loading}
      onDismiss={handleDismiss}
      onError={handleError}
      onOpenDialog={handleOpenDialog} />
  );

}

export default MainPage;
