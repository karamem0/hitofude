//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { css } from '@emotion/react';

import VideoViewer from '../../../common/components/VideoViewer';
import { File } from '../../../types/Model';

interface ContentVideoProps {
  file?: File
}

function ContentVideo(props: ContentVideoProps) {

  const { file } = props;

  return file ? (
    <VideoViewer
      src={file.downloadUrl}
      css={css`
        max-width: 100%;
        height: auto;
        max-height: calc(100vh - 7.5rem);
        margin: auto;
      `} />
  ) : null;

}

export default React.memo(ContentVideo);
