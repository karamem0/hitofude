//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import {
  DialogType,
  File,
  FileVersion
} from '../../../types/Model';
import { ArgumentNullError } from '../../../types/Error';
import { Event } from '../../../types/Event';
import Presenter from './FileVersionPanel.presenter';
import { setDialogAction } from '../../../stores/Action';
import { useService } from '../../../providers/ServiceProvider';
import { useStore } from '../../../providers/StoreProvider';

interface FileVersionPanelProps {
  value?: File
}

function FileVersionPanel(props: Readonly<FileVersionPanelProps>) {

  const {
    value
  } = props;

  const { dispatch } = useStore();
  const { graph } = useService();
  const [ items, setItems ] = React.useState<FileVersion[]>();

  const handleClick = React.useCallback((_: Event, data?: FileVersion) => {
    if (data == null) {
      throw new ArgumentNullError();
    }
    dispatch(setDialogAction({
      type: DialogType.restoreFile,
      data
    }));
  }, [
    dispatch
  ]);

  const handleKeyDown = React.useCallback((event: Event, data?: FileVersion) => {
    const { key } = event as KeyboardEvent;
    if (key === 'Enter' || key === ' ') {
      handleClick?.(event, data);
    }
  }, [
    handleClick
  ]);

  React.useEffect(() => {
    if (value == null) {
      return;
    }
    (async () => {
      setItems(await graph.getFileVersions(value));
    })();
  }, [
    graph,
    value
  ]);

  return (
    <Presenter
      items={items}
      onClick={handleClick}
      onKeyDown={handleKeyDown} />
  );

}

export default FileVersionPanel;
