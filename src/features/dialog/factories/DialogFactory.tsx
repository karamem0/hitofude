//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import Presenter from './DialogFactory.presenter';
import { useStore } from '../../../providers/StoreProvider';

function DialogFactory() {

  const {
    state: {
      dialogAction
    }
  } = useStore();

  return (
    <Presenter action={dialogAction} />
  );

}

export default DialogFactory;
