//
// Copyright (c) 2023-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { css } from '@emotion/react';
import { layouts } from '../../../themes/Layout';
import { EventHandler } from '../../../types/Event';
import { File } from '../../../types/Model';
import ContentHeader from './ContentHeader';
import ContentMarkdown from './ContentMarkdown';

interface ContentSupportedProps {
  changed?: boolean,
  file?: File,
  onCancel?: EventHandler,
  onEdit?: EventHandler,
  onSave?: EventHandler<boolean>
}

function ContentSupported(props: Readonly<ContentSupportedProps>) {

  const {
    file,
    onCancel,
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
        <ContentMarkdown onSave={(event) => onSave?.(event, true)} />
      </div>
    </div>
  ) : null;

}

export default React.memo(ContentSupported);
