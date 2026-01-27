//
// Copyright (c) 2023-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { useStore } from '../../../providers/StoreProvider';
import { setContentShowPreview } from '../../../stores/Action';
import { Event } from '../../../types/Event';

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

  const handleChangeShowPreview = React.useCallback((_: Event, data?: boolean) => {
    dispatch(setContentShowPreview(data));
  }, [
    dispatch
  ]);

  return (
    <Presenter
      className={className}
      showPreview={contentProps?.showPreview}
      onChangeShowPreview={handleChangeShowPreview} />
  );

}

export default MarkdownSplitter;
