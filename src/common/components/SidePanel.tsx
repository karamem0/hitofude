//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { Event, EventHandler } from '../../types/Event';

import Presenter from './SidePanel.presenter';

interface SidePanelProps {
  children?: React.ReactNode,
  content?: React.ReactNode,
  defaultOpen?: boolean,
  title?: React.ReactNode,
  width?: string,
  onOpenChange?: EventHandler<boolean>
}

function SidePanel(props: SidePanelProps) {

  const {
    children,
    content,
    defaultOpen,
    title,
    width,
    onOpenChange
  } = props;

  const [ open, setOpen ] = React.useState<boolean>(defaultOpen || false);

  const handleOpenChange = React.useCallback((e?: Event, data?: boolean) => {
    setOpen(data || false);
    onOpenChange?.(e, data);
  }, [ onOpenChange ]);

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
