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
  appendExploreFolder,
  setDialogAction,
  setError
} from '../../../../stores/Action';
import { ArgumentNullError, FolderNotFoundError } from '../../../../types/Error';
import { Event } from '../../../../types/Event';
import { FolderCreateDialogFormState } from '../../types/Form';

import Presenter from './FolderCreateDialog.presenter';

function FolderCreateDialog() {

  const {
    dispatch,
    state: {
      exploreFolder
    }
  } = useStore();
  const { graph } = useService();
  const [ loading, setLoading ] = React.useState<boolean>(false);

  const handleSubmit = React.useCallback(async (_?: Event, data?: FolderCreateDialogFormState) => {
    try {
      if (data?.name == null) {
        throw new ArgumentNullError();
      }
      if (exploreFolder == null) {
        throw new FolderNotFoundError();
      }
      setLoading(true);
      const folder = await graph.createFolder(exploreFolder, `${data.name}`);
      dispatch(appendExploreFolder(folder));
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
    exploreFolder
  ]);

  return (
    <Presenter
      loading={loading}
      onSubmit={handleSubmit} />
  );

}

export default FolderCreateDialog;
