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

interface StoreContextState {
  dispatch: React.Dispatch<Action>,
  state: State
}

const StoreContext = React.createContext<StoreContextState | undefined>(undefined);

export const useStore = (): StoreContextState => {
  const value = React.useContext(StoreContext);
  if (!value) {
    throw new Error();
  }
  return value;
};

function StoreProvider(props: React.PropsWithChildren<unknown>) {

  const { children } = props;

  const [ state, dispatch ] = React.useReducer(reducer, {});

  return (
    <StoreContext.Provider
      value={{
        dispatch,
        state
      }}>
      {children}
    </StoreContext.Provider>
  );

}

export default StoreProvider;
