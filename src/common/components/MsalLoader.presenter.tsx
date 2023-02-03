//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

interface MsalLoaderProps {
  loading?: boolean
}

function MsalLoader(props: React.PropsWithChildren<MsalLoaderProps>) {

  const {
    children,
    loading
  } = props;

  return loading ? null : (
    <React.Fragment>
      {children}
    </React.Fragment>
  );

}

export default MsalLoader;
