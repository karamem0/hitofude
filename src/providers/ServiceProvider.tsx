//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { Client } from '@microsoft/microsoft-graph-client';
import { GraphService } from '../services/GraphService';
import { InvalidOperationError } from '../types/Error';
import { StorageService } from '../services/StorageService';
import { loginParams } from '../config/MsalConfig';
import { useMsal } from '@azure/msal-react';

interface ServiceContextState {
  graph: GraphService,
  storage: StorageService
}

const ServiceContext = React.createContext<ServiceContextState | undefined>(undefined);

export const useService = (): ServiceContextState => {
  const value = React.useContext(ServiceContext);
  if (value == null) {
    throw new InvalidOperationError();
  }
  return value;
};

function ServiceProvider(props: Readonly<React.PropsWithChildren<unknown>>) {

  const { children } = props;

  const msal = useMsal();

  const value = React.useMemo<ServiceContextState>(() => ({
    graph: new GraphService(Client.initWithMiddleware({
      authProvider: {
        getAccessToken: () => msal.instance
          .acquireTokenSilent({
            ...loginParams,
            account: msal.accounts[0]
          })
          .then((result) => result.accessToken)
      }
    })),
    storage: new StorageService(localStorage)
  }), [
    msal
  ]);

  return (
    <ServiceContext.Provider value={value}>
      {children}
    </ServiceContext.Provider>
  );

}

export default ServiceProvider;
