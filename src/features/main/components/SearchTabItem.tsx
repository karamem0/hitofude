//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { useForm } from 'react-hook-form';

import { useRoute } from '../../../providers/RouteProvider';
import { useService } from '../../../providers/ServiceProvider';
import { useStore } from '../../../providers/StoreProvider';
import { setError } from '../../../stores/Action';
import {
  ArgumentNullError,
  FolderNotFoundError
} from '../../../types/Error';
import { Event } from '../../../types/Event';
import { File, TabType } from '../../../types/Model';
import { SearchTabItemFormState } from '../types/Form';

import Presenter from './SearchTabItem.presenter';

function SearchTabItem() {

  const { route } = useRoute();
  const {
    dispatch,
    state: {
      searchProps
    }
  } = useStore();
  const { graph } = useService();
  const form = useForm<SearchTabItemFormState>();

  const handleClearInput = React.useCallback(() => {
    try {
      route.setParams({
        tab: TabType.search,
        search: ''
      });
    } catch (e) {
      dispatch(setError(e as Error));
    }
  }, [
    route,
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
      route.setParams({
        tab: TabType.explorer,
        folder: folder.id,
        file: data.id
      });
    } catch (e) {
      dispatch(setError(e as Error));
    }
  }, [
    graph,
    route,
    dispatch
  ]);

  const handleSelectFile = React.useCallback(async (_?: Event, data?: File) => {
    try {
      if (data == null) {
        throw new ArgumentNullError();
      }
      route.setParams({
        tab: TabType.search,
        search: searchProps?.query,
        file: data.id
      });
    } catch (e) {
      dispatch(setError(e as Error));
    }
  }, [
    searchProps?.query,
    route,
    dispatch
  ]);

  const handleSubmit = React.useCallback(async (_?: Event, data?: SearchTabItemFormState) => {
    try {
      if (data?.query == null) {
        throw new ArgumentNullError();
      }
      route.setParams({
        tab: TabType.search,
        search: data.query
      });
    } catch (e) {
      dispatch(setError(e as Error));
    }
  }, [
    route,
    dispatch
  ]);

  React.useEffect(() => {
    form.setValue('query', searchProps?.query);
  }, [
    form,
    searchProps?.query
  ]);

  return (
    <Presenter
      {...searchProps}
      form={form}
      onClearInput={handleClearInput}
      onOpenFileLocation={handleOpenFileLocation}
      onSelectFile={handleSelectFile}
      onSubmit={handleSubmit} />
  );

}

export default SearchTabItem;
