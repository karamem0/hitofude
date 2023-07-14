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
import { setInitialState } from '../../../stores/Action';

import Presenter from './MainPage.presenter';

function MainPage() {

  const {
    dispatch,
    state: {
      tabMode
    }
  } = useStore();
  const { graph, storage } = useService();

  React.useEffect(() => {
    (async () => {
      dispatch(setInitialState({
        includeUnsupportedFiles: storage.getIncludeUnsupportedFiles(),
        rootFolder: await graph.getRootFolder(),
        minimapEnabled: storage.getMinimapEnabled(),
        tabMode: storage.getTabMode()
      }));
    })();
  }, [
    dispatch,
    graph,
    storage
  ]);

  return (
    <Presenter loading={!tabMode} />
  );

}

export default MainPage;
