//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import {
  FluentProvider as Provider,
  Theme
} from '@fluentui/react-components';

import { darkTheme, lightTheme } from '../themes/Theme';
import { ThemeName } from '../types/Model';

interface ThemeContextState {
  theme: Theme,
  themeName: ThemeName,
  changeTheme: (themeName: ThemeName) => void
}

const ThemeContext = React.createContext<ThemeContextState | undefined>(undefined);

export const useTheme = (): ThemeContextState => {
  const value = React.useContext(ThemeContext);
  if (value == null) {
    throw new Error();
  }
  return value;
};

function ThemeProvider(props: React.PropsWithChildren<unknown>) {

  const { children } = props;

  const [ theme, setTheme ] = React.useState<Theme>(lightTheme);
  const [ themeName, setThemeName ] = React.useState<ThemeName>(ThemeName.light);

  const handleChangeTheme = React.useCallback((value: ThemeName) => {
    switch (value) {
      case ThemeName.light:
        setTheme(() => lightTheme);
        setThemeName(() => value);
        break;
      case ThemeName.dark:
        setTheme(() => darkTheme);
        setThemeName(() => value);
        break;
      default:
        break;
    }
  }, []);

  const value = React.useMemo(() => ({
    theme,
    themeName,
    changeTheme: handleChangeTheme
  }), [
    theme,
    themeName,
    handleChangeTheme
  ]);

  return (
    <ThemeContext.Provider value={value}>
      <Provider theme={value.theme}>
        {children}
      </Provider>
    </ThemeContext.Provider>
  );

}

export default ThemeProvider;
