//
// Copyright (c) 2023-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { Event, EventHandler } from '../../types/Event';
import { ScrollPosition, ScrollSize } from '../../types/Model';

import Presenter from './ScrollPanel.presenter';

interface ScrollPanelState {
  scrollBarXVisible?: boolean,
  scrollBarYVisible?: boolean
}

interface ScrollPanelProps {
  className?: string,
  position?: ScrollPosition,
  render?: (state: ScrollPanelState) => React.ReactNode,
  onMouseEnter?: EventHandler,
  onMouseLeave?: EventHandler,
  onResize?: EventHandler<ScrollSize>,
  onScrollPositonChange?: EventHandler<ScrollPosition>
}

function ScrollPanel(props: Readonly<ScrollPanelProps>) {

  const {
    className,
    position,
    render,
    onMouseEnter,
    onMouseLeave,
    onResize,
    onScrollPositonChange
  } = props;

  const [ state, setState ] = React.useState<ScrollPanelState>({});
  const ref = React.useRef<HTMLDivElement>(null);

  const handleKeyDown = React.useCallback((event: KeyboardEvent) => {
    if (event.key === ' ') {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }, []);

  const handleResize = React.useCallback(() => {
    const { current: element } = ref;
    if (element == null) {
      return;
    }
    setState({
      scrollBarXVisible: element.scrollHeight > element.clientHeight,
      scrollBarYVisible: element.scrollWidth > element.clientWidth
    });
    onResize?.({}, {
      clientHeight: element.clientHeight,
      clientWidth: element.clientWidth,
      scrollHeight: element.scrollHeight,
      scrollWidth: element.scrollWidth
    });
  }, [
    onResize
  ]);

  const handleScroll = React.useCallback((event: Event) => {
    const { current: element } = ref;
    if (element == null) {
      return;
    }
    onScrollPositonChange?.(event, {
      scrollX: element.scrollLeft,
      scrollY: element.scrollTop
    });
  }, [
    onScrollPositonChange
  ]);

  React.useEffect(() => {
    const { current: element } = ref;
    if (element == null) {
      return;
    }
    const observer = new ResizeObserver(handleResize);
    observer.observe(element);
    return () => observer.unobserve(element);
  }, [
    handleResize,
    render
  ]);

  React.useEffect(() => {
    const { current: element } = ref;
    if (element == null) {
      return;
    }
    element.scrollTo({
      left: position?.scrollX,
      top: position?.scrollY
    });
  }, [
    position
  ]);

  React.useEffect(() => {
    const { current: element } = ref;
    if (element == null) {
      return;
    }
    element.addEventListener('keydown', handleKeyDown);
    return () => element.removeEventListener('keydown', handleKeyDown);
  }, [
    handleKeyDown
  ]);

  React.useEffect(() => {
    const { current: element } = ref;
    if (element == null) {
      return;
    }
    element.addEventListener('scroll', handleScroll);
    return () => element.removeEventListener('scroll', handleScroll);
  }, [
    handleScroll
  ]);

  React.useEffect(() => {
    if (onMouseEnter == null) {
      return;
    }
    const { current: element } = ref;
    if (element == null) {
      return;
    }
    element.addEventListener('mouseenter', onMouseEnter);
    return () => element.removeEventListener('mouseenter', onMouseEnter);
  }, [
    onMouseEnter
  ]);

  React.useEffect(() => {
    if (onMouseLeave == null) {
      return;
    }
    const { current: element } = ref;
    if (element == null) {
      return;
    }
    element.addEventListener('mouseleave', onMouseLeave);
    return () => element.removeEventListener('mouseleave', onMouseLeave);
  }, [
    onMouseLeave
  ]);

  return (
    <Presenter
      className={className}
      ref={ref}>
      {render?.(state)}
    </Presenter>
  );

}

export default ScrollPanel;
