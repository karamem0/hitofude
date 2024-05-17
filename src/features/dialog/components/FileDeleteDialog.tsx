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
  deleteExploreFile,
  setDialogAction,
  setError
} from '../../../stores/Action';
import { DependencyNullError } from '../../../types/Error';
import { File, TabType } from '../../../types/Model';
import { isSupportedFile } from '../../../utils/File';

import Presenter from './FileDeleteDialog.presenter';

interface FileDeleteDialogProps {
  value?: File
}

function FileDeleteDialog(props: Readonly<FileDeleteDialogProps>) {

  const { value } = props;

  const { route } = useRoute();
  const {
    dispatch,
    state: {
      explorerProps
    }
  } = useStore();
  const { graph } = useService();
  const [ loading, setLoading ] = React.useState<boolean>(false);

  const handleSubmit = React.useCallback(async () => {
    try {
      if (value == null) {
        throw new DependencyNullError();
      }
      const allFiles = explorerProps?.allFiles;
      const file = explorerProps?.file;
      if (file == null) {
        throw new DependencyNullError();
      }
      const folder = explorerProps?.folder;
      if (folder == null) {
        throw new DependencyNullError();
      }
      await graph.deleteExploreFile(value);
      dispatch(deleteExploreFile(value));
      if (value.id === file?.id) {
        const file = (folder.files ?? [])
          .filter((item) => (allFiles ?? false) || isSupportedFile(item))
          .filter((item) => item.id !== value.id)
          .at(-1);
        route.setParams({
          tab: TabType.explorer,
          folder: folder.id,
          file: file?.id
        });
      }
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
    explorerProps?.allFiles,
    explorerProps?.file,
    explorerProps?.folder,
    graph,
    route,
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
