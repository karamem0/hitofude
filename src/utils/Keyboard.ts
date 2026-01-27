//
// Copyright (c) 2023-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

export function moveNext(value: HTMLElement | null | undefined, query: string): HTMLElement | undefined {
  const items = value?.querySelectorAll<HTMLElement>(query);
  if (items == null) {
    return;
  }
  for (let index = 0; index < items?.length - 1; index++) {
    if (items[index] === document.activeElement) {
      items[index + 1].focus();
      return items[index + 1];
    }
  }
}

export function movePrevious(value: HTMLElement | null | undefined, query: string): HTMLElement | undefined {
  const items = value?.querySelectorAll<HTMLElement>(query);
  if (items == null) {
    return;
  }
  for (let index = 1; index < items?.length; index++) {
    if (items[index] === document.activeElement) {
      items[index - 1].focus();
      return items[index - 1];
    }
  }
}
