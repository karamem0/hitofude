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
  Position,
  SidePanelAction,
  TabMode
} from '../types/Model';
import {
  AppAction,
  AppActionType,
  InitialAppState
} from '../types/Store';

export const appendExploreFile = (data?: File): AppAction => ({
  type: AppActionType.appendExploreFile,
  data
});

export const appendExploreFolder = (data?: Folder): AppAction => ({
  type: AppActionType.appendExploreFolder,
  data
});

export const deleteExploreFile = (data?: File): AppAction => ({
  type: AppActionType.deleteExploreFile,
  data
});

export const deleteExploreFolder = (data?: Folder): AppAction => ({
  type: AppActionType.deleteExploreFolder,
  data
});

export const setDialogAction = (data?: DialogAction): AppAction => ({
  type: AppActionType.setDialogAction,
  data
});

export const setContentText = (data?: string): AppAction => ({
  type: AppActionType.setContentText,
  data
});

export const setContentEditing = (data?: boolean): AppAction => ({
  type: AppActionType.setContentEditing,
  data
});

export const setContentFile = (data?: File): AppAction => ({
  type: AppActionType.setContentFile,
  data
});

export const setContentLoading = (data?: boolean): AppAction => ({
  type: AppActionType.setContentLoading,
  data
});

export const setContentMinimap = (data?: boolean): AppAction => ({
  type: AppActionType.setContentMinimap,
  data
});

export const setContentPosition = (data?: Position): AppAction => ({
  type: AppActionType.setContentPosition,
  data
});

export const setContentWordWrap = (data?: boolean): AppAction => ({
  type: AppActionType.setContentWordWrap,
  data
});

export const setError = (data?: Error): AppAction => ({
  type: AppActionType.setError,
  data
});

export const setExploreAllFiles = (data?: boolean): AppAction => ({
  type: AppActionType.setExploreAllFiles,
  data
});

export const setExploreFile = (data?: File): AppAction => ({
  type: AppActionType.setExploreFile,
  data
});

export const setExploreFolder = (data?: Folder): AppAction => ({
  type: AppActionType.setExploreFolder,
  data
});

export const setInitialState = (data?: InitialAppState): AppAction => ({
  type: AppActionType.setInitialState,
  data
});

export const setSearchFile = (data?: File): AppAction => ({
  type: AppActionType.setSearchFile,
  data
});

export const setSearchResults = (data?: File[]): AppAction => ({
  type: AppActionType.setSearchResults,
  data
});

export const setSearchQuery = (data?: string): AppAction => ({
  type: AppActionType.setSearchQuery,
  data
});

export const setSidePanelAction = (data?: SidePanelAction): AppAction => ({
  type: AppActionType.setSidePanelAction,
  data
});

export const setTabMode = (data?: TabMode): AppAction => ({
  type: AppActionType.setTabMode,
  data
});

export const updateExploreFile = (data?: File): AppAction => ({
  type: AppActionType.updateExploreFile,
  data
});

export const updateExploreFolder = (data?: Folder): AppAction => ({
  type: AppActionType.updateExploreFolder,
  data
});
