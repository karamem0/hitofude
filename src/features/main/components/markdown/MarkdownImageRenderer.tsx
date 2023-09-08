//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import mime from 'mime';

import { useService } from '../../../../providers/ServiceProvider';
import { useStore } from '../../../../providers/StoreProvider';
import { DependencyNullError } from '../../../../types/Error';
import { MimeType } from '../../../../types/Model';
import { getMimeType } from '../../../../utils/File';
import { isAbsoluteUrl } from '../../../../utils/Url';

import Presenter from './MarkdownImageRenderer.presenter';

interface MarkdownImageRendereState {
  downloadUrl?: string,
  mimeType?: MimeType
}

interface MarkdownImageRendererProps {
  alt?: string,
  src?: string
}

function MarkdownImageRenderer(props: MarkdownImageRendererProps) {

  const {
    alt,
    src
  } = props;

  const {
    state: {
      contentProps,
      exploreProps
    }
  } = useStore();
  const { graph } = useService();

  const [ state, setState ] = React.useState<MarkdownImageRendereState>();

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
        setState({
          downloadUrl: src,
          mimeType: getMimeType(src, mime.getType(src))
        });
      } else {
        const absoluteUrl = new URL(src, contentFileUrl).href;
        const relativeUrl = absoluteUrl.substring(absoluteUrl.indexOf(rootFolderUrl) + rootFolderUrl.length);
        const file = await graph.getFileByUrl(relativeUrl);
        setState({
          downloadUrl: file.downloadUrl,
          mimeType: file.mimeType
        });
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
      downloadUrl={state?.downloadUrl}
      mimeType={state?.mimeType} />
  );

}

export default MarkdownImageRenderer;
