//
// Copyright (c) 2023-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import {
  Action,
  ActionType,
  InitialState
} from '../types/Store';
import {
  DialogAction,
  File,
  FileConflict,
  Folder,
  ScrollPosition,
  SidePanelAction,
  TabType
} from '../types/Model';

export const appendExplorerFile = (data?: File): Action => ({
  type: ActionType.appendExplorerFile,
  data
});

export const appendExplorerFileConflict = (data?: FileConflict): Action => ({
  type: ActionType.appendExplorerFileConflict,
  data
});

export const appendExplorerFolder = (data?: Folder): Action => ({
  type: ActionType.appendExplorerFolder,
  data
});

export const removeExplorerFile = (data?: File): Action => ({
  type: ActionType.removeExplorerFile,
  data
});

export const removeExplorerFileConflict = (data?: FileConflict): Action => ({
  type: ActionType.removeExplorerFileConflict,
  data
});

export const removeExplorerFolder = (data?: Folder): Action => ({
  type: ActionType.removeExplorerFolder,
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

export const setContentPreviewUrl = (data?: string): Action => ({
  type: ActionType.setContentPreviewUrl,
  data
});

export const setContentScrollPosition = (data?: ScrollPosition): Action => ({
  type: ActionType.setContentScrollPosition,
  data
});

export const setContentShowMinimap = (data?: boolean): Action => ({
  type: ActionType.setContentShowMinimap,
  data
});

export const setContentShowPreview = (data?: boolean): Action => ({
  type: ActionType.setContentShowPreview,
  data
});

export const setContentSyncScroll = (data?: boolean): Action => ({
  type: ActionType.setContentSyncScroll,
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

export const setDialogAction = (data?: DialogAction): Action => ({
  type: ActionType.setDialogAction,
  data
});

export const setError = (data?: Error): Action => ({
  type: ActionType.setError,
  data
});

export const setExplorerAllFiles = (data?: boolean): Action => ({
  type: ActionType.setExplorerAllFiles,
  data
});

export const setExplorerSelectedFile = (data?: File): Action => ({
  type: ActionType.setExplorerSelectedFile,
  data
});

export const setExplorerSelectedFolder = (data?: Folder): Action => ({
  type: ActionType.setExplorerSelectedFolder,
  data
});

export const setInitialState = (data?: InitialState): Action => ({
  type: ActionType.setInitialState,
  data
});

export const setMarkdownChanged = (data?: boolean): Action => ({
  type: ActionType.setMarkdownChanged,
  data
});

export const setMarkdownDefaultText = (data?: string): Action => ({
  type: ActionType.setMarkdownDefaultText,
  data
});

export const setMarkdownScrollPosition = (data?: ScrollPosition): Action => ({
  type: ActionType.setMarkdownScrollPosition,
  data
});

export const setMarkdownText = (data?: string): Action => ({
  type: ActionType.setMarkdownText,
  data
});

export const setSearchQuery = (data?: string): Action => ({
  type: ActionType.setSearchQuery,
  data
});

export const setSearchResultFiles = (data?: File[]): Action => ({
  type: ActionType.setSearchResultFiles,
  data
});

export const setSearchSelectedFile = (data?: File): Action => ({
  type: ActionType.setSearchSelectedFile,
  data
});

export const setSidePanelAction = (data?: SidePanelAction): Action => ({
  type: ActionType.setSidePanelAction,
  data
});

export const setTabLoading = (data?: boolean): Action => ({
  type: ActionType.setTabLoading,
  data
});

export const setTabOpen = (data?: boolean): Action => ({
  type: ActionType.setTabOpen,
  data
});

export const setTabType = (data?: TabType): Action => ({
  type: ActionType.setTabType,
  data
});

export const updateExplorerFile = (data?: File): Action => ({
  type: ActionType.updateExplorerFile,
  data
});

export const updateExplorerFolder = (data?: Folder): Action => ({
  type: ActionType.updateExplorerFolder,
  data
});
