//
// Copyright (c) 2023-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

export interface AppBarMenuAction {
  data: unknown,
  type: AppBarMenuType
}

export type AppBarMenuType =
  | 'changeTheme';

export interface ContentMenuAction {
  data: unknown,
  type: ContentMenuType
}

export type ContentMenuType =
  | 'closeFile'
  | 'downloadFile'
  | 'editFile'
  | 'openFileVersionPanel'
  | 'saveFile'
  | 'toggleShowMinimap'
  | 'toggleShowPreview'
  | 'toggleSyncScroll'
  | 'toggleWordWrap';

export interface ContentProps {
  editing?: boolean,
  file?: File,
  loading?: boolean,
  previewUrl?: string,
  scrollPosition?: ScrollPosition,
  showMinimap?: boolean,
  showPreview?: boolean,
  syncScroll?: boolean,
  text?: string,
  wordWrap?: boolean
}

export interface DialogAction {
  data: unknown,
  type: DialogType
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
  data: unknown,
  type: ExplorerMenuType
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
  rootFolder?: Folder,
  selectedFile?: File,
  selectedFolder?: Folder
}

export interface File {
  baseName?: string,
  createdDate?: Date,
  downloadUrl?: string,
  extension?: string,
  fullName?: string,
  id: string,
  mimeType?: string,
  parentId?: string,
  updatedDate?: Date,
  webUrl?: string
}

export interface FileConflict {
  data?: Blob,
  id: string,
  name?: string
}

export interface FileVersion {
  id: string,
  size?: number,
  updatedDate?: Date,
  version: string
}

export interface Folder {
  createdDate?: Date,
  files?: File[],
  folders?: Folder[],
  id: string,
  name?: string,
  parentId?: string,
  root?: boolean,
  updatedDate?: Date,
  webUrl?: string
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
  | 'strike'
  | 'underline';

export type ProgressType =
  | 'save'
  | 'upload';

export type RouteParams = ExplorerParams | SearchParams;

export interface SearchMenuAction {
  data: unknown,
  type: SearchMenuType
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
  data: unknown,
  type: SidePanelType
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
