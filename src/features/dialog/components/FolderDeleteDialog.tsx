//
// Copyright (c) 2023-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { useToast } from '../../../common/providers/ToastProvider';
import { useService } from '../../../providers/ServiceProvider';
import { useStore } from '../../../providers/StoreProvider';
import { removeExplorerFolder, setDialogAction } from '../../../stores/Action';
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
  const dispatchToast = useToast();
  const [ loading, setLoading ] = React.useState<boolean>(false);

  const handleSubmit = React.useCallback(async () => {
    try {
      if (value == null) {
        throw new DependencyNullError();
      }
      await graph.deleteFolder(value);
      dispatch(removeExplorerFolder(value));
    } catch (error) {
      if (error instanceof Error) {
        dispatchToast(error, 'error');
      } else {
        throw error;
      }
    } finally {
      setLoading(false);
      dispatch(setDialogAction());
    }
  }, [
    graph,
    value,
    dispatch,
    dispatchToast
  ]);

  return (
    <Presenter
      loading={loading}
      onSubmit={handleSubmit} />
  );

}

export default FileDeleteDialog;
