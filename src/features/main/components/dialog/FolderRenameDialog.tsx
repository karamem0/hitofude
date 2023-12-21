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
  updateExploreFolder
} from '../../../../stores/Action';
import { ArgumentNullError } from '../../../../types/Error';
import { Event } from '../../../../types/Event';
import { Folder } from '../../../../types/Model';
import { FolderRenameDialogFormState } from '../../types/Form';

import Presenter from './FolderRenameDialog.presenter';

interface FolderRenameDialogProps {
  value?: Folder
}

function FolderRenameDialog(props: Readonly<FolderRenameDialogProps>) {

  const { value } = props;

  const { dispatch } = useStore();
  const { graph } = useService();
  const [ loading, setLoading ] = React.useState<boolean>(false);

  const handleSubmit = React.useCallback(async (_?: Event, data?: FolderRenameDialogFormState) => {
    try {
      if (data?.id == null) {
        throw new ArgumentNullError();
      }
      if (data?.name == null) {
        throw new ArgumentNullError();
      }
      setLoading(true);
      const folder = await graph.renameFolder(data, data.name);
      dispatch(updateExploreFolder(folder));
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

export default FolderRenameDialog;
