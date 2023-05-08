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
  if (!fileName) {
    return undefined;
  }
  if (!mimeType) {
    return undefined;
  }
  if (fileName.endsWith('.md')) {
    mimeType = 'text/markdown';
  }
  const regex = /^([-\w.]+)\/([-\w.]+)/;
  const match = regex.exec(mimeType);
  if (!match) {
    return undefined;
  }
  return {
    type: match[1],
    subtype: match[2]
  };
}

export function isImageFile(value?: Pick<File, 'mimeType'>): boolean {
  return !!value && value.mimeType?.type === 'image';
}

export function isMarkdownFile(value?: Pick<File, 'mimeType'>): boolean {
  return !!value && value.mimeType?.subtype === 'markdown';
}

export function isSupportedFile(value?: Pick<File, 'mimeType'>): boolean {
  return isImageFile(value) || isMarkdownFile(value);
}
