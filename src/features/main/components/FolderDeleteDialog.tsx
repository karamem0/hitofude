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
import { deleteFolder } from '../../../stores/Action';
import { FolderNotFoundError } from '../../../types/Error';
import { Event, EventHandler } from '../../../types/Event';
import { Folder } from '../../../types/Model';
import messages from '../messages';

import Presenter from './FolderDeleteDialog.presenter';

interface FolderDeleteDialogProps {
  folder?: Folder,
  onOpenChange?: EventHandler<boolean>
}

function FileDeleteDialog(props: FolderDeleteDialogProps) {

  const {
    folder,
    onOpenChange
  } = props;

  const setError = useError();
  const {
    dispatch,
    state: {
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
      if (!folder) {
        throw new Error();
      }
      await graph.deleteFolder(folder);
      dispatch(deleteFolder(folder));
      handleOpenChange?.(e, false);
    } catch (e) {
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
    folder,
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

export default FileDeleteDialog;
