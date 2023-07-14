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
  setSidePanelAction,
  setWorkFile
} from '../../../../stores/Action';
import { FileNotFoundError } from '../../../../types/Error';
import { FileVersion } from '../../../../types/Model';

import Presenter from './FileRestoreDialog.presenter';

interface FileRestoreDialogProps {
  value?: FileVersion
}

function FileDeleteDialog(props: FileRestoreDialogProps) {

  const { value } = props;

  const {
    dispatch,
    state: {
      workFile
    }
  } = useStore();
  const { graph } = useService();
  const [ loading, setLoading ] = React.useState<boolean>(false);

  const handleSubmit = React.useCallback(async () => {
    try {
      if (value == null) {
        throw new FileNotFoundError();
      }
      if (workFile == null) {
        throw new FileNotFoundError();
      }
      await graph.restoreFile(value);
      const content = await graph.getFileContent(workFile);
      dispatch(setWorkFile({
        ...workFile,
        content
      }));
    } catch (e) {
      if (e instanceof Error) {
        dispatch(setError(e));
        return;
      }
      throw e;
    } finally {
      setLoading(false);
      dispatch(setDialogAction());
      dispatch(setSidePanelAction());
    }
  }, [
    dispatch,
    graph,
    value,
    workFile
  ]);

  return (
    <Presenter
      loading={loading}
      onSubmit={handleSubmit} />
  );

}

export default FileDeleteDialog;
