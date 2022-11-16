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
import { updateFile } from '../../../stores/Action';
import { FileConflictError, FileNotFoundError } from '../../../types/Error';
import { Event, EventHandler } from '../../../types/Event';
import { File } from '../../../types/Model';
import messages from '../messages';
import { FileRenameDialogFormState } from '../types/Form';

import Presenter from './FileRenameDialog.presenter';

interface FileRenameDialogProps {
  file?: File,
  onOpenChange?: EventHandler<boolean>
}

function FileRenameDialog(props: FileRenameDialogProps) {

  const {
    file,
    onOpenChange
  } = props;

  const setError = useError();
  const { dispatch } = useStore();
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

  const handleSubmit = React.useCallback(async (e?: Event, data?: FileRenameDialogFormState) => {
    try {
      if (!data?.id) {
        throw new Error();
      }
      if (!data?.name) {
        throw new Error();
      }
      setLoading(true);
      const file = await graph.renameFile(data, `${data.name}.md`);
      dispatch(updateFile(file));
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
    setError
  ]);

  return (
    <Presenter
      alert={alert}
      file={file}
      loading={loading}
      open={open}
      onDismiss={handleDismiss}
      onOpenChange={handleOpenChange}
      onSubmit={handleSubmit} />
  );

}

export default FileRenameDialog;
