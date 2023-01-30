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
  setLoading = 'setLoading',
  setSearchFiles = 'setSearchFiles',
  setSearchQuery = 'setSearchQuery',
  setTabMode = 'setTabMode',
  setWorkFile = 'setWorkFile',
  setWorkFolder = 'setWorkFolder',
  updateExploreFile = 'updateExploreFile',
  updateExploreFolder = 'updateExploreFolder'
}

export type DispatchAction<T> = (payload: T) => void;

export interface State {
  dialogAction?: DialogAction,
  error?: Error,
  loading?: boolean,
  searchFiles?: File[],
  searchQuery?: string,
  tabMode?: TabMode,
  workFile?: File,
  workFolder?: Folder
}
