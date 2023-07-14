//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { Dialog } from '@fluentui/react-components';

import { EventHandler } from '../../types/Event';

interface ModalDialogProps {
  children?: [React.JSX.Element, React.JSX.Element] | React.JSX.Element,
  open?: boolean,
  onOpenChange?: EventHandler<boolean>
}

function ModalDialog(props: ModalDialogProps) {

  const {
    children,
    open,
    onOpenChange
  } = props;

  return (
    <Dialog
      modalType='modal'
      open={open}
      onOpenChange={(e, data) => onOpenChange?.(e, data.open)}>
      {children ?? (<React.Fragment />)}
    </Dialog>
  );

}

export default ModalDialog;
