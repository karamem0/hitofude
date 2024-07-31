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
import { ArgumentNullError } from '../../../types/Error';
import { Event } from '../../../types/Event';
import { TabType } from '../../../types/Model';
import { SearchTabPanelFormField, SearchTabPanelFormState } from '../types/Form';

import Presenter from './SearchTabPanel.presenter';

function SearchTabPanel() {

  const { route } = useRoute();
  const {
    state: {
      searchProps
    }
  } = useStore();
  const form = useForm<SearchTabPanelFormState>();

  const handleClear = React.useCallback((_: Event, data?: SearchTabPanelFormField) => {
    if (data == null) {
      throw new ArgumentNullError();
    }
    form.setValue(data, '');
    route.setParams({
      tab: TabType.search,
      search: ''
    });
  },
  [
    form,
    route
  ]);

  const handleSubmit = React.useCallback(async (_: Event, data?: SearchTabPanelFormState) => {
    if (data?.query == null) {
      throw new ArgumentNullError();
    }
    route.setParams({
      tab: TabType.search,
      search: data.query
    });
  }, [
    route
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

export default SearchTabPanel;
