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
} from '../types/Model';
import {
  Action,
  ActionType,
  State
} from '../types/Store';

export const appendExploreFile = (payload?: File): Action => ({
  type: ActionType.appendExploreFile,
  payload
});

export const appendExploreFolder = (payload?: Folder): Action => ({
  type: ActionType.appendExploreFolder,
  payload
});

export const deleteExploreFile = (payload?: File): Action => ({
  type: ActionType.deleteExploreFile,
  payload
});

export const deleteExploreFolder = (payload?: Folder): Action => ({
  type: ActionType.deleteExploreFolder,
  payload
});

export const setDialogAction = (payload?: DialogAction): Action => ({
  type: ActionType.setDialogAction,
  payload
});

export const setError = (payload?: Error): Action => ({
  type: ActionType.setError,
  payload
});

export const setExploreFile = (payload?: File): Action => ({
  type: ActionType.setExploreFile,
  payload
});

export const setExploreFolder = (payload?: Folder): Action => ({
  type: ActionType.setExploreFolder,
  payload
});

export const setIncludeUnsupportedFiles = (payload?: boolean): Action => ({
  type: ActionType.setIncludeUnsupportedFiles,
  payload
});

export const setInitialValue = (payload?: Pick<State, 'includeUnsupportedFiles' | 'tabMode'>): Action => ({
  type: ActionType.setInitialValue,
  payload
});

export const setLoading = (payload?: boolean): Action => ({
  type: ActionType.setLoading,
  payload
});

export const setSearchFile = (payload?: File): Action => ({
  type: ActionType.setSearchFile,
  payload
});

export const setSearchResults = (payload?: File[]): Action => ({
  type: ActionType.setSearchResults,
  payload
});

export const setSearchQuery = (payload?: string): Action => ({
  type: ActionType.setSearchQuery,
  payload
});

export const setTabMode = (payload?: TabMode): Action => ({
  type: ActionType.setTabMode,
  payload
});

export const setWorkFile = (payload?: File & FileContent): Action => ({
  type: ActionType.setWorkFile,
  payload
});

export const updateExploreFile = (payload?: File): Action => ({
  type: ActionType.updateExploreFile,
  payload
});

export const updateExploreFolder = (payload?: Folder): Action => ({
  type: ActionType.updateExploreFolder,
  payload
});
