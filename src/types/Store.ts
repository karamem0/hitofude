//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import {
  DialogAction,
  ExplorerProps,
  ContentProps,
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
  appendExploreFile = 'appendExploreFile',
  appendExploreFolder = 'appendExploreFolder',
  deleteExploreFile = 'deleteExploreFile',
  deleteExploreFolder = 'deleteExploreFolder',
  setContentEditing = 'setContentEditing',
  setContentFile = 'setContentFile',
  setContentLoading = 'setContentLoading',
  setContentMinimap = 'setContentMinimap',
  setContentScrollPosition = 'setContentScrollPosition',
  setContentPreview = 'setContentPreview',
  setContentScroll = 'setContentScroll',
  setContentText = 'setContentText',
  setContentWordWrap = 'setContentWordWrap',
  setMarkdownChanged = 'setMarkdownChanged',
  setMarkdownCursorPosition = 'setMarkdownCursorPosition',
  setMarkdownCursorSelection = 'setMarkdownCursorSelection',
  setMarkdownDefaultCursorPosition = 'setMarkdownDefaultCursorPosition',
  setMarkdownDefaultCursorSelection = 'setMarkdownDefaultCursorSelection',
  setMarkdownDefaultText = 'setMarkdownDefaultText',
  setMarkdownScrollPosition = 'setMarkdownScrollPosition',
  setMarkdownText = 'setMarkdownPreviewText',
  setDialogAction = 'setDialogAction',
  setError = 'setError',
  setExploreAllFiles = 'setExploreAllFiles',
  setExploreFile = 'setExploreFile',
  setExploreFolder = 'setExploreFolder',
  setInitialState = 'setInitialState',
  setSearchFile = 'setSearchFile',
  setSearchResults = 'setSearchResults',
  setSearchQuery = 'setSearchQuery',
  setSidePanelAction = 'setSidePanelAction',
  setTabLoading = 'setTabLoading',
  setTabOpen = 'setTabOpen',
  setTabType = 'setTabType',
  updateExploreFile = 'updateExploreFile',
  updateExploreFolder = 'updateExploreFolder'
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
