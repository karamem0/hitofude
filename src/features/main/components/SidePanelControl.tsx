//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { useStore } from '../../../providers/StoreProvider';

import Presenter from './SidePanelControl.presenter';

function SidePanelControl() {

  const {
    state: {
      sidePanelAction
    }
  } = useStore();

  return (
    <Presenter action={sidePanelAction} />
  );

}

export default SidePanelControl;