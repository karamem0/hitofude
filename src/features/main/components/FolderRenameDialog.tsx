//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { useService } from '../../../providers/ServiceProvider';
import { useStore } from '../../../providers/StoreProvider';
import {
  setDialogAction,
  setError,
  updateExploreFolder
} from '../../../stores/Action';
import { Event } from '../../../types/Event';
import { Folder } from '../../../types/Model';
import { FolderRenameDialogFormState } from '../types/Form';

import Presenter from './FolderRenameDialog.presenter';

interface FolderRenameDialogProps {
  value?: Folder
}

function FolderRenameDialog(props: FolderRenameDialogProps) {

  const { value } = props;

  const { dispatch } = useStore();
  const { graph } = useService();
  const [ loading, setLoading ] = React.useState<boolean>(false);
  const [ open, setOpen ] = React.useState<boolean>(true);

  const handleOpenChange = React.useCallback((_?: Event, data?: boolean) => {
    const open = data || false;
    setOpen(open);
    if (!open) {
      dispatch(setDialogAction(undefined));
    }
  }, [
    dispatch
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
      dispatch(updateExploreFolder(folder));
    } catch (e) {
      if (e instanceof Error) {
        dispatch(setError(e));
        return;
      }
      throw e;
    } finally {
      setLoading(false);
      handleOpenChange?.(e, false);
    }
  }, [
    dispatch,
    graph,
    handleOpenChange
  ]);

  return (
    <Presenter
      loading={loading}
      open={open}
      value={value}
      onOpenChange={handleOpenChange}
      onSubmit={handleSubmit} />
  );

}

export default FolderRenameDialog;
