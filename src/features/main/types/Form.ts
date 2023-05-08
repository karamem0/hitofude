//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import { MimeType } from '../../../types/Model';

export interface FileCopyDialogFormState {
  baseName?: string,
  fullName?: string,
  mimeType?: MimeType,
  downloadUrl?: string
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

export interface ContentControlFormState {
  content: string
}

export interface SearchControlFormState {
  query?: string
}
