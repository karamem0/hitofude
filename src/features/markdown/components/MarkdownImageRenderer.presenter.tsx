//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import ImageViewer from '../../../common/components/ImageViewer';
import VideoViewer from '../../../common/components/VideoViewer';
import { css } from '@emotion/react';
import { isMimeType } from '../../../utils/File';

interface MarkdownImageRendererProps {
  alt?: string,
  downloadUrl?: string,
  mimeType?: string
}

function MarkdownImageRenderer(props: Readonly<MarkdownImageRendererProps>) {

  const {
    alt,
    downloadUrl,
    mimeType
  } = props;

  return (
    () => {
      if (downloadUrl) {
        if (isMimeType(mimeType, 'image/*')) {
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
        if (isMimeType(mimeType, 'video/*')) {
          return (
            <VideoViewer
              src={downloadUrl}
              css={css`
                max-width: 100%;
                height: auto;
              `} />
          );
        }
      }
      return (
        <ImageViewer
          alt={alt}
          src="" />
      );
    })();

}

export default React.memo(MarkdownImageRenderer);
