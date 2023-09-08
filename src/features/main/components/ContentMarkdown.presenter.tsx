//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { css } from '@emotion/react';
import { DoubleChevronLeftIcon, DoubleChevronRightIcon } from '@fluentui/react-icons-mdl2';

import ScrollPanel from '../../../common/components/ScrollPanel';
import { useTheme } from '../../../providers/ThemeProvider';
import { EventHandler } from '../../../types/Event';
import { Position } from '../../../types/Model';

import MarkdownEditor from './markdown/MarkdownEditor';
import MarkdownViewer from './markdown/MarkdownViewer';

interface ContentMarkdownProps {
  editing?: boolean,
  minimap?: boolean,
  position?: Position,
  preview?: boolean,
  previewText?: string,
  tabOpen?: boolean,
  text?: string,
  wordWrap?: boolean,
  onChangeText?: EventHandler<string>,
  onChangePosition?: EventHandler<Position>,
  onChangePreview?: EventHandler<boolean>,
  onSave?: EventHandler
}

function ContentMarkdown(props: ContentMarkdownProps) {

  const {
    editing,
    minimap,
    position,
    preview,
    previewText,
    tabOpen,
    text,
    wordWrap,
    onChangeText,
    onChangePosition,
    onChangePreview,
    onSave
  } = props;

  const { theme } = useTheme();

  const contentWidthSmall = '(100vw - 5.5rem)';
  const contentWidthLarge = '(100vw - 25.5rem)';
  const contentHeight = 'calc(100vh - 7.5rem)';

  return editing ? (
    <React.Fragment>
      {
        preview ? (
          <React.Fragment>
            <div
              css={css`
                position: fixed;
                width: calc(${contentWidthSmall} / 2 - 1rem);
                height: ${contentHeight};
                @media (width >= 960px) {
                  width: calc(${tabOpen ? contentWidthLarge : contentWidthSmall} / 2 - 1rem);
                }
              `}>
              <MarkdownEditor
                minimap={minimap}
                position={position}
                text={text}
                wordWrap={wordWrap}
                onChangePosition={onChangePosition}
                onChangeText={onChangeText}
                onSave={onSave} />
            </div>
            <div
              role="button"
              css={css`
                position: fixed;
                right: calc(${contentWidthSmall} / 2 + 1rem);
                display: grid;
                align-items: center;
                justify-items: center;
                width: 1rem;
                height: ${contentHeight};
                text-align: center;
                background-color: ${theme.colorNeutralBackground2};
                @media (width >= 960px) {
                  right: calc(${tabOpen ? contentWidthLarge : contentWidthSmall} / 2 + 1rem);
                }
              `}
              onClick={(e) => onChangePreview?.(e, !preview)}>
              {
                <DoubleChevronRightIcon
                  css={css`
                    font-size: 0.5rem;
                    line-height: 0.5rem;
                  `} />
              }
            </div>
            <ScrollPanel
              css={css`
                padding: 0 0 0 calc((${contentWidthSmall}) / 2 + 0.5rem);
                @media (width >= 960px) {
                  padding: 0 0 0 calc(${tabOpen ? contentWidthLarge : contentWidthSmall} / 2 + 0.5rem);
                }
              `}>
              {
                (state) => (
                  <MarkdownViewer
                    text={previewText}
                    css={css`
                      padding: 0 ${state?.scrollBarXVisible ? '1rem' : '0'} 0 0;
                    `} />
                )
              }
            </ScrollPanel>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div
              css={css`
                position: fixed;
                width: calc(${contentWidthSmall} - 1rem);
                height: calc(100vh - 7.5rem);
                @media (width >= 960px) {
                  width: calc(${tabOpen ? contentWidthLarge : contentWidthSmall} - 1rem);
                }
              `}>
              <MarkdownEditor
                minimap={minimap}
                position={position}
                text={text}
                wordWrap={wordWrap}
                onChangePosition={onChangePosition}
                onChangeText={onChangeText}
                onSave={onSave} />
            </div>
            <div
              role="button"
              css={css`
                position: fixed;
                right: 1rem;
                display: grid;
                align-items: center;
                justify-items: center;
                width: 1rem;
                height: calc(100vh - 7.5rem);
                text-align: center;
                background-color: ${theme.colorNeutralBackground2};
              `}
              onClick={(e) => onChangePreview?.(e, !preview)}>
              {
                <DoubleChevronLeftIcon
                  css={css`
                    font-size: 0.5rem;
                    line-height: 0.5rem;
                  `} />
              }
            </div>
          </React.Fragment>
        )
      }
    </React.Fragment>
  ) : (
    <ScrollPanel>
      {
        (state) => (
          <MarkdownViewer
            text={text}
            css={css`
              padding: 0 ${state?.scrollBarXVisible ? '1rem' : '0'} 0 0;
            `} />
        )
      }
    </ScrollPanel>
  );

}

export default React.memo(ContentMarkdown);
