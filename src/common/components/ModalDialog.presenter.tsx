//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { Dialog } from '@fluentui/react-components';
import { EventHandler } from '../../types/Event';

interface ModalDialogProps {
  open?: boolean,
  onOpenChange?: EventHandler<boolean>
}

function ModalDialog(props: Readonly<React.PropsWithChildren<ModalDialogProps>>) {

  const {
    children,
    open,
    onOpenChange
  } = props;

  return (
    <Dialog
      modalType="modal"
      open={open}
      onOpenChange={(event, data) => onOpenChange?.(event, data.open)}>
      {children as ([React.ReactElement, React.ReactElement] | React.ReactElement)}
    </Dialog>
  );

}

export default React.memo(ModalDialog);
