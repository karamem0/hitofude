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
  appendExploreFile,
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

  const handleSubmit = React.useCallback(async (_?: Event, data?: FileCreateDialogFormState) => {
    try {
      if (data?.baseName == null) {
        throw new ArgumentNullError();
      }
      const folder = explorerProps?.folder;
      if (folder == null) {
        throw new DependencyNullError();
      }
      setLoading(true);
      const file = await Promise.resolve()
        .then(() => graph.createFile(folder, `${data.baseName}.md`))
        .then((file) => graph.getFileById(file.id));
      dispatch(appendExploreFile(file));
      route.setParams({
        tab: TabType.explorer,
        folder: folder.id,
        file: file?.id
      });
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
    explorerProps?.folder,
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
