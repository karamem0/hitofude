//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { Event, EventHandler } from '../../types/Event';
import { ScrollPosition, ScrollSize } from '../../types/Model';
import { getScrollY } from '../../utils/Scroll';

interface ScrollSynchronizerState {
  element1Position?: ScrollPosition,
  element2Position?: ScrollPosition,
  onElement1MouseEnter?: EventHandler,
  onElement1MouseLeave?: EventHandler,
  onElement1Resize?: EventHandler<ScrollSize>,
  onElement1ScrollChange?: EventHandler<ScrollPosition>,
  onElement2MouseEnter?: EventHandler,
  onElement2MouseLeave?: EventHandler,
  onElement2Resize?: EventHandler<ScrollSize>,
  onElement2ScrollChange?: EventHandler<ScrollPosition>
}

interface ScrollSynchronizerProps {
  enabled?: boolean,
  defaultElement1Position?: ScrollPosition,
  defaultElement2Position?: ScrollPosition,
  render?: (state: ScrollSynchronizerState) => React.ReactNode
}

function ScrollSynchronizer(props: Readonly<ScrollSynchronizerProps>) {

  const {
    enabled,
    defaultElement1Position,
    defaultElement2Position,
    render
  } = props;

  const [ element1Position, setElement1Position ] = React.useState<ScrollPosition | undefined>(defaultElement1Position);
  const [ element2Position, setElement2Position ] = React.useState<ScrollPosition | undefined>(defaultElement2Position);

  const element1Active = React.useRef<boolean>();
  const element1Size = React.useRef<ScrollSize>();
  const element2Active = React.useRef<boolean>();
  const element2Size = React.useRef<ScrollSize>();

  const handleElement1MouseEnter = React.useCallback(() => {
    element1Active.current = true;
  }, []);

  const handleElement1MouseLeave = React.useCallback(() => {
    element1Active.current = false;
  }, []);

  const handleElement1Resize = React.useCallback((_: Event, data?: ScrollSize) => {
    element1Size.current = data;
  }, []);

  const handleElement1ScrollChange = React.useCallback((_: Event, data?: ScrollPosition) => {
    if (!element1Active.current) {
      return;
    }
    if (!enabled) {
      return;
    }
    setElement2Position((value) => ({
      ...value,
      scrollY: getScrollY(data, element1Size.current, element2Size.current)
    }));
  }, [
    element1Active,
    enabled
  ]);

  const handleElement2MouseEnter = React.useCallback(() => {
    element2Active.current = true;
  }, []);

  const handleElement2MouseLeave = React.useCallback(() => {
    element2Active.current = false;
  }, []);

  const handleElement2Resize = React.useCallback((_: Event, data?: ScrollSize) => {
    element2Size.current = data;
  }, []);

  const handleElement2ScrollChange = React.useCallback((_: Event, data?: ScrollPosition) => {
    if (!element2Active.current) {
      return;
    }
    if (!enabled) {
      return;
    }
    setElement1Position((value) => ({
      ...value,
      scrollY: getScrollY(data, element2Size.current, element1Size.current)
    }));
  }, [
    element2Active,
    enabled
  ]);

  return (
    <React.Fragment>
      {
        render?.({
          element1Position,
          element2Position,
          onElement1MouseEnter: handleElement1MouseEnter,
          onElement1MouseLeave: handleElement1MouseLeave,
          onElement1Resize: handleElement1Resize,
          onElement1ScrollChange: handleElement1ScrollChange,
          onElement2MouseEnter: handleElement2MouseEnter,
          onElement2MouseLeave: handleElement2MouseLeave,
          onElement2Resize: handleElement2Resize,
          onElement2ScrollChange: handleElement2ScrollChange
        })
      }
    </React.Fragment>
  );

}

export default React.memo(ScrollSynchronizer);
