//
// Copyright (c) 2023-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { useStore } from '../../../providers/StoreProvider';
import { setDialogAction } from '../../../stores/Action';
import { Event } from '../../../types/Event';
import { File, FileConflict } from '../../../types/Model';

import Presenter from './ExplorerFileConflictButton.presenter';

interface ExplorerFileConflictButtonProps {
  file?: File
}

function ExplorerFileConflictButton(props: Readonly<ExplorerFileConflictButtonProps>) {

  const { file } = props;

  const {
    dispatch,
    state: {
      explorerProps
    }
  } = useStore();

  const [ conflictedFile, setConflictedFile ] = React.useState<FileConflict>();

  const handleClick = React.useCallback((event: Event) => {
    event.stopPropagation();
    dispatch(setDialogAction({
      data: conflictedFile,
      type: 'overwriteFile'
    }));
  }, [
    conflictedFile,
    dispatch
  ]);

  const handleKeyDown = React.useCallback((event: Event) => {
    const { key } = event as KeyboardEvent;
    if (key === 'Enter' || key === ' ') {
      handleClick?.(event);
    }
  }, [
    handleClick
  ]);

  React.useEffect(() => {
    setConflictedFile(explorerProps?.fileConflicts?.find((item) => item.id === file?.id));
  }, [
    explorerProps?.fileConflicts,
    file?.id
  ]);

  return (
    <Presenter
      disabled={conflictedFile == null}
      onClick={handleClick}
      onKeyDown={handleKeyDown} />
  );

}

export default ExplorerFileConflictButton;
