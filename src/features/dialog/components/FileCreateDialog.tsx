//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { useRoute } from '../../../providers/RouteProvider';
import { useService } from '../../../providers/ServiceProvider';
import { useStore } from '../../../providers/StoreProvider';
import {
  appendExplorerFile,
  setDialogAction,
  setError
} from '../../../stores/Action';
import { ArgumentNullError, DependencyNullError } from '../../../types/Error';
import { Event } from '../../../types/Event';
import { TabType } from '../../../types/Model';
import { FileCreateDialogFormState } from '../types/Form';

import Presenter from './FileCreateDialog.presenter';

function FileCreateDialog() {

  const { route } = useRoute();
  const {
    dispatch,
    state: {
      explorerProps
    }
  } = useStore();
  const { graph } = useService();
  const [ loading, setLoading ] = React.useState<boolean>(false);

  const handleSubmit = React.useCallback(async (_: Event, data?: FileCreateDialogFormState) => {
    try {
      if (data?.baseName == null) {
        throw new ArgumentNullError();
      }
      const selectedFolder = explorerProps?.selectedFolder;
      if (selectedFolder == null) {
        throw new DependencyNullError();
      }
      setLoading(true);
      const file = await Promise.resolve()
        .then(() => graph.createFile(selectedFolder, `${data.baseName}.md`))
        .then((file) => graph.getFileById(file.id));
      dispatch(appendExplorerFile(file));
      route.setParams({
        tab: TabType.explorer,
        folder: selectedFolder.id,
        file: file?.id
      });
    } catch (error) {
      dispatch(setError(error as Error));
    } finally {
      setLoading(false);
      dispatch(setDialogAction());
    }
  }, [
    explorerProps?.selectedFolder,
    graph,
    route,
    dispatch
  ]);

  return (
    <Presenter
      loading={loading}
      onSubmit={handleSubmit} />
  );

}

export default FileCreateDialog;
