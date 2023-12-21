//
// Copyright (c) 2023 karamem0
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
import {
  contentHeight,
  contentWidthLarge,
  contentWidthSmall
} from '../../../themes/Layout';
import { EventHandler } from '../../../types/Event';
import { ScrollPosition } from '../../../types/Model';

import MarkdownEditor from './markdown/MarkdownEditor';
import MarkdownSplitBar from './markdown/MarkdownSplitBar';
import MarkdownViewer from './markdown/MarkdownViewer';

interface ContentMarkdownProps {
  editing?: boolean,
  minimap?: boolean,
  position?: ScrollPosition,
  preview?: boolean,
  previewText?: string,
  scroll?: boolean,
  tabOpen?: boolean,
  text?: string,
  wordWrap?: boolean,
  onChangeText?: EventHandler<string>,
  onSave?: EventHandler,
  onScroll?: EventHandler<ScrollPosition>
}

function ContentMarkdown(props: Readonly<ContentMarkdownProps>) {

  const {
    editing,
    minimap,
    position,
    preview,
    previewText,
    scroll,
    tabOpen,
    text,
    wordWrap,
    onChangeText,
    onScroll,
    onSave
  } = props;

  const { theme } = useTheme();

  return editing ? (
    <ScrollSynchronizer
      defaultElement1Position={position}
      enabled={scroll}>
      {
        (state) => (
          <React.Fragment>
            <div
              css={css`
                position: fixed;
                width: calc(${contentWidthSmall} / ${preview ? 2 : 1} - 1rem);
                height: ${contentHeight};
                @media (width >= 960px) {
                  width: calc(${tabOpen ? contentWidthLarge : contentWidthSmall} / ${preview ? 2 : 1} - 1rem);
                }
              `}>
              <MarkdownEditor
                minimap={minimap}
                position={state.element1Position}
                text={text}
                wordWrap={wordWrap}
                onChangeText={onChangeText}
                onMouseEnter={state.onElement1MouseEnter}
                onMouseLeave={state.onElement1MouseLeave}
                onResize={state.onElement1Resize}
                onSave={onSave}
                onScroll={(e, data) => {
                  state.onElement1Scroll?.(e, data);
                  onScroll?.(e, data);
                }} />
            </div>
            <MarkdownSplitBar />
            <ScrollPanel
              position={state.element2Position}
              css={css`
                display: ${preview ? 'block' : 'none'};
                padding: 0 0 0 0.5rem;
                margin: 0 0 0 calc((${contentWidthSmall}) / 2);
                border: ${theme.colorNeutralStencil1Alpha} 1px solid;
                @media (width >= 960px) {
                  padding: 0 0 0 0.5rem;
                  margin: 0 0 0 calc(${tabOpen ? contentWidthLarge : contentWidthSmall} / 2);
                }
              `}
              onMouseEnter={state.onElement2MouseEnter}
              onMouseLeave={state.onElement2MouseLeave}
              onResize={state.onElement2Resize}
              onScroll={state.onElement2Scroll}>
              {
                (state) => (
                  <MarkdownViewer
                    text={previewText}
                    css={css`
                      padding: 0 ${state.scrollBarXVisible ? '1rem' : 0} 1rem 0;
                    `} />
                )
              }
            </ScrollPanel>
          </React.Fragment>
        )
      }
    </ScrollSynchronizer>
  ) : (
    <ScrollPanel>
      {
        (state) => (
          <MarkdownViewer
            text={text}
            css={css`
              padding: 0 ${state.scrollBarXVisible ? '1rem' : 0} 1rem 0;
            `} />
        )
      }
    </ScrollPanel>
  );

}

export default React.memo(ContentMarkdown);
