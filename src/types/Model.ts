//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

export interface File {
  id: string,
  baseName?: string,
  fullName?: string,
  createdDate?: Date,
  updatedDate?: Date,
  downloadUrl?: string,
  parentId?: string
}

export interface FileContent {
  content: string,
  editable?: boolean
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
  renameFolder = 'renameFolder'
}

export interface TabMode {
  type?: TabType,
  open?: boolean
}

export enum TabType {
  explorer = 0,
  search = 1,
}
