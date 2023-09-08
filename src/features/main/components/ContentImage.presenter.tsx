//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { css } from '@emotion/react';

import ImageViewer from '../../../common/components/ImageViewer';
import { File } from '../../../types/Model';

interface ContentImageProps {
  file?: File
}

function ContentImage(props: ContentImageProps) {

  const { file } = props;

  return file ? (
    <ImageViewer
      alt={file.fullName}
      src={file.downloadUrl}
      css={css`
        display: block;
        max-width: 100%;
        height: auto;
        max-height: calc(100vh - 7.5rem);
        margin: auto;
      `} />
  ) : null;

}

export default React.memo(ContentImage);
