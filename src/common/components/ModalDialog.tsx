//
// Copyright (c) 2023-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { ArgumentNullError } from '../../types/Error';
import { Event } from '../../types/Event';
import Presenter from './ModalDialog.presenter';
import { setDialogAction } from '../../stores/Action';
import { useStore } from '../../providers/StoreProvider';

function ModalDialog(props: Readonly<React.PropsWithChildren<unknown>>) {

  const { children } = props;

  const { dispatch } = useStore();
  const [ open, setOpen ] = React.useState<boolean>(true);

  const handleOpenChange = React.useCallback((_: Event, data?: boolean) => {
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
