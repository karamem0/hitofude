//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import { ScrollPosition, ScrollSize } from '../types/Model';

export function getScrollTop(scrollPosition?: ScrollPosition, scrollSize1?: ScrollSize, scrollSize2?: ScrollSize): number {
  if (scrollPosition?.scrollTop == null) {
    return 0;
  }
  if (scrollSize1?.clientHeight == null) {
    return 0;
  }
  if (scrollSize1?.scrollHeight == null) {
    return 0;
  }
  if (scrollSize2?.clientHeight == null) {
    return 0;
  }
  if (scrollSize2?.scrollHeight == null) {
    return 0;
  }
  const clientHeight1 = scrollSize1.clientHeight;
  const scrollHeight1 = scrollSize1.scrollHeight;
  const clientHeight2 = scrollSize2.clientHeight;
  const scrollHeight2 = scrollSize2.scrollHeight;
  const scrollRate = (scrollPosition.scrollTop / (scrollHeight1 - clientHeight1));
  const scrollTop = (scrollHeight2 - clientHeight2) * Math.round(scrollRate * 100) / 100;
  return scrollTop;
}
