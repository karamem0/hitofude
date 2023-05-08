//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { css } from '@emotion/react';

import ScrollPanel from '../../../common/components/ScrollPanel';
import { EventHandler } from '../../../types/Event';

import MarkdownEditor from './markdown/MarkdownEditor';
import MarkdownViewer from './markdown/MarkdownViewer';

interface MarkdownControlProps {
  content?: string,
  editing?: boolean,
  onChange?: EventHandler<string>
}

function MarkdownControl(props: MarkdownControlProps) {

  const {
    content,
    editing,
    onChange
  } = props;

  return editing ? (
    <MarkdownEditor
      value={content}
      onChange={onChange} />
  ) : (
    <ScrollPanel>
      {
        (state) => {
          return (
            <MarkdownViewer
              value={content}
              css={css`
              padding: 0 ${state?.scrollBarXVisible ? '1rem' : '0'} 0 0;
            `} />
          );
        }
      }
    </ScrollPanel>
  );

}

export default React.memo(MarkdownControl);
