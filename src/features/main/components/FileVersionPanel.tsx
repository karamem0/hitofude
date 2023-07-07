//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { useService } from '../../../providers/ServiceProvider';
import { useStore } from '../../../providers/StoreProvider';
import { setSidePanelAction } from '../../../stores/Action';
import { Event } from '../../../types/Event';
import { File, FileVersion } from '../../../types/Model';

import Presenter from './FileVersionPanel.presenter';

interface FileVersionPanelProps {
  value?: File
}

function FileVersionPanel(props: FileVersionPanelProps) {

  const {
    value
  } = props;

  const { dispatch } = useStore();
  const { graph } = useService();

  const [ items, setItems ] = React.useState<FileVersion[]>();

  const handleOpenChange = React.useCallback((_?: Event, data?: boolean) => {
    const open = data ?? false;
    if (!open) {
      dispatch(setSidePanelAction());
    }
  }, [
    dispatch
  ]);

  React.useEffect(() => {
    if (!value) {
      return;
    }
    (async () => {
      setItems(await graph.getFileVersions(value.id));
    })();
  }, [
    graph,
    value
  ]);

  return (
    <Presenter
      items={items}
      onOpenChange={handleOpenChange} />
  );

}

export default FileVersionPanel;
