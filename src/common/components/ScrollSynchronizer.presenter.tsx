//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

interface ScrollSynchronizerProps {
  children?: React.ReactNode
}

function ScrollSynchronizer(props: Readonly<ScrollSynchronizerProps>) {

  const { children } = props;

  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  );

}

export default React.memo(ScrollSynchronizer);
