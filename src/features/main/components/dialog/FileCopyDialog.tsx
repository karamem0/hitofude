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
import { ArgumentNullError, FileNotFoundError } from '../../../../types/Error';
import { Event } from '../../../../types/Event';
import { File } from '../../../../types/Model';
import { FileCopyDialogFormState } from '../../types/Form';

import Presenter from './FileCopyDialog.presenter';

interface FileCopyDialogProps {
  value?: File
}

function FileCopyDialog(props: FileCopyDialogProps) {

  const { value } = props;

  const {
    dispatch,
    state: {
      exploreFolder
    }
  } = useStore();
  const { graph } = useService();
  const [ loading, setLoading ] = React.useState<boolean>(false);

  const handleSubmit = React.useCallback(async (_?: Event, data?: FileCopyDialogFormState) => {
    try {
      if (data?.baseName == null) {
        throw new ArgumentNullError();
      }
      if (data?.downloadUrl == null) {
        throw new ArgumentNullError();
      }
      if (exploreFolder == null) {
        throw new ArgumentNullError();
      }
      setLoading(true);
      const fileContent = await graph.getFileContent(data);
      const file = await Promise.resolve()
        .then(() => graph.createFile(exploreFolder, `${data.baseName}.md`, fileContent))
        .then((file) => file ? graph.getFileById(file.id) : undefined);
      if (file == null) {
        throw new FileNotFoundError();
      }
      dispatch(appendExploreFile(file));
      dispatch(setWorkFile({
        ...file,
        content: fileContent,
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
      value={value}
      onSubmit={handleSubmit} />
  );

}

export default FileCopyDialog;
