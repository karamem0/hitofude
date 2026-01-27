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
  setContentFile,
  setDialogAction,
  updateExplorerFile
} from '../../../stores/Action';
import { ArgumentNullError, DependencyNullError } from '../../../types/Error';
import { Event } from '../../../types/Event';
import { File } from '../../../types/Model';
import { FileRenameDialogFormState } from '../types/Form';

import Presenter from './FileRenameDialog.presenter';

interface FileRenameDialogProps {
  value?: File
}

function FileRenameDialog(props: Readonly<FileRenameDialogProps>) {

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

  const handleSubmit = React.useCallback(async (_: Event, data?: FileRenameDialogFormState) => {
    try {
      if (data?.id == null) {
        throw new ArgumentNullError();
      }
      if (data?.baseName == null) {
        throw new ArgumentNullError();
      }
      const contentFile = contentProps?.file;
      if (contentFile == null) {
        throw new DependencyNullError();
      }
      setLoading(true);
      const file = await graph.renameFile(data, `${data.baseName}.md`);
      dispatch(updateExplorerFile(file));
      if (data.id === contentFile.id) {
        dispatch(setContentFile({
          ...contentFile,
          baseName: file.baseName,
          fullName: file.fullName
        }));
      }
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
    contentProps?.file,
    graph,
    dispatch,
    dispatchToast
  ]);

  return (
    <Presenter
      loading={loading}
      value={value}
      onSubmit={handleSubmit} />
  );

}

export default FileRenameDialog;
