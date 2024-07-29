//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { useService } from '../../../providers/ServiceProvider';
import { useTheme } from '../../../providers/ThemeProvider';
import { Event } from '../../../types/Event';
import { ThemeName } from '../../../types/Model';

import Presenter from './ThemeChangeDialog.presenter';

function ThemeChangeDialog() {

  const { storage } = useService();
  const { themeName, changeTheme } = useTheme();

  const handleChangeTheme = React.useCallback((_: Event, data?: ThemeName) => {
    changeTheme?.(data ?? ThemeName.light);
    storage?.setThemeName(data ?? ThemeName.light);
  }, [
    storage,
    changeTheme
  ]);

  return (
    <Presenter
      themeName={themeName}
      onChangeTheme={handleChangeTheme} />
  );

}

export default ThemeChangeDialog;
