//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { useService } from '../../../providers/ServiceProvider';
import { useStore } from '../../../providers/StoreProvider';
import { setDialogAction } from '../../../stores/Action';
import { ArgumentNullError } from '../../../types/Error';
import { Event } from '../../../types/Event';
import {
  DialogAction,
  File,
  FileVersion
} from '../../../types/Model';

import Presenter from './FileVersionPanel.presenter';

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

  const handleRestore = React.useCallback((_: Event, data?: DialogAction) => {
    if (data == null) {
      throw new ArgumentNullError();
    }
    dispatch(setDialogAction(data));
  }, [
    dispatch
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
      onRestore={handleRestore} />
  );

}

export default FileVersionPanel;
