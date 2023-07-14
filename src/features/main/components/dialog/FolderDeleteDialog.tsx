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
  deleteExploreFolder,
  setDialogAction,
  setError
} from '../../../../stores/Action';
import { FileNotFoundError, FolderNotFoundError } from '../../../../types/Error';
import { Folder } from '../../../../types/Model';

import Presenter from './FolderDeleteDialog.presenter';

interface FolderDeleteDialogProps {
  value?: Folder
}

function FileDeleteDialog(props: FolderDeleteDialogProps) {

  const { value } = props;

  const {
    dispatch,
    state: {
      exploreFolder
    }
  } = useStore();
  const { graph } = useService();
  const [ loading, setLoading ] = React.useState<boolean>(false);

  const handleSubmit = React.useCallback(async () => {
    try {
      if (exploreFolder == null) {
        throw new FolderNotFoundError();
      }
      if (value == null) {
        throw new FileNotFoundError();
      }
      await graph.deleteExploreFolder(value);
      dispatch(deleteExploreFolder(value));
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
    graph,
    value
  ]);

  return (
    <Presenter
      loading={loading}
      onSubmit={handleSubmit} />
  );

}

export default FileDeleteDialog;
