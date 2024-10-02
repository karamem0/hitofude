//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { Spinner } from '@fluentui/react-components';

interface LoaderProps {
  loading?: boolean
}

function Loader(props: Readonly<React.PropsWithChildren<LoaderProps>>) {

  const {
    children,
    loading
  } = props;

  return loading ? (
    <Spinner />
  ) : children;

}

export default React.memo(Loader);
