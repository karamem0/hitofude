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
import { updateFolder } from '../../../stores/Action';
import {
  FolderConflictError,
  FolderNotFoundError
} from '../../../types/Error';
import { Event, EventHandler } from '../../../types/Event';
import { Folder } from '../../../types/Model';
import messages from '../messages';
import { FolderRenameDialogFormState } from '../types/Form';

import Presenter from './FolderRenameDialog.presenter';

interface FolderRenameDialogProps {
  folder?: Folder,
  onOpenChange?: EventHandler<boolean>
}

function FolderRenameDialog(props: FolderRenameDialogProps) {

  const {
    folder,
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

  const handleSubmit = React.useCallback(async (e?: Event, data?: FolderRenameDialogFormState) => {
    try {
      if (!data?.id) {
        throw new Error();
      }
      if (!data?.name) {
        throw new Error();
      }
      setLoading(true);
      const folder = await graph.renameFolder(data, data.name);
      dispatch(updateFolder(folder));
      handleOpenChange?.(e, false);
    } catch (e) {
      if (e instanceof FolderConflictError) {
        setAlert(messages.FolderAlreadyExists);
        return;
      }
      if (e instanceof FolderNotFoundError) {
        setAlert(messages.FolderDoesNotExists);
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
      folder={folder}
      loading={loading}
      open={open}
      onDismiss={handleDismiss}
      onOpenChange={handleOpenChange}
      onSubmit={handleSubmit} />
  );

}

export default FolderRenameDialog;
