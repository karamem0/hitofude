//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import { File, Folder } from '../types/Model';
import {
  Action,
  ActionType
} from '../types/Store';

export const appendFile = (payload?: File): Action => ({
  type: ActionType.appendFile,
  payload
});

export const appendFolder = (payload?: Folder): Action => ({
  type: ActionType.appendFolder,
  payload
});

export const deleteFile = (payload?: File): Action => ({
  type: ActionType.deleteFile,
  payload
});

export const deleteFolder = (payload?: Folder): Action => ({
  type: ActionType.deleteFolder,
  payload
});

export const setEditMode = (payload?: boolean): Action => ({
  type: ActionType.setEditMode,
  payload
});

export const setWorkFile = (payload?: File): Action => ({
  type: ActionType.setWorkFile,
  payload
});

export const setWorkFolder = (payload?: Folder): Action => ({
  type: ActionType.setWorkFolder,
  payload
});

export const setTabMode = (payload?: boolean): Action => ({
  type: ActionType.setTabMode,
  payload
});

export const updateFile = (payload?: File): Action => ({
  type: ActionType.updateFile,
  payload
});

export const updateFolder = (payload?: Folder): Action => ({
  type: ActionType.updateFolder,
  payload
});
