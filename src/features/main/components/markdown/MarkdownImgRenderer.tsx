//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { useService } from '../../../../providers/ServiceProvider';
import { useStore } from '../../../../providers/StoreProvider';
import { getParentUrl, isAbsoluteUrl } from '../../../../utils/Url';

import Presenter from './MarkdownImgRenderer.presenter';

interface MarkdownImgRendererProps {
  alt?: string,
  className?: string,
  src?: string
}

function MarkdownImgRenderer(props: MarkdownImgRendererProps) {

  const {
    alt,
    className,
    src
  } = props;

  const {
    state: {
      rootFolder,
      workFile
    }
  } = useStore();
  const { graph } = useService();

  const [ url, setUrl ] = React.useState<string>();

  React.useEffect(() => {
    (async () => {
      if (!rootFolder?.webUrl) {
        return;
      }
      if (!workFile?.webUrl) {
        return;
      }
      if (!src) {
        return;
      }
      if (isAbsoluteUrl(src)) {
        setUrl(src);
      } else {
        const absoluteUrl = new URL(src, `${getParentUrl(workFile.webUrl)}/`).href;
        const relativeUrl = absoluteUrl.substring(absoluteUrl.indexOf(rootFolder.webUrl) + rootFolder.webUrl.length);
        const file = await graph.getFileByUrl(relativeUrl);
        setUrl(file.downloadUrl);
      }
    })();
  }, [
    graph,
    rootFolder,
    src,
    workFile
  ]);

  return (
    <Presenter
      alt={alt}
      className={className}
      src={url} />
  );

}

export default MarkdownImgRenderer;
