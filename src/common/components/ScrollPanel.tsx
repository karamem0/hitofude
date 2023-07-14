//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { SerializedStyles } from '@emotion/react';

import Presenter from './ScrollPanel.presenter';

interface ScrollPanelState {
  scrollBarXVisible: boolean,
  scrollBarYVisible: boolean
}

interface ScrollPanelProps {
  children?: (state?: ScrollPanelState) => React.ReactNode,
  className?: string,
  css?: SerializedStyles
}

function ScrollPanel(props: ScrollPanelProps) {

  const {
    children,
    className
  } = props;

  const [ state, setState ] = React.useState<ScrollPanelState>();

  const ref = React.useRef<HTMLDivElement>(null);

  const handleResize = React.useCallback(() => {
    const { current: element } = ref;
    if (element == null) {
      return;
    }
    setState({
      scrollBarXVisible: element.scrollHeight > element.clientHeight,
      scrollBarYVisible: element.scrollWidth > element.clientWidth
    });
  }, []);

  React.useEffect(() => {
    const { current: element } = ref;
    if (element == null) {
      return;
    }
    const observer = new ResizeObserver(handleResize);
    observer.observe(element);
    return () => observer.unobserve(element);
  }, [
    children,
    handleResize
  ]);

  return (
    <Presenter
      ref={ref}
      className={className}>
      {children?.(state)}
    </Presenter>
  );

}

export default ScrollPanel;
