//
// Copyright (c) 2023 karamem0
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
  children?: React.ReactNode,
  content?: React.ReactNode,
  title?: React.ReactNode,
  width?: string
}

function SidePanel(props: Readonly<SidePanelProps>) {

  const {
    children,
    content,
    title,
    width
  } = props;

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
    dispatch(setSidePanelAction());
  }, [
    dispatch
  ]);

  return (
    <Presenter
      content={content}
      open={open}
      title={title}
      width={width}
      onOpenChange={handleOpenChange}>
      {children}
    </Presenter>
  );

}

export default SidePanel;
