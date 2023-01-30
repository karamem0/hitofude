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
import { File } from '../../../types/Model';
import { FileCopyDialogFormState } from '../types/Form';

import Presenter from './FileCopyDialog.presenter';

interface FileCopyDialogProps {
  file?: File
}

function FileCopyDialog(props: FileCopyDialogProps) {

  const { file } = props;

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

  const handleSubmit = React.useCallback(async (e?: Event, data?: FileCopyDialogFormState) => {
    try {
      if (!workFolder) {
        throw new Error();
      }
      if (!data?.name) {
        throw new Error();
      }
      if (!data?.downloadUrl) {
        throw new Error();
      }
      setLoading(true);
      const content = await graph.getFileContent(data);
      const file = await Promise.resolve()
        .then(() => graph.createFile(workFolder, `${data.name}.md`, content))
        .then((file) => file ? graph.getFileById(file.id) : undefined);
      if (!file) {
        throw new Error();
      }
      dispatch(appendExploreFile(file));
      dispatch(setWorkFile({
        ...file,
        content
      }));
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
      file={file}
      loading={loading}
      open={open}
      onOpenChange={handleOpenChange}
      onSubmit={handleSubmit} />
  );

}

export default FileCopyDialog;
