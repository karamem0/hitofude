//
// Copyright (c) 2023-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

export interface FileCopyDialogFormState {
  baseName?: string
}

export interface FileCreateDialogFormState {
  baseName?: string
}

export interface FileRenameDialogFormState {
  id: string,
  baseName?: string
}

export interface FolderCreateDialogFormState {
  name?: string
}

export interface FolderRenameDialogFormState {
  id: string,
  name?: string
}
