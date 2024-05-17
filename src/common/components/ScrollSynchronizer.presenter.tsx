//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

function ScrollSynchronizer(props: Readonly<React.PropsWithChildren<unknown>>) {

  const { children } = props;

  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  );

}

export default React.memo(ScrollSynchronizer);
