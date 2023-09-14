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
  setDialogAction,
  setError
} from '../../../../stores/Action';
import { ArgumentNullError, DependencyNullError } from '../../../../types/Error';
import { Event } from '../../../../types/Event';
import { FileCreateDialogFormState } from '../../types/Form';

import Presenter from './FileCreateDialog.presenter';

function FileCreateDialog() {

  const {
    dispatch,
    state: {
      exploreTabProps
    }
  } = useStore();
  const { graph } = useService();
  const [ loading, setLoading ] = React.useState<boolean>(false);

  const handleSubmit = React.useCallback(async (_?: Event, data?: FileCreateDialogFormState) => {
    try {
      if (data?.baseName == null) {
        throw new ArgumentNullError();
      }
      const exploreFolder = exploreTabProps?.folder;
      if (exploreFolder == null) {
        throw new DependencyNullError();
      }
      setLoading(true);
      const file = await Promise.resolve()
        .then(() => graph.createFile(exploreFolder, `${data.baseName}.md`))
        .then((file) => graph.getFileById(file.id));
      dispatch(appendExploreFile(file));
      dispatch(setContentFile(file));
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
    exploreTabProps?.folder,
    graph,
    dispatch
  ]);

  return (
    <Presenter
      loading={loading}
      onSubmit={handleSubmit} />
  );

}

export default FileCreateDialog;
