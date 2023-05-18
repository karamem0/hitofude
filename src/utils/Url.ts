//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

export function isAbsoluteUrl(value?: string | null | undefined): boolean {
  return !!value && /^https?:\/\//.test(value);
}

export function getParentUrl(value?: string | null | undefined): string | undefined {
  return value ? value.substring(0, value.lastIndexOf('/') + 1) : undefined;
}
