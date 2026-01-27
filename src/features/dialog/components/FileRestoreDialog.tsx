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
  setContentText,
  setDialogAction,
  setSidePanelAction
} from '../../../stores/Action';
import { DependencyNullError } from '../../../types/Error';
import { FileVersion } from '../../../types/Model';

import Presenter from './FileRestoreDialog.presenter';

interface FileRestoreDialogProps {
  value?: FileVersion
}

function FileDeleteDialog(props: Readonly<FileRestoreDialogProps>) {

  const { value } = props;

  const {
    dispatch,
    state: {
      contentProps
    }
  } = useStore();
  const { graph } = useService();
  const dispatchToast = useToast();
  const [ loading, setLoading ] = React.useState<boolean>(false);

  const handleSubmit = React.useCallback(async () => {
    try {
      if (value == null) {
        throw new DependencyNullError();
      }
      const contentFile = contentProps?.file;
      if (contentFile == null) {
        throw new DependencyNullError();
      }
      await graph.restoreFile(value);
      dispatch(setContentText(await graph.getFileText(contentFile)));
    } catch (error) {
      if (error instanceof Error) {
        dispatchToast(error, 'error');
      } else {
        throw error;
      }
    } finally {
      setLoading(false);
      dispatch(setDialogAction());
      dispatch(setSidePanelAction());
    }
  }, [
    contentProps?.file,
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
