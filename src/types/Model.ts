//
// Copyright (c) 2023 karamem0
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
  toggleMinimap = 'toggleMinimap'
}

export interface ContentProps {
  editing?: boolean,
  file?: File,
  loading?: boolean,
  minimap?: boolean,
  position?: Position,
  text?: string
}

export interface DialogAction {
  type: DialogType,
  data: unknown
}

export enum DialogType {
  copyFile = 'copyFile',
  createFile = 'createFile',
  createFolder = 'createFolder',
  deleteFile = 'deleteFile',
  deleteFolder = 'deleteFolder',
  renameFile = 'renameFile',
  renameFolder = 'renameFolder',
  restoreFile = 'restoreFile'
}

export interface ExploreTabProps {
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
  position?: Position,
  text?: string
}

export interface MimeType {
  type: string,
  subtype: string
}

export interface Position {
  left?: number,
  top?: number
}

export enum ProgressType {
  none = 'none',
  save = 'save',
}

export interface SearchTabProps {
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

export interface TabMode {
  type?: TabType,
  open?: boolean
}

export enum TabType {
  explorer = 0,
  search = 1,
}
