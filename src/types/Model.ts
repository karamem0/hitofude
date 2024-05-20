//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

export interface ContentMenuAction {
  type: ContentMenuType,
  data: unknown
}

export enum ContentMenuType {
  downloadFile = 'downloadFile',
  openSidePanel = 'openSidePanel',
  toggleMinimap = 'toggleMinimap',
  toggleWordWrap = 'toggleWordWrap',
  toggleScroll = 'toggleScroll'
}

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

export enum DialogType {
  changeTheme = 'changeTheme',
  copyFile = 'copyFile',
  createFile = 'createFile',
  createFolder = 'createFolder',
  deleteFile = 'deleteFile',
  deleteFolder = 'deleteFolder',
  renameFile = 'renameFile',
  renameFolder = 'renameFolder',
  restoreFile = 'restoreFile'
}

export interface ExplorerParams {
  file?: string,
  folder?: string,
  tab?: TabType.explorer
}

export interface ExplorerProps {
  allFiles?: boolean,
  file?: File,
  folder?: Folder,
  rootFolder?: Folder
}

export interface File {
  id: string,
  baseName?: string,
  fullName?: string,
  mimeType?: MimeType,
  createdDate?: Date,
  updatedDate?: Date,
  webUrl?: string,
  downloadUrl?: string,
  parentId?: string
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

export enum MarkdownToolbarAction {
  bold = 'bold',
  italic = 'italic',
  underline = 'underline'
}

export interface MimeType {
  type: string,
  subtype: string
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

export enum ProgressType {
  save = 'save'
}

export type RouteParams = ExplorerParams | SearchParams;

export interface SearchParams {
  file?: string,
  search?: string,
  tab?: TabType.search
}

export interface SearchProps {
  file?: File,
  query?: string,
  results?: File[]
}

export interface SidePanelAction {
  type: SidePanelType,
  data: unknown
}

export enum SidePanelType {
  fileVersion = 'fileVersion'
}

export interface TabProps {
  loading?: boolean,
  open?: boolean,
  type?: TabType
}

export enum ThemeName {
  light = 0,
  dark = 1
}

export enum TabType {
  explorer = 0,
  search = 1
}
