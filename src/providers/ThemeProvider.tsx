//
// Copyright (c) 2023-2024 karamem0
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
import { InvalidOperationError } from '../types/Error';
import { ThemeName } from '../types/Model';

interface ThemeState {
  theme: Theme,
  themeName: ThemeName
}

interface ThemeContextState {
  theme: ThemeState,
  changeTheme: (themeName: ThemeName) => void
}

const ThemeContext = React.createContext<ThemeContextState | undefined>(undefined);

export const useTheme = (): ThemeContextState => {
  const value = React.useContext(ThemeContext);
  if (value == null) {
    throw new InvalidOperationError();
  }
  return value;
};

function ThemeProvider(props: Readonly<React.PropsWithChildren<unknown>>) {

  const { children } = props;

  const [ theme, setTheme ] = React.useState<ThemeState>({
    theme: lightTheme,
    themeName: ThemeName.light
  });

  const handleChangeTheme = React.useMemo(() => (value: ThemeName) => {
    switch (value) {
      case ThemeName.light:
        setTheme(() => ({
          theme: lightTheme,
          themeName: value
        }));
        break;
      case ThemeName.dark:
        setTheme(() => ({
          theme: darkTheme,
          themeName: value
        }));
        break;
      default:
        break;
    }
  }, []);

  const value = React.useMemo<ThemeContextState>(() => ({
    theme,
    changeTheme: handleChangeTheme
  }), [
    theme,
    handleChangeTheme
  ]);

  return (
    <ThemeContext.Provider value={value}>
      <Provider theme={value.theme.theme}>
        {children}
      </Provider>
    </ThemeContext.Provider>
  );

}

export default ThemeProvider;
