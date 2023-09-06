//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { useService } from '../../../providers/ServiceProvider';
import { useStore } from '../../../providers/StoreProvider';
import { useTheme } from '../../../providers/ThemeProvider';
import { setInitialState } from '../../../stores/Action';
import { ThemeName } from '../../../types/Model';

import Presenter from './MainPage.presenter';

function MainPage() {

  const {
    dispatch,
    state: {
      tabMode
    }
  } = useStore();
  const { graph, storage } = useService();
  const { changeTheme } = useTheme();

  React.useEffect(() => {
    (async () => {
      changeTheme(storage.getThemeName() ?? ThemeName.light);
      dispatch(setInitialState({
        contentProps: {
          editing: false,
          loading: true,
          minimap: storage.getContentMinimap(),
          position: {
            left: 1,
            top: 1
          },
          text: '',
          wordWrap: storage.getContentWordWrap()
        },
        exploreProps: {
          allFiles: storage.getExploreAllFiles(),
          rootFolder: await graph.getRootFolder()
        },
        tabMode: storage.getTabMode()
      }));
    })();
  }, [
    graph,
    storage,
    changeTheme,
    dispatch
  ]);

  return (
    <Presenter loading={!tabMode} />
  );

}

export default MainPage;
