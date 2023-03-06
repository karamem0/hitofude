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
import { setInitialValue } from '../../../stores/Action';

import Presenter from './MainPage.presenter';

function MainPage() {

  const {
    dispatch,
    state: {
      tabMode
    }
  } = useStore();
  const { storage } = useService();

  React.useEffect(() => {
    dispatch(setInitialValue({
      includeUnsupportedFiles: storage.getIncludeUnsupportedFiles(),
      tabMode: storage.getTabMode()
    }));
  }, [
    dispatch,
    storage
  ]);

  return (
    <Presenter loading={!tabMode} />
  );

}

export default MainPage;
