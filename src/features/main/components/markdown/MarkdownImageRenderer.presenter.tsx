//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import ImageViewer from '../../../../common/components/ImageViewer';

interface MarkdownImageRendererProps {
  alt?: string,
  className?: string,
  src?: string
}

function MarkdownImageRenderer(props: MarkdownImageRendererProps) {

  const {
    alt,
    className,
    src
  } = props;

  return (
    <ImageViewer
      alt={alt}
      className={className}
      src={src} />
  );

}

export default React.memo(MarkdownImageRenderer);
