//
// Copyright (c) 2023-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import Presenter from './MarkdownCodeRenderer.presenter';

interface MarkdownCodeRendererState {
  language?: string,
  text?: string
}

interface MarkdownCodeRendererProps {
  node?: unknown
}

function MarkdownCodeRenderer(props: Readonly<React.PropsWithChildren<MarkdownCodeRendererProps>>) {

  const {
    children,
    node: _,
    ...extraProps
  } = props;

  const [ state, setState ] = React.useState<MarkdownCodeRendererState>({});

  React.useEffect(() => {
    if (children == null) {
      return;
    }
    const element = children as React.ReactElement;
    const props = element.props as Record<string, unknown>;
    const className = props.className as string;
    const match = /language-(\w+)/.exec(className ?? '');
    const language = match?.at(1) ?? '';
    const text = props.children as string;
    setState({
      language,
      text
    });
  }, [
    children
  ]);

  return (
    <Presenter
      {...state}
      {...extraProps} />
  );

}

export default MarkdownCodeRenderer;
