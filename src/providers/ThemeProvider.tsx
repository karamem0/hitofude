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
  createLightTheme
} from '@fluentui/react-components';

export const themeConfig = createLightTheme({
  10: '#3f2e2e',
  20: '#4a3737',
  30: '#553f3f',
  40: '#5d4545',
  50: '#654b4b',
  60: '#6b5050',
  70: '#715454',
  80: '#795c5c',
  90: '#816464',
  100: '#957a7a',
  110: '#a98f8f',
  120: '#bfaaaa',
  130: '#d4c4c4',
  140: '#ded1d1',
  150: '#e8dede',
  160: '#f1ebeb'
});

function ThemeProvider(props: React.PropsWithChildren<unknown>) {

  const { children } = props;

  return (
    <Provider theme={themeConfig}>
      {children}
    </Provider>
  );

}

export default ThemeProvider;
