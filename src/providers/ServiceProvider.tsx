//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { useMsal } from '@azure/msal-react';
import { Client } from '@microsoft/microsoft-graph-client';

import { GraphService } from '../services/GraphService';
import { StorageService } from '../services/StorageService';

interface ServiceContextState {
  graph: GraphService,
  storage: StorageService
}

const ServiceContext = React.createContext<ServiceContextState | undefined>(undefined);

export const useService = (): ServiceContextState => {
  const value = React.useContext(ServiceContext);
  if (!value) {
    throw new Error();
  }
  return value;
};

function ServiceProvider(props: React.PropsWithChildren<unknown>) {

  const { children } = props;

  const msal = useMsal();

  return (
    <ServiceContext.Provider
      value={{
        graph: new GraphService(Client.initWithMiddleware({
          authProvider: {
            getAccessToken: () => msal.instance
              .acquireTokenSilent({
                account: msal.accounts[0],
                scopes: [
                  'User.Read',
                  'Files.ReadWrite'
                ]
              })
              .then((result) => result.accessToken)
          }
        })),
        storage: new StorageService(localStorage)
      }}>
      {children}
    </ServiceContext.Provider>
  );

}

export default ServiceProvider;
