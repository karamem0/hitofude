//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { SerializedStyles } from '@emotion/react';

import { Event, EventHandler } from '../../types/Event';
import { ScrollPosition, ScrollSize } from '../../types/Model';

import Presenter from './ScrollPanel.presenter';

interface ScrollPanelState {
  scrollBarXVisible?: boolean,
  scrollBarYVisible?: boolean
}

interface ScrollPanelProps {
  children?: (state: ScrollPanelState) => React.ReactNode,
  className?: string,
  css?: SerializedStyles,
  position?: ScrollPosition,
  onMouseEnter?: EventHandler,
  onMouseLeave?: EventHandler,
  onResize?: EventHandler<ScrollSize>,
  onScroll?: EventHandler<ScrollPosition>
}

function ScrollPanel(props: Readonly<ScrollPanelProps>) {

  const {
    children,
    className,
    position,
    onMouseEnter,
    onMouseLeave,
    onResize,
    onScroll
  } = props;

  const [ state, setState ] = React.useState<ScrollPanelState>({});

  const ref = React.useRef<HTMLDivElement>(null);

  const handleKeyDown = React.useCallback((e: KeyboardEvent) => {
    if (e.key === ' ') {
      e.preventDefault();
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

  const handleScroll = React.useCallback((e: Event) => {
    const { current: element } = ref;
    if (element == null) {
      return;
    }
    onScroll?.(e, {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    });
  }, [
    onScroll
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
    children,
    handleResize
  ]);

  React.useEffect(() => {
    const { current: element } = ref;
    if (element == null) {
      return;
    }
    element.scrollTo({
      left: position?.scrollLeft,
      top: position?.scrollTop
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
      ref={ref}
      className={className}>
      {children?.(state)}
    </Presenter>
  );

}

export default ScrollPanel;
