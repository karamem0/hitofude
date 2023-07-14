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
} from '../types/Model';
import {
  Action,
  ActionType,
  InitialState
} from '../types/Store';

export const appendExploreFile = (data?: File): Action => ({
  type: ActionType.appendExploreFile,
  data
});

export const appendExploreFolder = (data?: Folder): Action => ({
  type: ActionType.appendExploreFolder,
  data
});

export const deleteExploreFile = (data?: File): Action => ({
  type: ActionType.deleteExploreFile,
  data
});

export const deleteExploreFolder = (data?: Folder): Action => ({
  type: ActionType.deleteExploreFolder,
  data
});

export const setDialogAction = (data?: DialogAction): Action => ({
  type: ActionType.setDialogAction,
  data
});

export const setError = (data?: Error): Action => ({
  type: ActionType.setError,
  data
});

export const setExploreFile = (data?: File): Action => ({
  type: ActionType.setExploreFile,
  data
});

export const setExploreFolder = (data?: Folder): Action => ({
  type: ActionType.setExploreFolder,
  data
});

export const setIncludeUnsupportedFiles = (data?: boolean): Action => ({
  type: ActionType.setIncludeUnsupportedFiles,
  data
});

export const setInitialState = (data?: InitialState): Action => ({
  type: ActionType.setInitialState,
  data
});

export const setLoading = (data?: boolean): Action => ({
  type: ActionType.setLoading,
  data
});

export const setMinimapEnabled = (data?: boolean): Action => ({
  type: ActionType.setMinimapEnabled,
  data
});

export const setSearchFile = (data?: File): Action => ({
  type: ActionType.setSearchFile,
  data
});

export const setSearchResults = (data?: File[]): Action => ({
  type: ActionType.setSearchResults,
  data
});

export const setSearchQuery = (data?: string): Action => ({
  type: ActionType.setSearchQuery,
  data
});

export const setSidePanelAction = (data?: SidePanelAction): Action => ({
  type: ActionType.setSidePanelAction,
  data
});

export const setTabMode = (data?: TabMode): Action => ({
  type: ActionType.setTabMode,
  data
});

export const setWorkFile = (data?: File & FileContent): Action => ({
  type: ActionType.setWorkFile,
  data
});

export const updateExploreFile = (data?: File): Action => ({
  type: ActionType.updateExploreFile,
  data
});

export const updateExploreFolder = (data?: Folder): Action => ({
  type: ActionType.updateExploreFolder,
  data
});
