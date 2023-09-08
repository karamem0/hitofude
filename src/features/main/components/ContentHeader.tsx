//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { useStore } from '../../../providers/StoreProvider';
import { EventHandler } from '../../../types/Event';
import { ContentMenuAction } from '../../../types/Model';

import Presenter from './ContentHeader.presenter';

interface ContentHeaderProps {
  changed?: boolean,
  onCancel?: EventHandler,
  onContextMenu?: EventHandler<ContentMenuAction>,
  onEdit?: EventHandler,
  onSave?: EventHandler<boolean>
}

function ContentHeader(props: ContentHeaderProps) {

  const {
    changed,
    onCancel,
    onContextMenu,
    onEdit,
    onSave
  } = props;

  const {
    state: {
      contentProps
    }
  } = useStore();

  return (
    <Presenter
      {...contentProps}
      changed={changed}
      onCancel={onCancel}
      onContextMenu={onContextMenu}
      onEdit={onEdit}
      onSave={onSave} />
  );

}

export default React.memo(ContentHeader);
