//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { reducer } from '../stores/Reducer';
import { Action, State } from '../types/Store';

import { useService } from './ServiceProvider';

interface StoreContextState {
  dispatch: React.Dispatch<Action>,
  state: State
}

const StoreContext = React.createContext<StoreContextState | undefined>(undefined);

export const useStore = (): StoreContextState => {
  const value = React.useContext(StoreContext);
  if (value == null) {
    throw new Error();
  }
  return value;
};

function StoreProvider(props: React.PropsWithChildren<unknown>) {

  const { children } = props;

  const { storage } = useService();
  const [ state, dispatch ] = React.useReducer(
    reducer(storage),
    {
      loading: true
    });

  const value = React.useMemo(() => ({
    dispatch,
    state
  }), [
    dispatch,
    state
  ]);

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );

}

export default StoreProvider;
