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
import { ArgumentNullError, FolderNotFoundError } from '../../../../types/Error';
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

  const handleSubmit = React.useCallback(async (_?: Event, data?: FileRenameDialogFormState) => {
    try {
      if (data?.id == null) {
        throw new ArgumentNullError();
      }
      if (data?.baseName == null) {
        throw new ArgumentNullError();
      }
      if (workFile == null) {
        throw new FolderNotFoundError();
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
      dispatch(setDialogAction());
    }
  }, [
    dispatch,
    graph,
    workFile
  ]);

  return (
    <Presenter
      loading={loading}
      value={value}
      onSubmit={handleSubmit} />
  );

}

export default FileRenameDialog;
