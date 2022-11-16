//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { css } from '@emotion/react';
import { Spinner } from '@fluentui/react-components';

interface MsalLoaderProps {
  loading: boolean
}

function MsalLoader(props: React.PropsWithChildren<MsalLoaderProps>) {

  const {
    children,
    loading
  } = props;

  return loading ? (
    <div
      css={css`
      display: flex;
      flex-flow: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
    `}>
      <Spinner />
    </div>
  ) : (
    <React.Fragment>
      {children}
    </React.Fragment>
  );

}

export default MsalLoader;
