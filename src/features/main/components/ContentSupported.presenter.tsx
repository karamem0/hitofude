//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { css } from '@emotion/react';

import { EventHandler } from '../../../types/Event';
import {
  Position,
  File,
  ContentMenuAction
} from '../../../types/Model';
import { isMimeType } from '../../../utils/File';

import ContentHeader from './ContentHeader';
import ContentImage from './ContentImage';
import ContentMarkdown from './ContentMarkdown';
import ContentVideo from './ContentVideo';

interface ContentSupportedProps {
  changed?: boolean,
  editing?: boolean,
  file?: File,
  onCancel?: EventHandler,
  onChangePosition?: EventHandler<Position>,
  onChangePreview?: EventHandler<boolean>,
  onChangeText?: EventHandler<string>,
  onContextMenu?: EventHandler<ContentMenuAction>,
  onEdit?: EventHandler,
  onSave?: EventHandler<boolean>
}

function ContentSupported(props: ContentSupportedProps) {

  const {
    changed,
    file,
    onCancel,
    onChangePosition,
    onChangePreview,
    onChangeText,
    onContextMenu,
    onEdit,
    onSave
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
        changed={changed}
        onCancel={onCancel}
        onContextMenu={onContextMenu}
        onEdit={onEdit}
        onSave={onSave} />
      <div
        css={css`
          display: grid;
          height: calc(100vh - 7.5rem);
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
                  onChangePosition={onChangePosition}
                  onChangePreview={onChangePreview}
                  onChangeText={onChangeText}
                  onSave={(e) => onSave?.(e, true)} />
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
