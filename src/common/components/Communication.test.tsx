//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import Communication from './Communication.presenter';
import IntlProvider from '../../providers/IntlProvider';
import ThemeProvider from '../../providers/ThemeProvider';
import { render } from '@testing-library/react';

it('should create shapshot', async () => {
  const params = {
    description: 'Something went wrong',
    image: 'https://example.com/image.png',
    title: '500 Internal Server Error'
  };
  const { asFragment } = render(
    <IntlProvider>
      <ThemeProvider>
        <Communication {...params} />
      </ThemeProvider>
    </IntlProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});
