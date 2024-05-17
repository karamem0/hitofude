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

import Presenter from './ExplorerHeaderMenu.presenter';

interface ExplorerHeaderMenuProps {
  folder?: Folder,
  allFiles?: boolean,
  onOpenDialog?: EventHandler<DialogAction>,
  onOpenUrl?: EventHandler<string>,
  onRefreshFolder?: EventHandler<Folder>,
  onToggleExploreAllFiles ?: EventHandler<boolean>
}

function ExplorerHeaderMenu(props: Readonly<ExplorerHeaderMenuProps>) {

  const {
    allFiles,
    folder,
    onOpenDialog,
    onOpenUrl,
    onRefreshFolder,
    onToggleExploreAllFiles
  } = props;

  return (
    <Presenter
      allFiles={allFiles}
      folder={folder}
      onOpenDialog={onOpenDialog}
      onOpenUrl={onOpenUrl}
      onRefreshFolder={onRefreshFolder}
      onToggleExploreAllFiles={onToggleExploreAllFiles} />
  );

}

export default ExplorerHeaderMenu;
