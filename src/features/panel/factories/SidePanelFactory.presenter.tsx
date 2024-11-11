//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { File, SidePanelAction } from '../../../types/Model';
import FileVersionPanel from '../components/FileVersionPanel';

interface SidePanelFactoryProps {
  action?: SidePanelAction
}

function SidePanelFactory(props: Readonly<SidePanelFactoryProps>) {

  const {
    action
  } = props;

  switch (action?.type) {
    case 'fileVersion':
      return (
        <FileVersionPanel value={action.data as File} />
      );
    default:
      return null;
  }

}

export default React.memo(SidePanelFactory);
