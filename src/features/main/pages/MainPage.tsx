//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { useRoute } from '../../../providers/RouteProvider';
import { useService } from '../../../providers/ServiceProvider';
import { useStore } from '../../../providers/StoreProvider';
import { setTabOpen, setTabType } from '../../../stores/Action';

import Presenter from './MainPage.presenter';

function MainPage() {

  const { route } = useRoute();
  const {
    dispatch,
    state: {
      tabProps
    }
  } = useStore();
  const { storage } = useService();

  React.useEffect(() => {
    const { tab } = route.getParams();
    if (tab == null) {
      route.setParams({
        tab: storage.getTabType()
      });
    } else {
      dispatch(setTabType(tab));
      dispatch(setTabOpen(storage.getTabOpen()));
    }
  }, [
    route,
    storage,
    dispatch
  ]);

  return (
    <Presenter loading={tabProps?.type == null} />
  );

}

export default MainPage;
