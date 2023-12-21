//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { SerializedStyles } from '@emotion/react';

import Presenter from './MarkdownViewer.presenter';

interface MarkdownViewerProps {
  className?: string,
  css?: SerializedStyles,
  text?: string
}

function MarkdownViewer(props: Readonly<MarkdownViewerProps>) {

  const {
    className,
    text
  } = props;

  return (
    <Presenter
      className={className}
      text={text} />
  );

}

export default MarkdownViewer;
