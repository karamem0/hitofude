//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import {
  BrowserCacheLocation,
  PublicClientApplication
} from '@azure/msal-browser';
import { MsalProvider as Provider } from '@azure/msal-react';

const msalConfig = {
  auth: {
    authority: import.meta.env.VITE_MSAL_AUTHORITY,
    clientId: import.meta.env.VITE_MSAL_CLIENT_ID,
    redirectUri: `${window.location.origin}`
  },
  cache: {
    cacheLocation: BrowserCacheLocation.SessionStorage,
    storeAuthStateInCookie: false
  }
};

function MsalProvider(props: React.PropsWithChildren<unknown>) {

  const { children } = props;

  return (
    <Provider instance={new PublicClientApplication(msalConfig)}>
      {children}
    </Provider>
  );

}

export default MsalProvider;
