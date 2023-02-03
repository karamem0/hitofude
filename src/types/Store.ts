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
  TabMode
} from './Model';

export interface Action {
  type: ActionType,
  payload: unknown
}

export enum ActionType {
  appendExploreFile = 'appendExploreFile',
  appendExploreFolder = 'appendExploreFolder',
  deleteExploreFile = 'deleteExploreFile',
  deleteExploreFolder = 'deleteExploreFolder',
  setDialogAction = 'setDialogAction',
  setError = 'setError',
  setExploreFile = 'setExploreFile',
  setExploreFolder = 'setWorkFolder',
  setLoading = 'setLoading',
  setSearchFile = 'setSearchFile',
  setSearchResults = 'setSearchResults',
  setSearchQuery = 'setSearchQuery',
  setTabMode = 'setTabMode',
  setWorkFile = 'setWorkFile',
  updateExploreFile = 'updateExploreFile',
  updateExploreFolder = 'updateExploreFolder'
}

export type DispatchAction<T> = (payload: T) => void;

export interface State {
  dialogAction?: DialogAction,
  error?: Error,
  loading?: boolean,
  searchFile?: File,
  searchResults?: File[],
  searchQuery?: string,
  tabMode?: TabMode,
  exploreFile?: File,
  exploreFolder?: Folder,
  workFile?: File & FileContent
}
