//
// Copyright (c) 2023-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import Presenter from './ContentImage.presenter';
import { useStore } from '../../../providers/StoreProvider';

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
