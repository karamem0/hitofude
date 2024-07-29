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
import { MarkdownToolbarAction, ScrollPosition } from '../../../types/Model';
import MarkdownEditor from '../../markdown/components/MarkdownEditor';
import MarkdownSplitter from '../../markdown/components/MarkdownSplitter';
import MarkdownToolbar from '../../markdown/components/MarkdownToolbar';
import MarkdownViewer from '../../markdown/components/MarkdownViewer';
import { MarkdownEditorHandle } from '../../markdown/types/Handle';

interface ContentMarkdownProps {
  defaultText?: string,
  editing?: boolean,
  minimap?: boolean,
  preview?: boolean,
  scroll?: boolean,
  scrollPosition?: ScrollPosition,
  tabOpen?: boolean,
  text?: string,
  wordWrap?: boolean,
  onSave?: EventHandler,
  onScrollPositonChange?: EventHandler<ScrollPosition>,
  onTextChange?: EventHandler<string>,
  onToolbarClick?: EventHandler<MarkdownToolbarAction>
}

function ContentMarkdown(props: Readonly<ContentMarkdownProps>, ref: React.Ref<MarkdownEditorHandle>) {

  const {
    defaultText,
    editing,
    minimap,
    preview,
    scroll,
    scrollPosition,
    text,
    wordWrap,
    onSave,
    onScrollPositonChange,
    onTextChange,
    onToolbarClick
  } = props;

  const { theme } = useTheme();

  return editing ? (
    <ScrollSynchronizer
      defaultElement1Position={scrollPosition}
      enabled={scroll}
      render={
        (state) => (
          <div
            css={css`
              display: grid;
              grid-template-rows: 2.5rem 1fr;
              grid-template-columns: auto auto auto;
              @media all and (width <= 960px) {
                height: ${layouts.contentBody.height.small};
              }
              @media not all and (width <= 960px) {
                height: ${layouts.contentBody.height.large};
              }
            `}>
            <MarkdownToolbar
              css={css`
                grid-row: 1 / 2;
                grid-column: 1 / 4;
              `}
              onClick={onToolbarClick} />
            <MarkdownEditor
              ref={ref}
              minimap={minimap}
              scrollPosition={state.element1Position}
              text={defaultText}
              wordWrap={wordWrap}
              css={css`
                grid-row: 2 / 3;
                grid-column: 1 / 2;
              `}
              onMouseEnter={state.onElement1MouseEnter}
              onMouseLeave={state.onElement1MouseLeave}
              onResize={state.onElement1Resize}
              onSave={onSave}
              onTextChange={onTextChange}
              onScrollPositonChange={(event, data) => {
                state.onElement1ScrollChange?.(event, data);
                onScrollPositonChange?.(event, data);
              }} />
            <MarkdownSplitter
              css={css`
                grid-row: 2 / 3;
                grid-column: 2 / 3;
              `} />
            <ScrollPanel
              position={state.element2Position}
              css={css`
                display: ${preview ? 'block' : 'none'};
                grid-row: 2 / 3;
                grid-column: 3 / 4;
                padding: 0 0 0 0.5rem;
                @media (width < 960px) {
                  border: ${theme.colorNeutralStencil1Alpha} 1px solid;
                }
                @media (width >= 960px) {
                  padding: 0 0 0 0.5rem;
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
          </div>
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

export default React.memo(React.forwardRef(ContentMarkdown));
