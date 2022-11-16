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
  appendFile,
  setWorkFile
} from '../../../stores/Action';
import {
  FileConflictError,
  FileNotFoundError
} from '../../../types/Error';
import { Event, EventHandler } from '../../../types/Event';
import messages from '../messages';
import { FileCreateDialogFormState } from '../types/Form';

import Presenter from './FileCreateDialog.presenter';

interface FileCreateDialogProps {
  onOpenChange?: EventHandler<boolean>
}

function FileCreateDialog(props: FileCreateDialogProps) {

  const { onOpenChange } = props;

  const setError = useError();
  const {
    dispatch,
    state: { workFolder }
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

  const handleSubmit = React.useCallback(async (e?: Event, data?: FileCreateDialogFormState) => {
    try {
      if (!workFolder) {
        throw new Error();
      }
      if (!data?.name) {
        throw new Error();
      }
      setLoading(true);
      const file = await Promise.resolve()
        .then(() => graph.createFile(workFolder, `${data.name}.md`))
        .then((file) => file ? graph.getFileById(file.id) : undefined);
      dispatch(appendFile(file));
      dispatch(setWorkFile(file));
      handleOpenChange?.(e, false);
    } catch (e) {
      if (e instanceof FileConflictError) {
        setAlert(messages.FileAlreadyExists);
        return;
      }
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
    graph,
    handleOpenChange,
    setError,
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

export default FileCreateDialog;
