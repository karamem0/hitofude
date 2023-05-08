//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { useService } from '../../../providers/ServiceProvider';
import { useStore } from '../../../providers/StoreProvider';
import { EventHandler } from '../../../types/Event';
import { File } from '../../../types/Model';

import Presenter from './MarkdownControl.presenter';

interface MarkdownControlProps {
  value: File,
  onChange?: EventHandler<string>
}

function MarkdownControl(props: MarkdownControlProps) {

  const {
    value,
    onChange
  } = props;

  const {
    state: {
      editing
    }
  } = useStore();

  const { graph } = useService();

  const [ content, setContent ] = React.useState<string>('');

  React.useEffect(() => {
    (async () => {
      const fileContent = await graph.getFileContent(value);
      setContent(fileContent);
      onChange?.({}, fileContent);
    })();
  }, [
    graph,
    onChange,
    value
  ]);

  return (
    <Presenter
      content={content}
      editing={editing}
      onChange={onChange} />
  );

}

export default MarkdownControl;
