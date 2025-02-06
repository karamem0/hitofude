//
// Copyright (c) 2023-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import { ArgumentNullError } from '../types/Error';
import { File } from '../types/Model';

const regexFileName = /^(?<base>.+)(?<extension>\.[^.]*)$/;

const regexMimeType = /^(?<type>\*|[\w.]+)\/(?<subtype>\*|[\w.]+)/;

export function downloadFile(value: Pick<File, 'downloadUrl' | 'fullName'>): void {
  if (value?.downloadUrl == null) {
    throw new ArgumentNullError();
  }
  if (value?.fullName == null) {
    throw new ArgumentNullError();
  }
  const element = window.document.createElement('a');
  element.href = value.downloadUrl;
  element.download = value.fullName;
  element.click();
  element.remove();
}

export function getBaseName(value: string | null | undefined): string | undefined {
  if (value == null) {
    return undefined;
  }
  const exec = regexFileName.exec(value);
  if (exec == null) {
    return value;
  }
  return exec.groups?.base;
}

export function getExtension(value: string | null | undefined): string | undefined {
  if (value == null) {
    return undefined;
  }
  const exec = regexFileName.exec(value);
  if (exec == null) {
    return undefined;
  }
  return exec.groups?.extension;
}

export function getMimeType(fileName: string | null | undefined, mimeType: string | null | undefined): string | undefined {
  if (fileName == null) {
    return undefined;
  }
  if (mimeType == null) {
    return undefined;
  }
  if (fileName.endsWith('.md')) {
    return 'text/markdown';
  }
  if (regexMimeType.test(mimeType)) {
    return mimeType;
  }
  return undefined;
}

export function isMimeType(value?: string, match?: string): boolean {
  if (value == null) {
    return false;
  }
  if (match == null) {
    return false;
  }
  const valueExec = regexMimeType.exec(value);
  if (valueExec == null) {
    return false;
  }
  const matchExec = regexMimeType.exec(match);
  if (matchExec == null) {
    return false;
  }
  const valueType = valueExec.groups?.type;
  const matchType = matchExec.groups?.type;
  if (matchType !== '*' && valueType !== matchType) {
    return false;
  }
  const valueSubtype = valueExec.groups?.subtype;
  const matchSubtype = matchExec.groups?.subtype;
  if (matchSubtype !== '*' && valueSubtype !== matchSubtype) {
    return false;
  }
  return true;
}

export function isSupportedFile(value?: Pick<File, 'mimeType'>): boolean {
  if (value == null) {
    return false;
  }
  if (isMimeType(value?.mimeType, 'image/*')) {
    return true;
  }
  if (isMimeType(value?.mimeType, 'video/*')) {
    return true;
  }
  if (isMimeType(value?.mimeType, 'text/markdown')) {
    return true;
  }
  return false;
}
