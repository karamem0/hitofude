//
// Copyright (c) 2023-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import { BrowserCacheLocation } from '@azure/msal-browser';

export const msalConfig = {
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

export const loginParams = {
  scopes: [
    'User.Read',
    'Files.ReadWrite'
  ]
};
