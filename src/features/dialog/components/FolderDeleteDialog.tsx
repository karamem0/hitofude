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
  removeExplorerFolder,
  setDialogAction,
  setError
} from '../../../stores/Action';
import { DependencyNullError } from '../../../types/Error';
import { Folder } from '../../../types/Model';

import Presenter from './FolderDeleteDialog.presenter';

interface FolderDeleteDialogProps {
  value?: Folder
}

function FileDeleteDialog(props: Readonly<FolderDeleteDialogProps>) {

  const { value } = props;

  const { dispatch } = useStore();
  const { graph } = useService();
  const [ loading, setLoading ] = React.useState<boolean>(false);

  const handleSubmit = React.useCallback(async () => {
    try {
      if (value == null) {
        throw new DependencyNullError();
      }
      await graph.deleteFolder(value);
      dispatch(removeExplorerFolder(value));
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
      onSubmit={handleSubmit} />
  );

}

export default FileDeleteDialog;
