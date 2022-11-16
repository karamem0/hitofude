//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

export enum DialogType {
  copyFile = 'copyFile',
  createFile = 'createFile',
  createFolder = 'createFolder',
  deleteFile = 'deleteFile',
  deleteFolder = 'deleteFolder',
  renameFile = 'renameFile',
  renameFolder = 'renameFolder'
}

export interface DialogAction {
  type: DialogType,
  payload: unknown
}
