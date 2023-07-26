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
import { Position } from '../../../types/Model';

import MarkdownEditor from './markdown/MarkdownEditor';
import MarkdownViewer from './markdown/MarkdownViewer';

interface MarkdownControlProps {
  editing?: boolean,
  minimap?: boolean,
  position?: Position,
  text?: string,
  onChangeText?: EventHandler<string>,
  onChangePosition?: EventHandler<Position>,
  onSave?: EventHandler
}

function MarkdownControl(props: MarkdownControlProps) {

  const {
    editing,
    minimap,
    position,
    text,
    onChangeText,
    onChangePosition,
    onSave
  } = props;

  return editing ? (
    <MarkdownEditor
      minimap={minimap}
      position={position}
      text={text}
      onChangePosition={onChangePosition}
      onChangeText={onChangeText}
      onSave={onSave} />
  ) : (
    <ScrollPanel>
      {
        (state) => (
          <MarkdownViewer
            css={css`
              padding: 0 ${state?.scrollBarXVisible ? '1rem' : '0'} 0 0;
            `} />
        )
      }
    </ScrollPanel>
  );

}

export default React.memo(MarkdownControl);
