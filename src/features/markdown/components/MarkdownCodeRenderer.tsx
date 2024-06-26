//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import Presenter from './MarkdownCodeRenderer.presenter';

interface MarkdownCodeRendererProps {
  className?: string,
  inline?: boolean
}

function MarkdownCodeRenderer(props: Readonly<React.PropsWithChildren<MarkdownCodeRendererProps>>) {

  const {
    children,
    className,
    inline
  } = props;

  return (
    <Presenter
      className={className}
      inline={inline}>
      {children}
    </Presenter>
  );

}

export default MarkdownCodeRenderer;
