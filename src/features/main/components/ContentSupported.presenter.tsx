//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { css } from '@emotion/react';

import { layouts } from '../../../themes/Layout';
import { EventHandler } from '../../../types/Event';
import {
  CursorPosition,
  CursorSelection,
  File,
  ScrollPosition
} from '../../../types/Model';
import { isMimeType } from '../../../utils/File';

import ContentHeader from './ContentHeader';
import ContentImage from './ContentImage';
import ContentMarkdown from './ContentMarkdown';
import ContentVideo from './ContentVideo';

interface ContentSupportedProps {
  changed?: boolean,
  file?: File,
  onCancel?: EventHandler,
  onCursorPositionChange?: EventHandler<CursorPosition>,
  onCursorSelectionChange?: EventHandler<CursorSelection>,
  onEdit?: EventHandler,
  onSave?: EventHandler<boolean>,
  onScrollPositonChange?: EventHandler<ScrollPosition>,
  onTextChange?: EventHandler<string>
}

function ContentSupported(props: Readonly<ContentSupportedProps>) {

  const {
    file,
    onCancel,
    onCursorPositionChange,
    onCursorSelectionChange,
    onEdit,
    onSave,
    onScrollPositonChange,
    onTextChange
  } = props;

  return file ? (
    <div
      css={css`
        display: grid;
        grid-template-rows: auto 1fr;
        grid-template-columns: auto;
        grid-gap: 0.5rem;
        padding: 1rem;
      `}>
      <ContentHeader
        onCancel={onCancel}
        onEdit={onEdit}
        onSave={onSave} />
      <div
        css={css`
          display: grid;
          @media all and (width <= 960px) {
            height: ${layouts.contentBody.height.small};
          }
          @media not all and (width <= 960px) {
            height: ${layouts.contentBody.height.large};
          }
        `}>
        {
          (() => {
            if (isMimeType(file, { type: 'image' })) {
              return (
                <ContentImage />
              );
            }
            if (isMimeType(file, { type: 'video' })) {
              return (
                <ContentVideo />
              );
            }
            if (isMimeType(file, { subtype: 'markdown' })) {
              return (
                <ContentMarkdown
                  onCursorPositionChange={onCursorPositionChange}
                  onCursorSelectionChange={onCursorSelectionChange}
                  onSave={(e) => onSave?.(e, true)}
                  onScrollPositonChange={onScrollPositonChange}
                  onTextChange={onTextChange} />
              );
            }
            return null;
          })()
        }
      </div>
    </div>
  ) : null;

}

export default React.memo(ContentSupported);
