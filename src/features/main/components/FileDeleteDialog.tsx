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
  deleteFile,
  setWorkFile
} from '../../../stores/Action';
import { FileNotFoundError } from '../../../types/Error';
import { Event, EventHandler } from '../../../types/Event';
import { File } from '../../../types/Model';
import messages from '../messages';

import Presenter from './FileDeleteDialog.presenter';

interface FileDeleteDialogProps {
  file?: File,
  onOpenChange?: EventHandler<boolean>
}

function FileDeleteDialog(props: FileDeleteDialogProps) {

  const {
    file,
    onOpenChange
  } = props;

  const setError = useError();
  const {
    dispatch,
    state: {
      workFile,
      workFolder
    }
  } = useStore();
  const { graph } = useService();
  const [ alert, setAlert ] = React.useState<MessageDescriptor>();
  const [ loading, setLoading ] = React.useState<boolean>(false);
  const [ open, setOpen ] = React.useState<boolean>(true);

  const handleDismiss = React.useCallback(() => {
    setAlert(undefined);
  }, []);

  const handleOpenChange = React.useCallback((e?: Event, data?: boolean) => {
    setOpen(data || false);
    onOpenChange?.(e, data);
  }, [
    onOpenChange
  ]);

  const handleSubmit = React.useCallback(async (e?: Event) => {
    try {
      if (!workFolder) {
        throw new Error();
      }
      if (!file) {
        throw new Error();
      }
      await graph.deleteFile(file);
      dispatch(deleteFile(file));
      if (file.id === workFile?.id) {
        dispatch(setWorkFile(workFolder.files?.filter((item) => item.id !== file.id)?.at(-1)));
      }
      handleOpenChange?.(e, false);
    } catch (e) {
      if (e instanceof FileNotFoundError) {
        setAlert(messages.FileDoesNotExists);
        return;
      }
      if (e instanceof Error) {
        setError(e);
        return;
      }
      throw e;
    } finally {
      setLoading(false);
    }
  }, [
    dispatch,
    file,
    graph,
    handleOpenChange,
    setError,
    workFile,
    workFolder
  ]);

  return (
    <Presenter
      alert={alert}
      loading={loading}
      open={open}
      onDismiss={handleDismiss}
      onOpenChange={handleOpenChange}
      onSubmit={handleSubmit} />
  );

}

export default FileDeleteDialog;
