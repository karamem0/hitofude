//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { useService } from '../../../providers/ServiceProvider';
import { useStore } from '../../../providers/StoreProvider';
import {
  appendExplorerFile,
  setContentFile,
  setContentText,
  setDialogAction,
  setError
} from '../../../stores/Action';
import { ArgumentNullError, DependencyNullError } from '../../../types/Error';
import { Event } from '../../../types/Event';
import { File } from '../../../types/Model';
import { FileCopyDialogFormState } from '../types/Form';

import Presenter from './FileCopyDialog.presenter';

interface FileCopyDialogProps {
  value?: File
}

function FileCopyDialog(props: Readonly<FileCopyDialogProps>) {

  const { value } = props;

  const { dispatch } = useStore();
  const { graph } = useService();
  const [ loading, setLoading ] = React.useState<boolean>(false);

  const handleSubmit = React.useCallback(async (_: Event, data?: FileCopyDialogFormState) => {
    try {
      if (data?.baseName == null) {
        throw new ArgumentNullError();
      }
      if (value == null) {
        throw new DependencyNullError();
      }
      setLoading(true);
      const file = await graph.copyFile(value, `${data.baseName}${value.extension}`);
      dispatch(appendExplorerFile(file));
      dispatch(setContentFile(file));
      dispatch(setContentText(await graph.getFileText(file)));
    } catch (error) {
      dispatch(setError(error as Error));
    } finally {
      setLoading(false);
      dispatch(setDialogAction());
    }
  }, [
    graph,
    value,
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
