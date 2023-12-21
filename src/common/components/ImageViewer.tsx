//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import Presenter from './ImageViewer.presenter';

interface ImageViewerProps {
  alt?: string,
  className?: string,
  src?: string
}

function ImageViewer(props: Readonly<ImageViewerProps>) {

  const {
    alt,
    className,
    src
  } = props;

  return (
    <Presenter
      alt={alt}
      className={className}
      src={src} />
  );

}

export default ImageViewer;
