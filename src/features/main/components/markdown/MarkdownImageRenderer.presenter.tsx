//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { css } from '@emotion/react';

import ImageViewer from '../../../../common/components/ImageViewer';
import VideoViewer from '../../../../common/components/VideoViewer';
import { MimeType } from '../../../../types/Model';
import { isMimeType } from '../../../../utils/File';

interface MarkdownImageRendererProps {
  alt?: string,
  downloadUrl?: string,
  mimeType?: MimeType
}

function MarkdownImageRenderer(props: MarkdownImageRendererProps) {

  const {
    alt,
    downloadUrl,
    mimeType
  } = props;

  return downloadUrl ? (
    (() => {
      if (isMimeType(mimeType, { type: 'image' })) {
        return (
          <ImageViewer
            alt={alt}
            src={downloadUrl}
            css={css`
              max-width: 100%;
              height: auto;
            `} />
        );
      }
      if (isMimeType(mimeType, { type: 'video' })) {
        return (
          <VideoViewer
            src={downloadUrl}
            css={css`
              max-width: 100%;
              height: auto;
            `} />
        );
      }
    })()
  ) : null;

}

export default React.memo(MarkdownImageRenderer);
