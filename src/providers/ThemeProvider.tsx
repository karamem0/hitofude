//
// Copyright (c) 2023-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { FluentProvider as Provider, Theme } from '@fluentui/react-components';
import { InvalidOperationError } from '../types/Error';
import { ThemeName } from '../types/Model';
import { themes } from '../themes/Theme';

interface ThemeContextState {
  theme: Theme,
  themeName: ThemeName,
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

  const [ themeName, setThemeName ] = React.useState<ThemeName>(ThemeName.light);

  const handleChangeTheme = React.useMemo(() => (value: ThemeName) => {
    setThemeName(value);
  }, []);

  const value = React.useMemo<ThemeContextState>(() => ({
    theme: themes[themeName],
    themeName,
    changeTheme: handleChangeTheme
  }), [
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
