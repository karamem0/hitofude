//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { useService } from '../../../../providers/ServiceProvider';
import { useStore } from '../../../../providers/StoreProvider';
import {
  deleteExploreFolder,
  setDialogAction,
  setError
} from '../../../../stores/Action';
import { Event } from '../../../../types/Event';
import { Folder } from '../../../../types/Model';

import Presenter from './FolderDeleteDialog.presenter';

interface FolderDeleteDialogProps {
  value?: Folder
}

function FileDeleteDialog(props: FolderDeleteDialogProps) {

  const { value } = props;

  const {
    dispatch,
    state: {
      exploreFolder
    }
  } = useStore();
  const { graph } = useService();
  const [ loading, setLoading ] = React.useState<boolean>(false);
  const [ open, setOpen ] = React.useState<boolean>(true);

  const handleOpenChange = React.useCallback((_?: Event, data?: boolean) => {
    const open = data ?? false;
    setOpen(open);
    if (!open) {
      dispatch(setDialogAction());
    }
  }, [
    dispatch
  ]);

  const handleSubmit = React.useCallback(async (e?: Event) => {
    try {
      if (!exploreFolder) {
        throw new Error();
      }
      if (!value) {
        throw new Error();
      }
      await graph.deleteExploreFolder(value);
      dispatch(deleteExploreFolder(value));
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
    exploreFolder,
    graph,
    handleOpenChange,
    value
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
