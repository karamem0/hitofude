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
  setExploreFile,
  setExploreFolder,
  setSearchResults,
  setSearchQuery,
  setTabMode,
  setContentFile,
  setSearchFile,
  setContentText
} from '../../../stores/Action';
import { ArgumentNullError, FolderNotFoundError } from '../../../types/Error';
import { Event } from '../../../types/Event';
import { File, TabType } from '../../../types/Model';
import { SearchTabItemFormState } from '../types/Form';

import Presenter from './SearchTabItem.presenter';

function SearchTabItem() {

  const {
    dispatch,
    state: {
      searchTabProps
    }
  } = useStore();
  const { graph } = useService();
  const [ loading, setLoading ] = React.useState(false);

  const handleChangeInput = React.useCallback((_?: Event, data?: string) => {
    dispatch(setSearchQuery(data));
  }, [
    dispatch
  ]);

  const handleClearInput = React.useCallback(() => {
    dispatch(setSearchQuery());
    dispatch(setSearchResults());
    dispatch(setContentFile());
  }, [
    dispatch
  ]);

  const handleOpenFileLocation = React.useCallback(async (_?: Event, data?: File) => {
    try {
      if (data == null) {
        throw new ArgumentNullError();
      }
      const file = await graph.getFileById(data.id);
      if (file.parentId == null) {
        throw new FolderNotFoundError();
      }
      const folder = await graph.getFolderById(file.parentId);
      dispatch(setExploreFolder(folder));
      dispatch(setExploreFile(file));
      dispatch(setContentFile(file));
      dispatch(setContentText(await graph.getFileText(file)));
      dispatch(setTabMode({
        type: TabType.explorer,
        open: true
      }));
    } catch (e) {
      dispatch(setError(e as Error));
    }
  }, [
    graph,
    dispatch
  ]);

  const handleSelectFile = React.useCallback(async (_?: Event, data?: File) => {
    try {
      if (data == null) {
        throw new ArgumentNullError();
      }
      const file = await graph.getFileById(data.id);
      dispatch(setSearchFile(file));
      dispatch(setContentFile(file));
      dispatch(setContentText(await graph.getFileText(file)));
    } catch (e) {
      dispatch(setError(e as Error));
    }
  }, [
    graph,
    dispatch
  ]);

  const handleSubmit = React.useCallback(async (_?: Event, data?: SearchTabItemFormState) => {
    try {
      if (data?.query == null) {
        throw new ArgumentNullError();
      }
      setLoading(true);
      dispatch(setSearchQuery(data.query));
      dispatch(setSearchResults(await graph.searchResults(data.query)));
    } catch (e) {
      dispatch(setError(e as Error));
    } finally {
      dispatch(setContentFile());
      setLoading(false);
    }
  }, [
    graph,
    dispatch
  ]);

  return (
    <Presenter
      {...searchTabProps}
      loading={loading}
      onChangeInput={handleChangeInput}
      onClearInput={handleClearInput}
      onOpenFileLocation={handleOpenFileLocation}
      onSelectFile={handleSelectFile}
      onSubmit={handleSubmit} />
  );

}

export default SearchTabItem;
