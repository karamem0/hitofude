//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import { Folder } from '../types/Model';
import { isSupportedFile } from './File';

export function isEmpty(value: Folder, allFiles: boolean = false): boolean {
  if (value.folders && value.folders.length > 0) {
    return false;
  }
  if (value.files && value.files.filter((item) => allFiles || isSupportedFile(item)).length > 0) {
    return false;
  }
  return true;
}
