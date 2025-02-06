//
// Copyright (c) 2023-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { EventHandler } from '../../../types/Event';
import Presenter from './ContentSaveButton.presenter';

interface ContentSaveButtonProps {
  disabled?: boolean,
  onClick?: EventHandler<boolean>
}

function ContentSaveButton(props: Readonly<ContentSaveButtonProps>) {

  const {
    disabled,
    onClick
  } = props;

  return (
    <Presenter
      disabled={disabled}
      onClick={onClick} />
  );

}

export default ContentSaveButton;
