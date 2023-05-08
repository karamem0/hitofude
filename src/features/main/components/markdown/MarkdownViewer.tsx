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
  value?: string
}

function MarkdownViewer(props: MarkdownViewerProps) {

  const {
    className,
    value
  } = props;

  return (
    <Presenter
      className={className}
      value={value} />
  );

}

export default MarkdownViewer;
