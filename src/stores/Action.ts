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

export const setContentEditing = (data?: boolean): Action => ({
  type: ActionType.setContentEditing,
  data
});

export const setContentFile = (data?: File): Action => ({
  type: ActionType.setContentFile,
  data
});

export const setContentLoading = (data?: boolean): Action => ({
  type: ActionType.setContentLoading,
  data
});

export const setContentMinimap = (data?: boolean): Action => ({
  type: ActionType.setContentMinimap,
  data
});

export const setContentPosition = (data?: Position): Action => ({
  type: ActionType.setContentPosition,
  data
});

export const setContentPreview = (data?: boolean): Action => ({
  type: ActionType.setContentPreview,
  data
});

export const setContentText = (data?: string): Action => ({
  type: ActionType.setContentText,
  data
});

export const setContentWordWrap = (data?: boolean): Action => ({
  type: ActionType.setContentWordWrap,
  data
});

export const setMarkdownPosition = (data?: Position): Action => ({
  type: ActionType.setMarkdownPosition,
  data
});

export const setMarkdownText = (data?: string): Action => ({
  type: ActionType.setMarkdownText,
  data
});

export const setError = (data?: Error): Action => ({
  type: ActionType.setError,
  data
});

export const setExploreAllFiles = (data?: boolean): Action => ({
  type: ActionType.setExploreAllFiles,
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

export const setInitialState = (data?: InitialState): Action => ({
  type: ActionType.setInitialState,
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

export const updateExploreFile = (data?: File): Action => ({
  type: ActionType.updateExploreFile,
  data
});

export const updateExploreFolder = (data?: Folder): Action => ({
  type: ActionType.updateExploreFolder,
  data
});
