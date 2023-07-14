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
  appendExploreFile,
  setDialogAction,
  setError,
  setWorkFile
} from '../../../../stores/Action';
import { ArgumentNullError, FileNotFoundError, FolderNotFoundError } from '../../../../types/Error';
import { Event } from '../../../../types/Event';
import { FileCreateDialogFormState } from '../../types/Form';

import Presenter from './FileCreateDialog.presenter';

function FileCreateDialog() {

  const {
    dispatch,
    state: {
      exploreFolder
    }
  } = useStore();
  const { graph } = useService();
  const [ loading, setLoading ] = React.useState<boolean>(false);

  const handleSubmit = React.useCallback(async (_?: Event, data?: FileCreateDialogFormState) => {
    try {
      if (data?.baseName == null) {
        throw new ArgumentNullError();
      }
      if (exploreFolder == null) {
        throw new FolderNotFoundError();
      }
      setLoading(true);
      const file = await Promise.resolve()
        .then(() => graph.createFile(exploreFolder, `${data.baseName}.md`))
        .then((file) => file ? graph.getFileById(file.id) : undefined);
      if (file == null) {
        throw new FileNotFoundError();
      }
      dispatch(appendExploreFile(file));
      dispatch(setWorkFile({
        ...file,
        content: '',
        editing: false
      }));
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
    exploreFolder,
    graph
  ]);

  return (
    <Presenter
      loading={loading}
      onSubmit={handleSubmit} />
  );

}

export default FileCreateDialog;
