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
  deleteExploreFolder,
  setDialogAction,
  setError
} from '../../../stores/Action';
import { Event } from '../../../types/Event';
import { Folder } from '../../../types/Model';

import Presenter from './FolderDeleteDialog.presenter';

interface FolderDeleteDialogProps {
  folder?: Folder
}

function FileDeleteDialog(props: FolderDeleteDialogProps) {

  const { folder } = props;

  const {
    dispatch,
    state: {
      workFolder
    }
  } = useStore();
  const { graph } = useService();
  const [ loading, setLoading ] = React.useState<boolean>(false);
  const [ open, setOpen ] = React.useState<boolean>(true);

  const handleOpenChange = React.useCallback((_, data?: boolean) => {
    const open = data || false;
    setOpen(open);
    if (!open) {
      dispatch(setDialogAction(undefined));
    }
  }, [
    dispatch
  ]);

  const handleSubmit = React.useCallback(async (e?: Event) => {
    try {
      if (!workFolder) {
        throw new Error();
      }
      if (!folder) {
        throw new Error();
      }
      await graph.deleteExploreFolder(folder);
      dispatch(deleteExploreFolder(folder));
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
    folder,
    graph,
    handleOpenChange,
    workFolder
  ]);

  return (
    <Presenter
      loading={loading}
      open={open}
      onOpenChange={handleOpenChange}
      onSubmit={handleSubmit} />
  );

}

export default FileDeleteDialog;
