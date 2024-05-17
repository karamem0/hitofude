//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { css } from '@emotion/react';

import ScrollPanel from '../../../common/components/ScrollPanel';
import ScrollSynchronizer from '../../../common/components/ScrollSynchronizer';
import { useTheme } from '../../../providers/ThemeProvider';
import { layouts } from '../../../themes/Layout';
import { EventHandler } from '../../../types/Event';
import {
  CursorPosition,
  CursorSelection,
  ScrollPosition
} from '../../../types/Model';
import MarkdownEditor from '../../markdown/components/MarkdownEditor';
import MarkdownSplitBar from '../../markdown/components/MarkdownSplitBar';
import MarkdownViewer from '../../markdown/components/MarkdownViewer';

interface ContentMarkdownProps {
  defaultCursorPosition?: CursorPosition,
  defaultCursorSelection?: CursorSelection,
  defaultText?: string,
  editing?: boolean,
  minimap?: boolean,
  position?: ScrollPosition,
  preview?: boolean,
  scroll?: boolean,
  tabOpen?: boolean,
  text?: string,
  wordWrap?: boolean,
  onCursorPositionChange?: EventHandler<CursorPosition>,
  onCursorSelectionChange?: EventHandler<CursorSelection>,
  onSave?: EventHandler,
  onScrollPositonChange?: EventHandler<ScrollPosition>,
  onTextChange?: EventHandler<string>
}

function ContentMarkdown(props: Readonly<ContentMarkdownProps>) {

  const {
    defaultCursorPosition,
    defaultCursorSelection,
    defaultText,
    editing,
    minimap,
    position,
    preview,
    scroll,
    tabOpen,
    text,
    wordWrap,
    onCursorPositionChange,
    onCursorSelectionChange,
    onScrollPositonChange,
    onSave,
    onTextChange
  } = props;

  const { theme } = useTheme();

  return editing ? (
    <ScrollSynchronizer
      defaultElement1Position={position}
      enabled={scroll}
      render={
        (state) => (
          <React.Fragment>
            <div
              css={css`
                position: fixed;
                @media all and (width <= 960px) {
                  width: calc(${layouts.contentBody.width.small} / ${preview ? 2 : 1} - 1rem);
                  height: ${layouts.contentBody.height.small};
                }
                @media not all and (width <= 960px) {
                  width: calc(${tabOpen ? layouts.contentBody.width.large : layouts.contentBody.width.small} / ${preview ? 2 : 1} - 1rem);
                  height: ${layouts.contentBody.height.large};
                }
              `}>
              <MarkdownEditor
                cursorPosition={defaultCursorPosition}
                cursorSelection={defaultCursorSelection}
                minimap={minimap}
                scrollPosition={state.element1Position}
                text={defaultText}
                wordWrap={wordWrap}
                onCursorPositionChange={onCursorPositionChange}
                onCursorSelectionChange={onCursorSelectionChange}
                onMouseEnter={state.onElement1MouseEnter}
                onMouseLeave={state.onElement1MouseLeave}
                onResize={state.onElement1Resize}
                onSave={onSave}
                onTextChange={onTextChange}
                onScrollPositonChange={(e, data) => {
                  state.onElement1ScrollChange?.(e, data);
                  onScrollPositonChange?.(e, data);
                }} />
            </div>
            <MarkdownSplitBar />
            <ScrollPanel
              position={state.element2Position}
              css={css`
                display: ${preview ? 'block' : 'none'};
                padding: 0 0 0 0.5rem;
                @media (width < 960px) {
                  margin: 0 0 0 calc((${layouts.contentBody.width.small}) / 2);
                  border: ${theme.colorNeutralStencil1Alpha} 1px solid;
                }
                @media (width >= 960px) {
                  padding: 0 0 0 0.5rem;
                  margin: 0 0 0 calc(${tabOpen ? layouts.contentBody.width.large : layouts.contentBody.width.small} / 2);
                }
              `}
              render={
                (state) => (
                  <MarkdownViewer
                    text={text}
                    css={css`
                      padding: 0 ${state.scrollBarXVisible ? '1rem' : 0} 1rem 0;
                    `} />
                )
              }
              onMouseEnter={state.onElement2MouseEnter}
              onMouseLeave={state.onElement2MouseLeave}
              onResize={state.onElement2Resize}
              onScrollPositonChange={state.onElement2ScrollChange} />
          </React.Fragment>
        )
      } />
  ) : (
    <ScrollPanel
      render={
        (state) => (
          <MarkdownViewer
            text={defaultText}
            css={css`
              padding: 0 ${state.scrollBarXVisible ? '1rem' : 0} 1rem 0;
            `} />
        )
      } />
  );

}

export default React.memo(ContentMarkdown);
