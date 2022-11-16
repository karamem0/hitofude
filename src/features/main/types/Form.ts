//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

export interface FileCopyDialogFormState {
  name?: string,
  downloadUrl?: string
}

export interface FileCreateDialogFormState {
  name?: string
}

export interface FileRenameDialogFormState {
  id: string,
  name?: string
}

export interface FolderCreateDialogFormState {
  name?: string
}

export interface FolderRenameDialogFormState {
  id: string,
  name?: string
}

export interface MarkdownControlFormState {
  content: string
}
