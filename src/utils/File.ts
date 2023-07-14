//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import { File, MimeType } from '../types/Model';

export function getBaseName(value: string | null | undefined): string | undefined {
  return value ? value.replace(/\.[^.]*$/, '') : undefined;
}

export function getMimeType(fileName: string | null | undefined, mimeType: string | null | undefined): MimeType | undefined {
  if (fileName == null) {
    return undefined;
  }
  if (mimeType == null) {
    return undefined;
  }
  if (fileName.endsWith('.md')) {
    mimeType = 'text/markdown';
  }
  const regex = /^([-\w.]+)\/([-\w.]+)/;
  const match = regex.exec(mimeType);
  if (match) {
    return {
      type: match[1],
      subtype: match[2]
    };
  }
  return undefined;
}

export function isMimeType(value?: Pick<File, 'mimeType'>, option?: { type?: string, subtype?: string }): boolean {
  if (value?.mimeType == null) {
    return false;
  }
  if (option && value.mimeType.type === option.type) {
    return true;
  }
  if (option && value.mimeType.subtype === option.subtype) {
    return true;
  }
  return false;
}

export function isSupportedFile(value?: Pick<File, 'mimeType'>): boolean {
  return isMimeType(value, { type: 'image' }) || isMimeType(value, { subtype: 'markdown' });
}
