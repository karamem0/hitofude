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
  setDialogAction,
  setError,
  setWorkFile,
  updateExploreFile
} from '../../../../stores/Action';
import { Event } from '../../../../types/Event';
import { File } from '../../../../types/Model';
import { FileRenameDialogFormState } from '../../types/Form';

import Presenter from './FileRenameDialog.presenter';

interface FileRenameDialogProps {
  value?: File
}

function FileRenameDialog(props: FileRenameDialogProps) {

  const { value } = props;

  const {
    dispatch,
    state: {
      workFile
    }
  } = useStore();
  const { graph } = useService();
  const [ loading, setLoading ] = React.useState<boolean>(false);
  const [ open, setOpen ] = React.useState<boolean>(true);

  const handleOpenChange = React.useCallback((_?: Event, data?: boolean) => {
    const open = data || false;
    setOpen(open);
    if (!open) {
      dispatch(setDialogAction());
    }
  }, [
    dispatch
  ]);

  const handleSubmit = React.useCallback(async (e?: Event, data?: FileRenameDialogFormState) => {
    try {
      if (!workFile) {
        throw new Error();
      }
      if (!data?.id) {
        throw new Error();
      }
      if (!data?.baseName) {
        throw new Error();
      }
      setLoading(true);
      const file = await graph.renameFile(data, `${data.baseName}.md`);
      dispatch(updateExploreFile(file));
      if (data.id === workFile.id) {
        dispatch(setWorkFile({
          ...workFile,
          baseName: file.baseName,
          fullName: file.fullName
        }));
      }
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
    workFile
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

export default FileRenameDialog;
