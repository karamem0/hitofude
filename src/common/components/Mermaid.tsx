//
// Copyright (c) 2023-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import Presenter from './Mermaid.presenter';
import mermaid from 'mermaid';

function Mermaid(props: Readonly<React.PropsWithChildren>) {

  const {
    children
  } = props;

  const [ loading, setLoading ] = React.useState<boolean>(false);
  const ref = React.useRef<HTMLPreElement>(null);

  React.useEffect(() => {
    mermaid.initialize({
      fontFamily: 'SFMono-Regular, Consolas, Menlo, Monaco, Meiryo, monospace',
      startOnLoad: false
    });
  }, []);

  React.useEffect(() => {
    const { current: element } = ref;
    if (element == null) {
      return;
    }
    element.removeAttribute('data-processed');
    setLoading(true);
  }, [
    children
  ]);

  React.useEffect(() => {
    if (loading) {
      (async () => {
        const { current: element } = ref;
        if (element == null) {
          return;
        }
        await mermaid.run({
          nodes: [ element ],
          suppressErrors: true
        });
        setLoading(false);
      })();
    }
  }, [
    loading
  ]);

  return (
    <Presenter ref={ref}>
      {children}
    </Presenter>
  );

}

export default Mermaid;
