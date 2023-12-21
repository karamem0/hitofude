//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { Spinner } from '@fluentui/react-components';

interface LoaderProps {
  children?: React.ReactNode,
  loading?: boolean
}

function Loader(props: Readonly<LoaderProps>) {

  const {
    children,
    loading
  } = props;

  return loading ? (
    <Spinner />
  ) : (
    <React.Fragment>
      {children}
    </React.Fragment>
  );

}

export default React.memo(Loader);
