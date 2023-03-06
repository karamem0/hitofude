//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import { File } from '../types/Model';

export function getBaseName(value: string | null | undefined): string | undefined {
  return value ? value.replace(/\.[^.]*$/, '') : undefined;
}

export function isSupportedFile(value: Pick<File, 'fullName'>): boolean {
  if (!value.fullName) {
    return false;
  }
  if (!value.fullName.endsWith('.md')) {
    return false;
  }
  return true;
}
