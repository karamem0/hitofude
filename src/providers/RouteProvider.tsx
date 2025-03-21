//
// Copyright (c) 2023-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import { InvalidOperationError } from '../types/Error';
import { RouteService } from '../services/RouteService';

interface RouteContextState {
  route: RouteService
}

const RouteContext = React.createContext<RouteContextState | undefined>(undefined);

export const useRoute = (): RouteContextState => {
  const value = React.useContext(RouteContext);
  if (value == null) {
    throw new InvalidOperationError();
  }
  return value;
};

function RouteProvider(props: Readonly<React.PropsWithChildren<unknown>>) {

  const { children } = props;

  const location = useLocation();
  const navigate = useNavigate();

  const value = React.useMemo<RouteContextState>(() => ({
    route: new RouteService(location, navigate)
  }), [
    location,
    navigate
  ]);

  return (
    <RouteContext.Provider value={value}>
      {children}
    </RouteContext.Provider>
  );

}

export default RouteProvider;
