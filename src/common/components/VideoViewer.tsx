//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import Presenter from './VideoViewer.presenter';

interface VideoViewerProps {
  className?: string,
  src?: string
}

function VideoViewer(props: Readonly<VideoViewerProps>) {

  const {
    className,
    src
  } = props;

  const [ loading, setLoading ] = React.useState<boolean>(true);
  const ref = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const { current: element } = ref;
    if (element == null) {
      return;
    }
    setLoading(true);
    element.addEventListener('canplay', () => {
      setLoading(false);
    });
  }, [
    src
  ]);

  return (
    <Presenter
      ref={ref}
      className={className}
      loading={loading}
      src={src} />
  );

}

export default VideoViewer;
