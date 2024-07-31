//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { useStore } from '../../../providers/StoreProvider';
import { setDialogAction } from '../../../stores/Action';
import { Event } from '../../../types/Event';
import {
  DialogType,
  File,
  FileConflict
} from '../../../types/Model';

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

  const handleClick = React.useCallback((event: Event, data?: FileConflict) => {
    event.stopPropagation();
    dispatch(setDialogAction({
      type: DialogType.overwriteFile,
      data
    }));
  }, [
    dispatch
  ]);

  return (
    <Presenter
      fileConflict={explorerProps?.fileConflicts?.find((item) => item.id === file?.id)}
      onClick={handleClick} />
  );

}

export default ExplorerFileConflictButton;
