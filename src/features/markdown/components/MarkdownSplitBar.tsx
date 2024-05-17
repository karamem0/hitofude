//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { useStore } from '../../../providers/StoreProvider';
import { setContentPreview } from '../../../stores/Action';
import { Event } from '../../../types/Event';

import Presenter from './MarkdownSplitBar.presenter';

function MarkdownSplitBar() {

  const {
    dispatch,
    state: {
      contentProps,
      tabProps
    }
  } = useStore();

  const handleChangePreview = React.useCallback((_?: Event, data?: boolean) => {
    dispatch(setContentPreview(data));
  }, [
    dispatch
  ]);

  return (
    <Presenter
      preview={contentProps?.preview}
      tabOpen={tabProps?.open}
      onChangePreview={handleChangePreview} />
  );

}

export default MarkdownSplitBar;
