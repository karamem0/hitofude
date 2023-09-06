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
  SearchTabProps,
  SidePanelAction,
  TabMode
} from './Model';

export interface AppAction {
  type: AppActionType,
  data: unknown
}

export enum AppActionType {
  appendExploreFile = 'appendExploreFile',
  appendExploreFolder = 'appendExploreFolder',
  deleteExploreFile = 'deleteExploreFile',
  deleteExploreFolder = 'deleteExploreFolder',
  setContentEditing = 'setContentEditing',
  setContentFile = 'setContentFile',
  setContentLoading = 'setContentLoading',
  setContentMinimap = 'setContentMinimap',
  setContentPosition = 'setContentPosition',
  setContentText = 'setContentText',
  setContentWordWrap = 'setContentWordWrap',
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

export interface AppState {
  contentProps?: ContentProps,
  dialogAction?: DialogAction,
  error?: Error,
  exploreProps?: ExploreTabProps,
  searchTabProps?: SearchTabProps,
  sidePanelAction?: SidePanelAction,
  tabMode?: TabMode
}

export type InitialAppState = Pick<AppState, 'contentProps' | 'exploreProps' | 'tabMode'>;
