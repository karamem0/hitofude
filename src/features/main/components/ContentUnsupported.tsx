//
// Copyright (c) 2023-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { useStore } from '../../../providers/StoreProvider';

import Presenter from './ContentUnsupported.presenter';

function ContentUnsupported() {

  const {
    state: {
      contentProps
    }
  } = useStore();

  return (
    <Presenter src={contentProps?.previewUrl} />
  );

}

export default ContentUnsupported;
