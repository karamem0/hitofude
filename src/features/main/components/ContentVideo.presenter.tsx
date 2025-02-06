//
// Copyright (c) 2023-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { File } from '../../../types/Model';
import VideoViewer from '../../../common/components/VideoViewer';
import { css } from '@emotion/react';
import { layouts } from '../../../themes/Layout';

interface ContentVideoProps {
  file?: File
}

function ContentVideo(props: Readonly<ContentVideoProps>) {

  const { file } = props;

  return file ? (
    <VideoViewer
      src={file.downloadUrl}
      css={css`
        max-width: 100%;
        height: auto;
        padding: 1rem 0 0;
        margin: auto;
        @media all and (width <= 960px) {
          max-height: ${layouts.contentBody.height.small};
        }
        @media not all and (width <= 960px) {
          max-height: ${layouts.contentBody.height.large};
        }
      `} />
  ) : null;

}

export default React.memo(ContentVideo);
