//
// Copyright (c) 2023-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import Presenter from './Loader.presenter';

interface LoaderProps {
  loading?: boolean
}

function Loader(props: Readonly<React.PropsWithChildren<LoaderProps>>) {

  const {
    children,
    loading
  } = props;

  return (
    <Presenter loading={loading}>
      {children}
    </Presenter>
  );

}

export default Loader;
