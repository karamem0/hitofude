//
// Copyright (c) 2023-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { css } from '@emotion/react';

interface VideoViewerProps {
  className?: string,
  loading?: boolean,
  src?: string
}

function VideoViewer(props: Readonly<VideoViewerProps>, ref: React.Ref<HTMLVideoElement>) {

  const {
    className,
    loading,
    src
  } = props;

  return (
    <video
      ref={ref}
      className={className}
      controls
      preload="metadata"
      src={src}
      css={css`
        display: ${loading ? 'none' : 'block'};
      `}>
      <track kind="captions" />
    </video>
  );

}

export default React.memo(React.forwardRef(VideoViewer));
