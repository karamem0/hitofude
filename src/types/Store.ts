//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import {
  DialogAction,
  ExploreTabProps,
  ContentProps,
  MarkdownProps,
  SearchTabProps,
  SidePanelAction,
  TabMode
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
  setContentPosition = 'setContentPosition',
  setContentPreview = 'setContentPreview',
  setContentScroll = 'setContentScroll',
  setContentText = 'setContentText',
  setContentWordWrap = 'setContentWordWrap',
  setMarkdownChanged = 'setMarkdownChanged',
  setMarkdownPosition = 'setMarkdownPosition',
  setMarkdownText = 'setMarkdownText',
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
  setTabMode = 'setTabMode',
  updateExploreFile = 'updateExploreFile',
  updateExploreFolder = 'updateExploreFolder'
}

export interface State {
  contentProps?: ContentProps,
  dialogAction?: DialogAction,
  error?: Error,
  exploreTabProps?: ExploreTabProps,
  markdownProps?: MarkdownProps,
  searchTabProps?: SearchTabProps,
  sidePanelAction?: SidePanelAction,
  tabMode?: TabMode
}

export type InitialState = Pick<State, 'contentProps' | 'exploreTabProps' | 'markdownProps' | 'searchTabProps' | 'tabMode'>;
