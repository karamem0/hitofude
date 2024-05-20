//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

export function isAbsoluteUrl(value: string | null | undefined): boolean {
  return !!value && /^https?:\/\//.test(value);
}
