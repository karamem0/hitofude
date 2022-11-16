//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { EventHandler } from '../../../types/Event';
import { DialogAction } from '../types/Dialog';

import Presenter from './DialogControl.presenter';

interface DialogControlProps {
  action?: DialogAction,
  onOpenDialog?: EventHandler<DialogAction>
}

function DialogControl(props: DialogControlProps) {

  const {
    action,
    onOpenDialog
  } = props;

  return (
    <Presenter
      action={action}
      onOpenDialog={onOpenDialog} />
  );

}

export default DialogControl;
