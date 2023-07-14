//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { useStore } from '../../providers/StoreProvider';
import { setDialogAction } from '../../stores/Action';
import { ArgumentNullError } from '../../types/Error';
import { Event } from '../../types/Event';

import Presenter from './ModalDialog.presenter';

interface ModalDialogProps {
  children?: [React.JSX.Element, React.JSX.Element] | React.JSX.Element
}

function ModalDialog(props: ModalDialogProps) {

  const { children } = props;

  const { dispatch } = useStore();
  const [ open, setOpen ] = React.useState<boolean>(true);

  const handleOpenChange = React.useCallback((_?: Event, data?: boolean) => {
    if (data == null) {
      throw new ArgumentNullError();
    }
    setOpen(data);
    if (data) {
      return;
    }
    dispatch(setDialogAction());
  }, [
    dispatch
  ]);

  return (
    <Presenter
      open={open}
      onOpenChange={handleOpenChange}>
      {children}
    </Presenter>
  );

}

export default ModalDialog;
