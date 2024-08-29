//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { Event } from '../../../types/Event';
import { setContentPreview } from '../../../stores/Action';
import { useStore } from '../../../providers/StoreProvider';

import Presenter from './MarkdownSplitter.presenter';

interface MarkdownSplitterProps {
  className?: string
}

function MarkdownSplitter(props: Readonly<MarkdownSplitterProps>) {

  const { className } = props;

  const {
    dispatch,
    state: {
      contentProps
    }
  } = useStore();

  const handleChangePreview = React.useCallback((_: Event, data?: boolean) => {
    dispatch(setContentPreview(data));
  }, [
    dispatch
  ]);

  return (
    <Presenter
      className={className}
      preview={contentProps?.preview}
      onChangePreview={handleChangePreview} />
  );

}

export default MarkdownSplitter;
