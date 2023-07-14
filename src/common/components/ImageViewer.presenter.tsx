//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { css } from '@emotion/react';
import { Image } from '@fluentui/react-components';

interface ImageViewerProps {
  alt?: string,
  className?: string,
  src?: string
}

function ImageViewer(props: ImageViewerProps) {

  const {
    alt,
    className,
    src
  } = props;

  return (
    <Image
      alt={alt}
      className={className}
      src={src}
      css={css`
        max-width: 100%;
        height: auto;
      `} />
  );

}

export default React.memo(ImageViewer);
