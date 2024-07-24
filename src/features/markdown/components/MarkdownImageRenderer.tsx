//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import mime from 'mime';

import { useService } from '../../../providers/ServiceProvider';
import { useStore } from '../../../providers/StoreProvider';
import { DependencyNullError, FileNotFoundError } from '../../../types/Error';
import { getMimeType } from '../../../utils/File';
import { isAbsoluteUrl } from '../../../utils/Url';

import Presenter from './MarkdownImageRenderer.presenter';

interface MarkdownImageRendereState {
  downloadUrl?: string,
  mimeType?: string
}

interface MarkdownImageRendererProps {
  alt?: string,
  src?: string
}

function MarkdownImageRenderer(props: Readonly<MarkdownImageRendererProps>) {

  const {
    alt,
    src
  } = props;

  const {
    state: {
      contentProps,
      explorerProps
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
      const rootFolderUrl = explorerProps?.rootFolder?.webUrl;
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
        try {
          const absoluteUrl = new URL(src, contentFileUrl).href;
          const relativeUrl = absoluteUrl.substring(absoluteUrl.indexOf(rootFolderUrl) + rootFolderUrl.length);
          const file = await graph.getFileByUrl(relativeUrl);
          setState({
            downloadUrl: file.downloadUrl,
            mimeType: file.mimeType
          });
        } catch (e) {
          if (e instanceof FileNotFoundError) {
            setState(undefined);
          } else {
            throw e;
          }
        }
      }
    })();
  }, [
    graph,
    contentProps?.file,
    explorerProps?.rootFolder,
    src
  ]);

  return state ? (
    <Presenter
      alt={alt}
      downloadUrl={state.downloadUrl}
      mimeType={state.mimeType} />
  ) : null;

}

export default MarkdownImageRenderer;
