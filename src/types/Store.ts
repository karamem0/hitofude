//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import { File, Folder } from './Model';

export interface Action {
  type: ActionType,
  payload: unknown
}

export enum ActionType {
  appendFile = 'appendFile',
  appendFolder = 'appendFolder',
  deleteFile = 'removeFile',
  deleteFolder = 'deleteFolder',
  setEditMode = 'setEditMode',
  setTabMode = 'setTabMode',
  setWorkFile = 'setWorkFile',
  setWorkFolder = 'setWorkFolder',
  updateFile = 'updateFile',
  updateFolder = 'updateFolder'
}

export type DispatchAction<T> = (payload: T) => void;

export interface State {
  tabMode?: boolean,
  workFile?: File,
  workFolder?: Folder
}
