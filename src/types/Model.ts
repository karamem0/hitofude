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

export enum AppBarMenuType {
  changeTheme = 'changeTheme'
}

export interface ContentMenuAction {
  type: ContentMenuType,
  data: unknown
}

export enum ContentMenuType {
  closeFile = 'closeFile',
  downloadFile = 'downloadFile',
  editFile = 'editFile',
  openFileVersionPanel = 'openFileVersionPanel',
  saveFile = 'saveFile',
  toggleMinimap = 'toggleMinimap',
  togglePreview = 'togglePreview',
  toggleScroll = 'toggleScroll',
  toggleWordWrap = 'toggleWordWrap'
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
  copyLink = 'copyLink',
  createFile = 'createFile',
  createFolder = 'createFolder',
  deleteFile = 'deleteFile',
  deleteFolder = 'deleteFolder',
  overwriteFile = 'overwriteFile',
  renameFile = 'renameFile',
  renameFolder = 'renameFolder',
  restoreFile = 'restoreFile'
}

export interface ExplorerMenuAction {
  type: ExplorerMenuType,
  data: unknown
}

export enum ExplorerMenuType {
  copyFile = 'copyFile',
  copyLink = 'copyLink',
  createFile = 'createFile',
  createFolder = 'createFolder',
  deleteFile = 'deleteFile',
  deleteFolder = 'deleteFolder',
  downloadFile = 'downloadFile',
  openWithOneDrive = 'openWithOneDrive',
  refreshFolder = 'refreshFolder',
  renameFile = 'renameFile',
  renameFolder = 'renameFolder',
  toggleAllFiles = 'toggleAllFiles'
}

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

export enum MarkdownToolbarAction {
  bold = 'bold',
  italic = 'italic',
  underline = 'underline'
}

export enum ProgressType {
  save = 'save',
  upload = 'upload'
}

export type RouteParams = ExplorerParams | SearchParams;

export interface SearchMenuAction {
  type: SearchMenuType,
  data: unknown
}

export enum SearchMenuType {
  copyLink = 'copyLink',
  openFileLocation = 'openFileLocation'
}

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

export enum SidePanelType {
  fileVersion = 'fileVersion'
}

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
