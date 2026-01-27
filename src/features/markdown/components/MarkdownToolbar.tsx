//
// Copyright (c) 2023-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { EventHandler } from '../../../types/Event';
import { MarkdownToolbarAction } from '../../../types/Model';

import Presenter from './MarkdownToolbar.presenter';

interface MarkdownToolbarProps {
  className?: string,
  onClick?: EventHandler<MarkdownToolbarAction>
}

function MarkdownToolbar(props: Readonly<MarkdownToolbarProps>) {

  const {
    className,
    onClick
  } = props;

  return (
    <Presenter
      className={className}
      onClick={onClick} />
  );

}

export default MarkdownToolbar;
