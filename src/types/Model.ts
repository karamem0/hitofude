//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

export interface DialogAction {
  type: DialogType,
  payload: unknown
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

export interface FileContent {
  content: string,
  editing: boolean
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

export interface MimeType {
  type: string,
  subtype: string
}

export enum ProgressType {
  none = 'none',
  save = 'save',
}

export interface SidePanelAction {
  type: SidePanelType,
  payload: unknown
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
