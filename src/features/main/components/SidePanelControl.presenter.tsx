//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import {
  File,
  SidePanelAction,
  SidePanelType
} from '../../../types/Model';

import FileVersionPanel from './FileVersionPanel';

interface SidePanelControlProps {
  action?: SidePanelAction
}

function SidePanelControl(props: SidePanelControlProps) {

  const {
    action
  } = props;

  switch (action?.type) {
    case SidePanelType.fileVersion:
      return (
        <FileVersionPanel value={action.payload as File} />
      );
    default:
      return null;
  }

}

export default React.memo(SidePanelControl);
