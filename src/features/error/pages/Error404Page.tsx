//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import Presenter from './Error404Page.presenter';
import { ThemeName } from '../../../types/Model';
import { useTheme } from '../../../providers/ThemeProvider';

function Error404Page() {

  const { changeTheme } = useTheme();

  React.useEffect(() => {
    changeTheme(ThemeName.light);
  }, [
    changeTheme
  ]);

  return (
    <Presenter />
  );

}

export default Error404Page;
