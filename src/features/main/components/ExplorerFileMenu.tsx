//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { EventHandler } from '../../../types/Event';
import { DialogAction, Folder } from '../../../types/Model';

import Presenter from './ExplorerFileMenu.presenter';

interface ExplorerFileMenuProps {
  value: Folder,
  onOpenDialog?: EventHandler<DialogAction>,
  onOpenUrl?: EventHandler<string>
}

function ExplorerFileMenu(props: ExplorerFileMenuProps) {

  const {
    value,
    onOpenDialog,
    onOpenUrl
  } = props;

  return (
    <Presenter
      value={value}
      onOpenDialog={onOpenDialog}
      onOpenUrl={onOpenUrl} />
  );

}

export default ExplorerFileMenu;
