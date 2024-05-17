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

import Presenter from './ExplorerFolderMenu.presenter';

interface ExplorerFolderMenuProps {
  value: Folder,
  onOpenDialog?: EventHandler<DialogAction>,
  onOpenUrl?: EventHandler<string>
}

function ExplorerFolderMenu(props: Readonly<ExplorerFolderMenuProps>) {

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

export default ExplorerFolderMenu;
