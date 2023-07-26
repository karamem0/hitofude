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
  deleteExploreFile,
  setContentFile,
  setContentText,
  setDialogAction,
  setError,
  setExploreFile
} from '../../../../stores/Action';
import { DependencyNullError } from '../../../../types/Error';
import { File } from '../../../../types/Model';
import { isSupportedFile } from '../../../../utils/File';

import Presenter from './FileDeleteDialog.presenter';

interface FileDeleteDialogProps {
  value?: File
}

function FileDeleteDialog(props: FileDeleteDialogProps) {

  const { value } = props;

  const {
    dispatch,
    state: {
      exploreProps
    }
  } = useStore();
  const { graph } = useService();
  const [ loading, setLoading ] = React.useState<boolean>(false);

  const handleSubmit = React.useCallback(async () => {
    try {
      if (value == null) {
        throw new DependencyNullError();
      }
      const allFiles = exploreProps?.allFiles;
      const exploreFile = exploreProps?.file;
      if (exploreFile == null) {
        throw new DependencyNullError();
      }
      const exploreFolder = exploreProps?.folder;
      if (exploreFolder == null) {
        throw new DependencyNullError();
      }
      await graph.deleteExploreFile(value);
      dispatch(deleteExploreFile(value));
      if (value.id === exploreFile?.id) {
        const file = (exploreFolder.files ?? [])
          .filter((item) => (allFiles ?? false) || isSupportedFile(item))
          .filter((item) => item.id !== value.id)
          .at(-1);
        if (file != null) {
          dispatch(setExploreFile(file));
          dispatch(setContentFile(file));
          dispatch(setContentText(await graph.getFileText(file)));
        } else {
          dispatch(setExploreFile());
          dispatch(setContentFile());
        }
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
    exploreProps?.allFiles,
    exploreProps?.file,
    exploreProps?.folder,
    graph,
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
