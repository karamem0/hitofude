//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { useStore } from '../../providers/StoreProvider';
import { setSidePanelAction } from '../../stores/Action';
import { ArgumentNullError } from '../../types/Error';
import { Event } from '../../types/Event';

import Presenter from './SidePanel.presenter';

interface SidePanelProps {
  className?: string,
  content?: React.ReactNode,
  title?: React.ReactNode,
  width?: string
}

function SidePanel(props: Readonly<React.PropsWithChildren<SidePanelProps>>) {

  const {
    className,
    children,
    content,
    title
  } = props;

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
    dispatch(setSidePanelAction());
  }, [
    dispatch
  ]);

  return (
    <Presenter
      className={className}
      content={content}
      open={open}
      title={title}
      onOpenChange={handleOpenChange}>
      {children}
    </Presenter>
  );

}

export default SidePanel;
