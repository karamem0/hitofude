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
  removeExplorerFile,
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
      const selectedFile = explorerProps?.selectedFile;
      const selectedFolder = explorerProps?.selectedFolder;
      if (selectedFolder == null) {
        throw new DependencyNullError();
      }
      await graph.deleteFile(value);
      dispatch(removeExplorerFile(value));
      if (value.id === selectedFile?.id) {
        const file = (selectedFolder.files ?? [])
          .filter((item) => (allFiles ?? false) || isSupportedFile(item))
          .filter((item) => item.id !== value.id)
          .at(-1);
        route.setParams({
          tab: TabType.explorer,
          folder: selectedFolder.id,
          file: file?.id
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setError(error));
        return;
      }
      throw error;
    } finally {
      setLoading(false);
      dispatch(setDialogAction());
    }
  }, [
    explorerProps?.allFiles,
    explorerProps?.selectedFile,
    explorerProps?.selectedFolder,
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
