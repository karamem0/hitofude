//
// Copyright (c) 2023-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import {
  ContentProps,
  DialogAction,
  ExplorerProps,
  MarkdownProps,
  SearchProps,
  SidePanelAction,
  TabProps
} from './Model';

export interface Action {
  type: ActionType,
  data: unknown
}

export enum ActionType {
  appendExplorerFile = 'appendExplorerFile',
  appendExplorerFileConflict = 'appendExplorerFileConflict',
  appendExplorerFolder = 'appendExplorerFolder',
  removeExplorerFile = 'removeExplorerFile',
  removeExplorerFileConflict = 'removeExplorerFileConflict',
  removeExplorerFolder = 'removeExplorerFolder',
  setContentEditing = 'setContentEditing',
  setContentFile = 'setContentFile',
  setContentLoading = 'setContentLoading',
  setContentPreviewUrl = 'setContentPreviewUrl',
  setContentShowMinimap = 'setContentShowMinimap',
  setContentScrollPosition = 'setContentScrollPosition',
  setContentShowPreview = 'setContentShowPreview',
  setContentSyncScroll = 'setContentSyncScroll',
  setContentText = 'setContentText',
  setContentWordWrap = 'setContentWordWrap',
  setMarkdownChanged = 'setMarkdownChanged',
  setMarkdownDefaultText = 'setMarkdownDefaultText',
  setMarkdownScrollPosition = 'setMarkdownScrollPosition',
  setMarkdownText = 'setMarkdownText',
  setDialogAction = 'setDialogAction',
  setError = 'setError',
  setExplorerAllFiles = 'setExplorerAllFiles',
  setExplorerSelectedFile = 'setExplorerSelectedFile',
  setExplorerSelectedFolder = 'setExplorerSelectedFolder',
  setInitialState = 'setInitialState',
  setSearchQuery = 'setSearchQuery',
  setSearchResultFiles = 'setSearchResultFiles',
  setSearchSelectedFile = 'setSearchSelectedFile',
  setSidePanelAction = 'setSidePanelAction',
  setTabLoading = 'setTabLoading',
  setTabOpen = 'setTabOpen',
  setTabType = 'setTabType',
  updateExplorerFile = 'updateExplorerFile',
  updateExplorerFolder = 'updateExplorerFolder'
}

export interface State {
  contentProps?: ContentProps,
  dialogAction?: DialogAction,
  error?: Error,
  explorerProps?: ExplorerProps,
  markdownProps?: MarkdownProps,
  searchProps?: SearchProps,
  sidePanelAction?: SidePanelAction,
  tabProps?: TabProps
}

export type InitialState = Pick<State, 'contentProps' | 'explorerProps' | 'markdownProps' | 'searchProps'>;
