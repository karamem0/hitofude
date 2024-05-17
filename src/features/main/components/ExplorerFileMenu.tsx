//
// Copyright (c) 2023-2024 karamem0
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
  onDownload?: EventHandler,
  onOpenDialog?: EventHandler<DialogAction>,
  onOpenUrl?: EventHandler<string>
}

function ExplorerFileMenu(props: Readonly<ExplorerFileMenuProps>) {

  const {
    value,
    onDownload,
    onOpenDialog,
    onOpenUrl
  } = props;

  return (
    <Presenter
      value={value}
      onDownload={onDownload}
      onOpenDialog={onOpenDialog}
      onOpenUrl={onOpenUrl} />
  );

}

export default ExplorerFileMenu;
