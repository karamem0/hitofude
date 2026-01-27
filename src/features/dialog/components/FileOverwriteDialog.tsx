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
import {
  removeExplorerFileConflict,
  setContentFile,
  setContentText,
  setDialogAction
} from '../../../stores/Action';
import { DependencyNullError } from '../../../types/Error';
import { Event } from '../../../types/Event';
import { FileConflict } from '../../../types/Model';

import Presenter from './FileOverwriteDialog.presenter';

interface FileOverwriteDialogProps {
  value?: FileConflict
}

function FileOverwriteDialog(props: Readonly<FileOverwriteDialogProps>) {

  const { value } = props;

  const { dispatch } = useStore();
  const { graph } = useService();
  const dispatchToast = useToast();
  const [ loading, setLoading ] = React.useState<boolean>(false);

  const handleSubmit = React.useCallback(async (_: Event, data?: boolean) => {
    try {
      if (value?.id == null) {
        throw new DependencyNullError();
      }
      if (value?.data == null) {
        throw new DependencyNullError();
      }
      if (data === true) {
        const file = await graph.setFileContent(value, value.data);
        dispatch(setContentFile(file));
        dispatch(setContentText(await graph.getFileText(file)));
      }
      dispatch(removeExplorerFileConflict(value));
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

export default FileOverwriteDialog;
