//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { useService } from '../../../providers/ServiceProvider';
import { useStore } from '../../../providers/StoreProvider';
import {
  setError,
  setSearchFiles,
  setSearchQuery,
  setTabMode,
  setWorkFile,
  setWorkFolder
} from '../../../stores/Action';
import { FolderNotFoundError } from '../../../types/Error';
import { File, TabType } from '../../../types/Model';
import { SearchControlFormState } from '../types/Form';

import Presenter from './SearchControl.presenter';

function SearchControl() {

  const {
    dispatch,
    state: {
      searchFiles,
      searchQuery
    }
  } = useStore();
  const { graph } = useService();
  const [ loading, setLoading ] = React.useState(false);

  const handleChangeInput = React.useCallback((_, data?: string) => {
    dispatch(setSearchQuery(data));
  }, [
    dispatch
  ]);

  const handleClearInput = React.useCallback(() => {
    dispatch(setSearchQuery());
    dispatch(setSearchFiles());
    dispatch(setWorkFile());
  }, [
    dispatch
  ]);

  const handleOpenFileLocation = React.useCallback(async (_, data?: File) => {
    try {
      if (!data) {
        throw new Error();
      }
      const file = await graph.getFileById(data.id);
      if (!file.parentId) {
        throw new FolderNotFoundError();
      }
      const folder = await graph.getFolderById(file.parentId);
      dispatch(setWorkFolder(folder));
      dispatch(setTabMode({
        type: TabType.explorer,
        open: true
      }));
    } catch (e) {
      dispatch(setError(e as Error));
    }
  }, [
    dispatch,
    graph
  ]);

  const handleSelectFile = React.useCallback(async (_, data?: File) => {
    try {
      if (!data) {
        throw new Error();
      }
      const file = await graph.getFileById(data.id);
      const content = await graph.getFileContent(file);
      dispatch(setWorkFile({
        ...file,
        content
      }));
    } catch (e) {
      dispatch(setError(e as Error));
    }
  }, [
    dispatch,
    graph
  ]);

  const handleSubmit = React.useCallback(async (_, data?: SearchControlFormState) => {
    try {
      if (!data) {
        throw new Error();
      }
      if (!data.query) {
        return;
      }
      setLoading(true);
      dispatch(setSearchQuery(data.query));
      dispatch(setSearchFiles(await graph.searchFiles(data.query)));
    } catch (e) {
      dispatch(setError(e as Error));
    } finally {
      dispatch(setWorkFile());
      setLoading(false);
    }
  }, [
    dispatch,
    graph
  ]);

  return (
    <Presenter
      loading={loading}
      searchFiles={searchFiles}
      searchQuery={searchQuery}
      onChangeInput={handleChangeInput}
      onClearInput={handleClearInput}
      onOpenFileLocation={handleOpenFileLocation}
      onSelectFile={handleSelectFile}
      onSubmit={handleSubmit} />
  );

}

export default SearchControl;
