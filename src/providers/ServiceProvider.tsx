//
// Copyright (c) 2023-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { CacheRepository } from '../repositories/CacheRepository';
import { Client } from '@microsoft/microsoft-graph-client';
import { GraphRepository } from '../repositories/GraphRepository';
import { GraphService } from '../services/GraphService';
import { InvalidOperationError } from '../types/Error';
import { StorageService } from '../services/StorageService';
import { database } from '../config/DatabaseConfig';
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
    graph: new GraphService(
      new CacheRepository(database),
      new GraphRepository(Client.initWithMiddleware({
        authProvider: {
          getAccessToken: () => msal.instance
            .acquireTokenSilent({
              ...loginParams,
              account: msal.accounts[0]
            })
            .then((result) => result.accessToken)
        }
      }))),
    storage: new StorageService(
      localStorage,
      msal.accounts[0].localAccountId,
      msal.accounts[0].tenantId
    )
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
