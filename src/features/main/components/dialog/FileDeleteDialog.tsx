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
  setDialogAction,
  setError,
  setExploreFile,
  setWorkFile
} from '../../../../stores/Action';
import { Event } from '../../../../types/Event';
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
      exploreFile,
      exploreFolder,
      includeUnsupportedFiles
    }
  } = useStore();
  const { graph } = useService();
  const [ loading, setLoading ] = React.useState<boolean>(false);
  const [ open, setOpen ] = React.useState<boolean>(true);

  const handleOpenChange = React.useCallback((_?: Event, data?: boolean) => {
    const open = data ?? false;
    setOpen(open);
    if (!open) {
      dispatch(setDialogAction());
    }
  }, [
    dispatch
  ]);

  const handleSubmit = React.useCallback(async (e?: Event) => {
    try {
      if (!exploreFolder) {
        throw new Error();
      }
      if (!value) {
        throw new Error();
      }
      await graph.deleteExploreFile(value);
      dispatch(deleteExploreFile(value));
      if (value.id === exploreFile?.id) {
        const file = (exploreFolder.files ?? [])
          .filter((item) => (includeUnsupportedFiles ?? false) || isSupportedFile(item))
          .filter((item) => item.id !== value.id)
          .at(-1);
        if (file) {
          dispatch(setExploreFile(file));
          dispatch(setWorkFile({
            ...file,
            content: await graph.getFileContent(file),
            editing: false
          }));
        } else {
          dispatch(setExploreFile());
          dispatch(setWorkFile());
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
      handleOpenChange?.(e, false);
    }
  }, [
    dispatch,
    exploreFile,
    exploreFolder,
    graph,
    handleOpenChange,
    includeUnsupportedFiles,
    value
  ]);

  return (
    <Presenter
      loading={loading}
      open={open}
      onOpenChange={handleOpenChange}
      onSubmit={handleSubmit} />
  );

}

export default FileDeleteDialog;
