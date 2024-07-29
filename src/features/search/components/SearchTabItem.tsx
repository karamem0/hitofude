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
import { useStore } from '../../../providers/StoreProvider';
import { setError } from '../../../stores/Action';
import { ArgumentNullError } from '../../../types/Error';
import { Event } from '../../../types/Event';
import { TabType } from '../../../types/Model';
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
  const form = useForm<SearchTabItemFormState>();

  const handleClear = React.useCallback(() => {
    try {
      route.setParams({
        tab: TabType.search,
        search: ''
      });
    } catch (error) {
      dispatch(setError(error as Error));
    }
  }, [
    route,
    dispatch
  ]);

  const handleSubmit = React.useCallback(async (_: Event, data?: SearchTabItemFormState) => {
    try {
      if (data?.query == null) {
        throw new ArgumentNullError();
      }
      route.setParams({
        tab: TabType.search,
        search: data.query
      });
    } catch (error) {
      dispatch(setError(error as Error));
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
      onClear={handleClear}
      onSubmit={handleSubmit} />
  );

}

export default SearchTabItem;
