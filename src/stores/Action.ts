//
// Copyright (c) 2023-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import {
  DialogAction,
  File,
  FileConflict,
  Folder,
  ScrollPosition,
  SidePanelAction,
  TabType
} from '../types/Model';
import {
  Action,
  ActionType,
  InitialState
} from '../types/Store';

export const appendExplorerFile = (data?: File): Action => ({
  data,
  type: ActionType.appendExplorerFile
});

export const appendExplorerFileConflict = (data?: FileConflict): Action => ({
  data,
  type: ActionType.appendExplorerFileConflict
});

export const appendExplorerFolder = (data?: Folder): Action => ({
  data,
  type: ActionType.appendExplorerFolder
});

export const removeExplorerFile = (data?: File): Action => ({
  data,
  type: ActionType.removeExplorerFile
});

export const removeExplorerFileConflict = (data?: FileConflict): Action => ({
  data,
  type: ActionType.removeExplorerFileConflict
});

export const removeExplorerFolder = (data?: Folder): Action => ({
  data,
  type: ActionType.removeExplorerFolder
});

export const setContentEditing = (data?: boolean): Action => ({
  data,
  type: ActionType.setContentEditing
});

export const setContentFile = (data?: File): Action => ({
  data,
  type: ActionType.setContentFile
});

export const setContentLoading = (data?: boolean): Action => ({
  data,
  type: ActionType.setContentLoading
});

export const setContentPreviewUrl = (data?: string): Action => ({
  data,
  type: ActionType.setContentPreviewUrl
});

export const setContentScrollPosition = (data?: ScrollPosition): Action => ({
  data,
  type: ActionType.setContentScrollPosition
});

export const setContentShowMinimap = (data?: boolean): Action => ({
  data,
  type: ActionType.setContentShowMinimap
});

export const setContentShowPreview = (data?: boolean): Action => ({
  data,
  type: ActionType.setContentShowPreview
});

export const setContentSyncScroll = (data?: boolean): Action => ({
  data,
  type: ActionType.setContentSyncScroll
});

export const setContentText = (data?: string): Action => ({
  data,
  type: ActionType.setContentText
});

export const setContentWordWrap = (data?: boolean): Action => ({
  data,
  type: ActionType.setContentWordWrap
});

export const setDialogAction = (data?: DialogAction): Action => ({
  data,
  type: ActionType.setDialogAction
});

export const setExplorerAllFiles = (data?: boolean): Action => ({
  data,
  type: ActionType.setExplorerAllFiles
});

export const setExplorerSelectedFile = (data?: File): Action => ({
  data,
  type: ActionType.setExplorerSelectedFile
});

export const setExplorerSelectedFolder = (data?: Folder): Action => ({
  data,
  type: ActionType.setExplorerSelectedFolder
});

export const setInitialState = (data?: InitialState): Action => ({
  data,
  type: ActionType.setInitialState
});

export const setMarkdownChanged = (data?: boolean): Action => ({
  data,
  type: ActionType.setMarkdownChanged
});

export const setMarkdownDefaultText = (data?: string): Action => ({
  data,
  type: ActionType.setMarkdownDefaultText
});

export const setMarkdownScrollPosition = (data?: ScrollPosition): Action => ({
  data,
  type: ActionType.setMarkdownScrollPosition
});

export const setMarkdownText = (data?: string): Action => ({
  data,
  type: ActionType.setMarkdownText
});

export const setSearchQuery = (data?: string): Action => ({
  data,
  type: ActionType.setSearchQuery
});

export const setSearchResultFiles = (data?: File[]): Action => ({
  data,
  type: ActionType.setSearchResultFiles
});

export const setSearchSelectedFile = (data?: File): Action => ({
  data,
  type: ActionType.setSearchSelectedFile
});

export const setSidePanelAction = (data?: SidePanelAction): Action => ({
  data,
  type: ActionType.setSidePanelAction
});

export const setTabLoading = (data?: boolean): Action => ({
  data,
  type: ActionType.setTabLoading
});

export const setTabOpen = (data?: boolean): Action => ({
  data,
  type: ActionType.setTabOpen
});

export const setTabType = (data?: TabType): Action => ({
  data,
  type: ActionType.setTabType
});

export const updateExplorerFile = (data?: File): Action => ({
  data,
  type: ActionType.updateExplorerFile
});

export const updateExplorerFolder = (data?: Folder): Action => ({
  data,
  type: ActionType.updateExplorerFolder
});
