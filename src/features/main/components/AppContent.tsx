//
// Copyright (c) 2023-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import Presenter from './AppContent.presenter';
import { useStore } from '../../../providers/StoreProvider';

function AppContent() {

  const {
    state: {
      contentProps
    }
  } = useStore();

  return (
    <Presenter {...contentProps} />
  );

}

export default AppContent;
