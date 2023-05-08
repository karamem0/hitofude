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

import Presenter from './ExplorerHeaderMenu.presenter';

interface ExplorerHeaderMenuProps {
  exploreFolder?: Folder,
  includeUnsupportedFiles?: boolean,
  onOpenDialog?: EventHandler<DialogAction>,
  onOpenUrl?: EventHandler<string>,
  onRefreshFolder?: EventHandler<Folder>,
  onToggleIncludeUnsupportedFiles ?: EventHandler<boolean>
}

function ExplorerHeaderMenu(props: ExplorerHeaderMenuProps) {

  const {
    exploreFolder,
    includeUnsupportedFiles,
    onOpenDialog,
    onOpenUrl,
    onRefreshFolder,
    onToggleIncludeUnsupportedFiles
  } = props;

  return (
    <Presenter
      exploreFolder={exploreFolder}
      includeUnsupportedFiles={includeUnsupportedFiles}
      onOpenDialog={onOpenDialog}
      onOpenUrl={onOpenUrl}
      onRefreshFolder={onRefreshFolder}
      onToggleIncludeUnsupportedFiles={onToggleIncludeUnsupportedFiles} />
  );

}

export default ExplorerHeaderMenu;
