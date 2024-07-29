//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

export function fromFile(value: File): Blob {
  return new Blob([ value ], { type: value.type });
}

export function fromText(value: string): Blob {
  return new Blob([ value ], { type: 'text/plain' });
}
