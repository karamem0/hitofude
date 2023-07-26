//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { SerializedStyles } from '@emotion/react';

import { useStore } from '../../../../providers/StoreProvider';

import Presenter from './MarkdownViewer.presenter';

interface MarkdownViewerProps {
  className?: string,
  css?: SerializedStyles
}

function MarkdownViewer(props: MarkdownViewerProps) {

  const {
    className
  } = props;

  const {
    state: {
      contentProps
    }
  } = useStore();

  return (
    <Presenter
      {...contentProps}
      className={className} />
  );

}

export default MarkdownViewer;
