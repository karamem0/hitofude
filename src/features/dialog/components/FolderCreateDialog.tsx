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
  appendExplorerFolder,
  setDialogAction,
  setError
} from '../../../stores/Action';
import { ArgumentNullError, DependencyNullError } from '../../../types/Error';
import { Event } from '../../../types/Event';
import { FolderCreateDialogFormState } from '../types/Form';

import Presenter from './FolderCreateDialog.presenter';

function FolderCreateDialog() {

  const {
    dispatch,
    state: {
      explorerProps
    }
  } = useStore();
  const { graph } = useService();
  const [ loading, setLoading ] = React.useState<boolean>(false);

  const handleSubmit = React.useCallback(async (_: Event, data?: FolderCreateDialogFormState) => {
    try {
      if (data?.name == null) {
        throw new ArgumentNullError();
      }
      const selectedFolder = explorerProps?.selectedFolder;
      if (selectedFolder == null) {
        throw new DependencyNullError();
      }
      setLoading(true);
      const folder = await graph.createFolder(selectedFolder, `${data.name}`);
      dispatch(appendExplorerFolder(folder));
    } catch (error) {
      dispatch(setError(error as Error));
    } finally {
      setLoading(false);
      dispatch(setDialogAction());
    }
  }, [
    explorerProps?.selectedFolder,
    graph,
    dispatch
  ]);

  return (
    <Presenter
      loading={loading}
      onSubmit={handleSubmit} />
  );

}

export default FolderCreateDialog;
