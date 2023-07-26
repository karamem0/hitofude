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
  setContentFile,
  setContentText,
  setDialogAction,
  setError
} from '../../../../stores/Action';
import { ArgumentNullError, DependencyNullError } from '../../../../types/Error';
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
      exploreProps
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
      const exploreFolder = exploreProps?.folder;
      if (exploreFolder == null) {
        throw new DependencyNullError();
      }
      setLoading(true);
      const fileText = await graph.getFileText(data);
      const file = await Promise.resolve()
        .then(() => graph.createFile(exploreFolder, `${data.baseName}.md`, fileText))
        .then((file) => graph.getFileById(file.id));
      dispatch(appendExploreFile(file));
      dispatch(setContentFile(file));
      dispatch(setContentText(await graph.getFileText(file)));
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
    exploreProps?.folder,
    graph,
    dispatch
  ]);

  return (
    <Presenter
      loading={loading}
      value={value}
      onSubmit={handleSubmit} />
  );

}

export default FileCopyDialog;
