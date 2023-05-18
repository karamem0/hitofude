//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { EventHandler } from '../../../types/Event';

import Presenter from './MarkdownControl.presenter';

interface MarkdownControlProps {
  content?: string,
  editing?: boolean,
  onChange?: EventHandler<string>
}

function MarkdownControl(props: MarkdownControlProps) {

  const {
    content,
    editing,
    onChange
  } = props;

  return (
    <Presenter
      content={content}
      editing={editing}
      onChange={onChange} />
  );

}

export default MarkdownControl;
