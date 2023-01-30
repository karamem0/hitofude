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
  updateExploreFile
} from '../../../stores/Action';
import { Event } from '../../../types/Event';
import { File } from '../../../types/Model';
import { FileRenameDialogFormState } from '../types/Form';

import Presenter from './FileRenameDialog.presenter';

interface FileRenameDialogProps {
  file?: File
}

function FileRenameDialog(props: FileRenameDialogProps) {

  const { file } = props;

  const { dispatch } = useStore();
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
      dispatch(updateExploreFile(file));
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
      file={file}
      loading={loading}
      open={open}
      onOpenChange={handleOpenChange}
      onSubmit={handleSubmit} />
  );

}

export default FileRenameDialog;
