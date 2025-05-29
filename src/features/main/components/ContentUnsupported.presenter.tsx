//
// Copyright (c) 2023-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import ContentHeader from './ContentHeader';
import { css } from '@emotion/react';
import { layouts } from '../../../themes/Layout';

interface ContentUnsupportedProps {
  src?: string
}

function ContentUnsupported(props: Readonly<ContentUnsupportedProps>) {

  const { src } = props;

  return src ? (
    <div
      css={css`
        display: grid;
        grid-template-rows: auto 1fr;
        grid-template-columns: auto;
        grid-gap: 0.5rem;
        padding: 1rem;
      `}>
      <ContentHeader />
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
        <iframe
          src={src}
          css={css`
            width: 100%;
            height: 100%;
            border: none;
          `} />
      </div>
    </div>
  ) : null;

}

export default React.memo(ContentUnsupported);
