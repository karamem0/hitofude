//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import ReactDOM from 'react-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';

import MsalLoader from './common/components/MsalLoader';
import Error404Page from './features/error/pages/Error404Page';
import Error500Page from './features/error/pages/Error500Page';
import HomePage from './features/home/pages/HomePage';
import MainPage from './features/main/pages/MainPage';
import IntlProvider from './providers/IntlProvider';
import MsalProvider from './providers/MsalProvider';
import ServiceProvider from './providers/ServiceProvider';
import StoreProvider from './providers/StoreProvider';
import TelemetryProvider from './providers/TelemetryProvider';
import ThemeProvider from './providers/ThemeProvider';

import 'ress';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <TelemetryProvider>
        <IntlProvider>
          <ThemeProvider>
            <Routes>
              <Route
                path="/"
                element={(
                  <ErrorBoundary fallback={<Error500Page />}>
                    <MsalProvider>
                      <MsalLoader>
                        <AuthenticatedTemplate>
                          <ServiceProvider>
                            <StoreProvider>
                              <MainPage />
                            </StoreProvider>
                          </ServiceProvider>
                        </AuthenticatedTemplate>
                        <UnauthenticatedTemplate>
                          <HomePage />
                        </UnauthenticatedTemplate>
                      </MsalLoader>
                    </MsalProvider>
                  </ErrorBoundary>
                )} />
              <Route
                element={<Error404Page />}
                path="*" />
            </Routes>
          </ThemeProvider>
        </IntlProvider>
      </TelemetryProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
