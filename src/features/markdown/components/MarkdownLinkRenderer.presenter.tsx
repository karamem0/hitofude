//
// Copyright (c) 2023-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { EventHandler } from '../../../types/Event';
import { Link } from '@fluentui/react-components';

interface MarkdownLinkRendererProps {
  href?: string,
  id?: string,
  onClick?: EventHandler
}

function MarkdownLinkRenderer(props: Readonly<React.PropsWithChildren<MarkdownLinkRendererProps>>) {

  const {
    children,
    id,
    href,
    onClick,
    ...extraProps
  } = props;

  return href?.startsWith('#') ? (
    <Link
      as="button"
      id={id}
      {...extraProps}
      onClick={onClick}>
      {children}
    </Link>
  ) : (
    <Link
      href={href}
      id={id}
      rel="noreferrer"
      target="_blank"
      {...extraProps}>
      {children}
    </Link>
  );

}

export default MarkdownLinkRenderer;
