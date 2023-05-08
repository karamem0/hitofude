//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { css } from '@emotion/react';

interface ScrollPanelProps {
  children?: React.ReactNode,
  className?: string
}

function ScrollPanel(props: ScrollPanelProps, ref: React.Ref<HTMLDivElement>) {

  const {
    children,
    className
  } = props;

  return (
    <div
      ref={ref}
      className={className}
      css={css`
        overflow-x: hidden;
        overflow-y: auto;
      `}>
      {children}
    </div>
  );

}

export default React.forwardRef(ScrollPanel);
