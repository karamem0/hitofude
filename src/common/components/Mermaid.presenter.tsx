//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

function Mermaid(props: Readonly<React.PropsWithChildren>, ref: React.Ref<HTMLPreElement>) {

  const {
    children
  } = props;

  return (
    <pre ref={ref}>
      {children}
    </pre>
  );

}

export default React.memo(React.forwardRef(Mermaid));
