//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

export interface File {
  id: string,
  name?: string,
  createdDate?: Date,
  updatedDate?: Date,
  downloadUrl?: string,
  parentId?: string,
  content?: string,
  editMode?: boolean
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
