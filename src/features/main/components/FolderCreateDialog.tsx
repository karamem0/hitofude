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
import { appendFolder } from '../../../stores/Action';
import {
  FileConflictError,
  FileNotFoundError
} from '../../../types/Error';
import { Event, EventHandler } from '../../../types/Event';
import messages from '../messages';
import { FolderCreateDialogFormState } from '../types/Form';

import Presenter from './FolderCreateDialog.presenter';

interface FolderCreateDialogProps {
  onOpenChange?: EventHandler<boolean>
}

function FolderCreateDialog(props: FolderCreateDialogProps) {

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

  const handleSubmit = React.useCallback(async (e?: Event, data?: FolderCreateDialogFormState) => {
    try {
      if (!workFolder) {
        throw new Error();
      }
      if (!data?.name) {
        throw new Error();
      }
      setLoading(true);
      const folder = await graph.createFolder(workFolder, `${data.name}`);
      dispatch(appendFolder(folder));
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

export default FolderCreateDialog;
