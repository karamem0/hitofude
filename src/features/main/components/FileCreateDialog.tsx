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
  appendExploreFile,
  setDialogAction,
  setError,
  setWorkFile
} from '../../../stores/Action';
import { Event } from '../../../types/Event';
import { FileCreateDialogFormState } from '../types/Form';

import Presenter from './FileCreateDialog.presenter';

function FileCreateDialog() {

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
      dispatch(appendExploreFile(file));
      dispatch(setWorkFile(file));
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

export default FileCreateDialog;
