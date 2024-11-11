//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

export interface AppBarMenuAction {
  type: AppBarMenuType,
  data: unknown
}

export type AppBarMenuType =
  | 'changeTheme';

export interface ContentMenuAction {
  type: ContentMenuType,
  data: unknown
}

export type ContentMenuType =
  | 'closeFile'
  | 'downloadFile'
  | 'editFile'
  | 'openFileVersionPanel'
  | 'saveFile'
  | 'toggleMinimap'
  | 'togglePreview'
  | 'toggleScroll'
  | 'toggleWordWrap';

export interface ContentProps {
  editing?: boolean,
  file?: File,
  loading?: boolean,
  minimap?: boolean,
  preview?: boolean,
  scroll?: boolean,
  scrollPosition?: ScrollPosition,
  text?: string,
  wordWrap?: boolean
}

export interface DialogAction {
  type: DialogType,
  data: unknown
}

export type DialogType =
  | 'changeTheme'
  | 'copyFile'
  | 'copyLink'
  | 'createFile'
  | 'createFolder'
  | 'deleteFile'
  | 'deleteFolder'
  | 'overwriteFile'
  | 'renameFile'
  | 'renameFolder'
  | 'restoreFile';

export interface ExplorerMenuAction {
  type: ExplorerMenuType,
  data: unknown
}

export type ExplorerMenuType =
  | 'copyFile'
  | 'copyLink'
  | 'createFile'
  | 'createFolder'
  | 'deleteFile'
  | 'deleteFolder'
  | 'downloadFile'
  | 'openWithOneDrive'
  | 'refreshFolder'
  | 'renameFile'
  | 'renameFolder'
  | 'toggleAllFiles';

export interface ExplorerParams {
  file?: string,
  folder?: string,
  tab?: TabType.explorer
}

export interface ExplorerProps {
  allFiles?: boolean,
  fileConflicts?: FileConflict[],
  selectedFile?: File,
  selectedFolder?: Folder,
  rootFolder?: Folder
}

export interface File {
  id: string,
  fullName?: string,
  baseName?: string,
  extension?: string,
  mimeType?: string,
  createdDate?: Date,
  updatedDate?: Date,
  webUrl?: string,
  downloadUrl?: string,
  parentId?: string
}

export interface FileConflict {
  id: string,
  name?: string,
  data?: Blob
}

export interface FileVersion {
  id: string,
  version: string,
  updatedDate?: Date,
  size?: number
}

export interface Folder {
  id: string,
  name?: string,
  createdDate?: Date,
  updatedDate?: Date,
  root?: boolean,
  webUrl?: string,
  parentId?: string,
  folders?: Folder[],
  files?: File[]
}

export interface MarkdownProps {
  changed?: boolean,
  defaultText?: string,
  scrollPosition?: ScrollPosition,
  text?: string
}

export type MarkdownToolbarAction =
  | 'bold'
  | 'italic'
  | 'underline';

export type ProgressType =
  | 'save'
  | 'upload';

export type RouteParams = ExplorerParams | SearchParams;

export interface SearchMenuAction {
  type: SearchMenuType,
  data: unknown
}

export type SearchMenuType =
  | 'copyLink'
  | 'openFileLocation';

export interface SearchParams {
  file?: string,
  search?: string,
  tab?: TabType.search
}

export interface SearchProps {
  query?: string,
  resultFiles?: File[],
  selectedFile?: File
}

export interface ScrollPosition {
  scrollX?: number,
  scrollY?: number
}

export interface ScrollSize {
  clientHeight?: number,
  clientWidth?: number,
  scrollHeight?: number,
  scrollWidth?: number
}

export interface SidePanelAction {
  type: SidePanelType,
  data: unknown
}

export type SidePanelType =
  | 'fileVersion';

export interface TabProps {
  loading?: boolean,
  open?: boolean,
  type?: TabType
}

export enum TabType {
  explorer = 0,
  search = 1
}

export enum ThemeName {
  light = 0,
  dark = 1
}
