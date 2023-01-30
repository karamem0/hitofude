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

import { useStore } from '../../../providers/StoreProvider';
import { setError } from '../../../stores/Action';
import {
  FileConflictError,
  FileNotFoundError,
  FolderConflictError,
  FolderNotFoundError
} from '../../../types/Error';
import messages from '../messages';

import Presenter from './AlertControl.presenter';

function AlertControl() {

  const dispatchError = useError();
  const {
    dispatch,
    state: {
      error
    }
  } = useStore();
  const [ message, setMessage ] = React.useState<MessageDescriptor>();

  const handleDismiss = React.useCallback(() => {
    dispatch(setError(undefined));
  }, [
    dispatch
  ]);

  React.useEffect(() => {
    if (!error) {
      setMessage(undefined);
      return;
    }
    if (error instanceof FileConflictError) {
      setMessage(messages.FileAlreadyExists);
      return;
    }
    if (error instanceof FileNotFoundError) {
      setMessage(messages.FileDoesNotExists);
      return;
    }
    if (error instanceof FolderConflictError) {
      setMessage(messages.FolderAlreadyExists);
      return;
    }
    if (error instanceof FolderNotFoundError) {
      setMessage(messages.FolderDoesNotExists);
      return;
    }
    if (error instanceof Error) {
      dispatchError(error);
      return;
    }
    throw error;
  }, [
    error,
    dispatchError
  ]);

  React.useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        dispatch(setError(undefined));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [
    dispatch,
    message
  ]);

  return (
    <Presenter
      message={message}
      onDismiss={handleDismiss} />
  );

}

export default AlertControl;
