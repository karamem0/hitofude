//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import Presenter from './MarkdownLinkRenderer.presenter';

interface MarkdownLinkRendererProps {
  href?: string,
  id?: string,
  node?: unknown
}

function MarkdownLinkRenderer(props: Readonly<React.PropsWithChildren<MarkdownLinkRendererProps>>) {

  const {
    children,
    href,
    id,
    node: _,
    ...extraProps
  } = props;

  const handleClick = React.useCallback(() => {
    if (href == null) {
      return;
    }
    const element = document.getElementById(href?.substring(1));
    element?.scrollIntoView({ behavior: 'smooth' });
  }, [
    href
  ]);

  return (
    <Presenter
      href={href}
      id={id}
      {...extraProps}
      onClick={handleClick}>
      {children}
    </Presenter>
  );

}

export default MarkdownLinkRenderer;
