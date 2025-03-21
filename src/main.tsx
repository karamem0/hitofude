//
// Copyright (c) 2023-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import * as ReactDOM from 'react-dom/client';
import * as ress from 'ress';
import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom';
import Error404Page from './features/error/pages/Error404Page';
import Error500Page from './features/error/pages/Error500Page';
import { ErrorBoundary } from 'react-error-boundary';
import { Global } from '@emotion/react';
import HomePage from './features/home/pages/HomePage';
import IntlProvider from './providers/IntlProvider';
import MainPage from './features/main/pages/MainPage';
import MsalProvider from './providers/MsalProvider';
import RouteProvider from './providers/RouteProvider';
import ServiceProvider from './providers/ServiceProvider';
import StoreProvider from './providers/StoreProvider';
import TelemetryProvider from './providers/TelemetryProvider';
import ThemeProvider from './providers/ThemeProvider';

const element = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(element);

root.render(
  <React.StrictMode>
    <Global styles={ress} />
    <BrowserRouter>
      <TelemetryProvider>
        <IntlProvider>
          <ThemeProvider>
            <Routes>
              <Route
                path="/"
                element={(
                  <ErrorBoundary
                    fallbackRender={(props) => (
                      <Error500Page {...props} />
                    )}>
                    <MsalProvider>
                      <AuthenticatedTemplate>
                        <RouteProvider>
                          <ServiceProvider>
                            <StoreProvider>
                              <MainPage />
                            </StoreProvider>
                          </ServiceProvider>
                        </RouteProvider>
                      </AuthenticatedTemplate>
                      <UnauthenticatedTemplate>
                        <HomePage />
                      </UnauthenticatedTemplate>
                    </MsalProvider>
                  </ErrorBoundary>
                )} />
              <Route
                path="*"
                element={(
                  <Error404Page />
                )} />
            </Routes>
          </ThemeProvider>
        </IntlProvider>
      </TelemetryProvider>
    </BrowserRouter>
  </React.StrictMode>
);
