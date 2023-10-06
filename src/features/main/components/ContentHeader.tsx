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

import Presenter from './ContentHeader.presenter';

interface ContentHeaderProps {
  onCancel?: EventHandler,
  onEdit?: EventHandler,
  onSave?: EventHandler<boolean>
}

function ContentHeader(props: ContentHeaderProps) {

  const {
    onCancel,
    onEdit,
    onSave
  } = props;

  const {
    state: {
      contentProps,
      markdownProps
    }
  } = useStore();

  return (
    <Presenter
      {...contentProps}
      changed={markdownProps?.changed}
      onCancel={onCancel}
      onEdit={onEdit}
      onSave={onSave} />
  );

}

export default React.memo(ContentHeader);
