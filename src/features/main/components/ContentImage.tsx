//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { useStore } from '../../../providers/StoreProvider';

import Presenter from './ContentImage.presenter';

function ContentImage() {

  const {
    state: {
      contentProps
    }
  } = useStore();

  return (
    <Presenter file={contentProps?.file} />
  );

}

export default React.memo(ContentImage);
