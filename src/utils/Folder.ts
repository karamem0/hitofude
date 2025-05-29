//
// Copyright (c) 2023-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import { Folder } from '../types/Model';
import { isMarkdown } from './File';

export function isEmpty(value: Folder, allFiles: boolean = false): boolean {
  if (value.folders && value.folders.length > 0) {
    return false;
  }
  if (value.files && value.files.filter((item) => allFiles || isMarkdown(item)).length > 0) {
    return false;
  }
  return true;
}
