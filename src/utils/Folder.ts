//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import { Folder } from '../types/Model';

import { isSupportedFile } from './File';

export function isEmpty(value: Folder, includeUnsupportedFiles?: boolean): boolean {
  if (value.folders && value.folders.length > 0) {
    return false;
  }
  if (value.files && value.files.filter((item) => includeUnsupportedFiles || isSupportedFile(item)).length > 0) {
    return false;
  }
  return true;
}
