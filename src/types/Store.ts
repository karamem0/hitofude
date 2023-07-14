//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import {
  DialogAction,
  File,
  FileContent,
  Folder,
  SidePanelAction,
  TabMode
} from './Model';

export interface Action {
  type: ActionType,
  data: unknown
}

export enum ActionType {
  appendExploreFile = 'appendExploreFile',
  appendExploreFolder = 'appendExploreFolder',
  deleteExploreFile = 'deleteExploreFile',
  deleteExploreFolder = 'deleteExploreFolder',
  setDialogAction = 'setDialogAction',
  setError = 'setError',
  setExploreFile = 'setExploreFile',
  setExploreFolder = 'setExploreFolder',
  setIncludeUnsupportedFiles = 'setIncludeUnsupportedFiles',
  setInitialState = 'setInitialState',
  setLoading = 'setLoading',
  setMinimapEnabled = 'setMinimapEnabled',
  setSearchFile = 'setSearchFile',
  setSearchResults = 'setSearchResults',
  setSearchQuery = 'setSearchQuery',
  setSidePanelAction = 'setSidePanelAction',
  setTabMode = 'setTabMode',
  setWorkFile = 'setWorkFile',
  updateExploreFile = 'updateExploreFile',
  updateExploreFolder = 'updateExploreFolder'
}

export type DispatchAction<T> = (data: T) => void;

export interface State {
  dialogAction?: DialogAction,
  error?: Error,
  exploreFile?: File,
  exploreFolder?: Folder,
  includeUnsupportedFiles?: boolean,
  loading?: boolean,
  minimapEnabled?: boolean,
  rootFolder?: Folder,
  searchFile?: File,
  searchResults?: File[],
  searchQuery?: string,
  sidePanelAction?: SidePanelAction,
  tabMode?: TabMode,
  workFile?: File & FileContent
}

export type InitialState = Pick<State, 'includeUnsupportedFiles' | 'minimapEnabled' | 'rootFolder' | 'tabMode'>;
