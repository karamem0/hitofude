//
// Copyright (c) 2023-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import IntlProvider from '../../../providers/IntlProvider';
import Presenter from './MainPage.presenter';
import ThemeProvider from '../../../providers/ThemeProvider';
import { render } from '@testing-library/react';

vi.mock('../components/AppBar', () => ({
  default: ({ children }: React.PropsWithChildren<unknown>) => (
    <div data-testid="test-AppBar">
      {children}
    </div>
  )
}));

vi.mock('../components/AppTab', () => ({
  default: ({ children }: React.PropsWithChildren<unknown>) => (
    <div data-testid="test-AppTab">
      {children}
    </div>
  )
}));

vi.mock('../components/AppContent', () => ({
  default: ({ children }: React.PropsWithChildren<unknown>) => (
    <div data-testid="test-AppContent">
      {children}
    </div>
  )
}));

vi.mock('../components/MeControl', () => ({
  default: ({ children }: React.PropsWithChildren<unknown>) => (
    <div data-testid="test-MeControl">
      {children}
    </div>
  )
}));

vi.mock('../../dialog/factories/DialogFactory', () => ({
  default: ({ children }: React.PropsWithChildren<unknown>) => (
    <div data-testid="test-DialogFactory">
      {children}
    </div>
  )
}));

vi.mock('../../panel/factories/SidePanelFactory', () => ({
  default: ({ children }: React.PropsWithChildren<unknown>) => (
    <div data-testid="test-SidePanelFactory">
      {children}
    </div>
  )
}));

vi.mock('../../../common/components/ErrorNotification', () => ({
  default: ({ children }: React.PropsWithChildren<unknown>) => (
    <div data-testid="test-ErrorNotification">
      {children}
    </div>
  )
}));

it('should match the snapshot', () => {
  const params = {};
  const { asFragment } = render(
    <IntlProvider>
      <ThemeProvider>
        <Presenter {...params} />
      </ThemeProvider>
    </IntlProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});
