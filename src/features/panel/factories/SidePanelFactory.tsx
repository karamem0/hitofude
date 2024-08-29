//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import Presenter from './SidePanelFactory.presenter';
import { useStore } from '../../../providers/StoreProvider';

function SidePanelFactory() {

  const {
    state: {
      sidePanelAction
    }
  } = useStore();

  return (
    <Presenter action={sidePanelAction} />
  );

}

export default SidePanelFactory;
