//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

export function getBaseName(value: string | null | undefined): string | undefined {
  return value ? value.replace(/\.[^.]*$/, '') : undefined;
}
