//
// Copyright (c) 2023-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { setInitialState } from '../stores/Action';
import { reducer } from '../stores/Reducer';
import { InvalidOperationError } from '../types/Error';
import { ThemeName } from '../types/Model';
import { Action, State } from '../types/Store';
import { useService } from './ServiceProvider';
import { useTheme } from './ThemeProvider';

interface StoreContextState {
  dispatch: React.Dispatch<Action>,
  state: State
}

const StoreContext = React.createContext<StoreContextState | undefined>(undefined);

export const useStore = (): StoreContextState => {
  const value = React.useContext(StoreContext);
  if (value == null) {
    throw new InvalidOperationError();
  }
  return value;
};

function StoreProvider(props: Readonly<React.PropsWithChildren<unknown>>) {

  const { children } = props;

  const { graph, storage } = useService();
  const { changeTheme } = useTheme();
  const [ state, dispatch ] = React.useReducer(
    reducer(storage),
    {}
  );

  const [ loading, setLoading ] = React.useState<boolean>(true);

  const value = React.useMemo<StoreContextState>(() => ({
    dispatch,
    state
  }), [
    state,
    dispatch
  ]);

  const executionLock = React.useRef<boolean>(false);

  React.useEffect(() => {
    (async () => {
      if (executionLock.current) {
        return;
      }
      try {
        executionLock.current = true;
        changeTheme(storage.getThemeName() ?? ThemeName.light);
        dispatch(setInitialState({
          contentProps: {
            editing: false,
            loading: false,
            scrollPosition: {
              scrollX: 0,
              scrollY: 0
            },
            showMinimap: storage.getContentShowMinimap(),
            showPreview: storage.getContentShowPreview(),
            syncScroll: storage.getContentSyncScroll(),
            text: '',
            wordWrap: storage.getContentWordWrap()
          },
          explorerProps: {
            allFiles: storage.getExplorerAllFiles(),
            rootFolder: await graph.getRootFolder()
          },
          markdownProps: {
            defaultText: '',
            scrollPosition: {
              scrollX: 0,
              scrollY: 0
            },
            text: ''
          },
          searchProps: {
            query: ''
          }
        }));
      } finally {
        executionLock.current = false;
        setLoading(false);
      }
    })();
  }, [
    graph,
    storage,
    changeTheme,
    dispatch
  ]);

  return (
    <StoreContext.Provider value={value}>
      {loading ? null : children}
    </StoreContext.Provider>
  );

}

export default StoreProvider;
