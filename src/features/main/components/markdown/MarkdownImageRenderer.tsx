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
import { DependencyNullError } from '../../../../types/Error';
import { getParentUrl, isAbsoluteUrl } from '../../../../utils/Url';

import Presenter from './MarkdownImageRenderer.presenter';

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

  const {
    state: {
      contentProps,
      exploreProps
    }
  } = useStore();
  const { graph } = useService();

  const [ url, setUrl ] = React.useState<string>();

  React.useEffect(() => {
    (async () => {
      const contentFileUrl = contentProps?.file?.webUrl;
      if (contentFileUrl == null) {
        throw new DependencyNullError();
      }
      const rootFolderUrl = exploreProps?.rootFolder?.webUrl;
      if (rootFolderUrl == null) {
        throw new DependencyNullError();
      }
      if (src == null) {
        return;
      }
      if (isAbsoluteUrl(src)) {
        setUrl(src);
      } else {
        const absoluteUrl = new URL(src, `${getParentUrl(contentFileUrl)}/`).href;
        const relativeUrl = absoluteUrl.substring(absoluteUrl.indexOf(rootFolderUrl) + rootFolderUrl.length);
        const file = await graph.getFileByUrl(relativeUrl);
        setUrl(file.downloadUrl);
      }
    })();
  }, [
    graph,
    contentProps?.file,
    exploreProps?.rootFolder,
    src
  ]);

  return (
    <Presenter
      alt={alt}
      className={className}
      src={url} />
  );

}

export default MarkdownImageRenderer;
