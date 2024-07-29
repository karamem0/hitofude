//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { setDialogAction, setError, setInitialState } from '../stores/Action';
import { reducer } from '../stores/Reducer';
import { ArgumentNullError, InvalidOperationError } from '../types/Error';
import { Event, EventHandler } from '../types/Event';
import { DialogAction, ThemeName } from '../types/Model';
import { Action, State } from '../types/Store';

import { useService } from './ServiceProvider';
import { useTheme } from './ThemeProvider';

interface StoreContextState {
  dispatch: React.Dispatch<Action>,
  state: State,
  onOpenDialog: EventHandler<DialogAction>,
  onOpenUrl?: EventHandler<string>
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

  const handleOpenDialog = React.useCallback((_: Event, data?: DialogAction) => {
    try {
      dispatch(setDialogAction(data));
    } catch (error) {
      dispatch(setError(error as Error));
    }
  }, [
    dispatch
  ]);

  const handleOpenUrl = React.useCallback((_: Event, data?: string) => {
    try {
      if (data == null) {
        throw new ArgumentNullError();
      }
      window.open(data, '_blank', 'noreferrer');
    } catch (error) {
      dispatch(setError(error as Error));
    }
  }, [
    dispatch
  ]);

  const value = React.useMemo<StoreContextState>(() => ({
    dispatch,
    state,
    onOpenDialog: handleOpenDialog,
    onOpenUrl: handleOpenUrl
  }), [
    state,
    dispatch,
    handleOpenDialog,
    handleOpenUrl
  ]);

  React.useEffect(() => {
    (async () => {
      try {
        changeTheme(storage.getThemeName() ?? ThemeName.light);
        dispatch(setInitialState({
          contentProps: {
            editing: false,
            loading: false,
            minimap: storage.getContentMinimap(),
            scrollPosition: {
              scrollX: 0,
              scrollY: 0
            },
            preview: storage.getContentPreview(),
            scroll: storage.getContentScroll(),
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
