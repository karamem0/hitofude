//
// Copyright (c) 2023-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { css } from '@emotion/react';
import { Button, Text, Tooltip } from '@fluentui/react-components';
import { EventHandler } from '../../types/Event';

interface TreeItemButtonProps {
  icon?: React.ReactElement,
  name?: string,
  title?: string | React.ReactElement,
  onClick?: EventHandler
}

function TreeItemButton(props: Readonly<TreeItemButtonProps>) {

  const {
    icon,
    name,
    title,
    onClick
  } = props;

  return (
    <Tooltip
      content={title ?? name ?? ''}
      relationship="label">
      <Button
        appearance="transparent"
        tabIndex={-1}
        css={css`
          display: flex;
          align-items: center;
          justify-content: start;
          padding: 0;
          border: 0;
        `}
        onClick={onClick}>
        <div
          css={css`
            display: grid;
            grid-template-rows: auto;
            grid-template-columns: auto 1fr;
            grid-gap: 0.25rem;
            align-items: center;
            justify-content: start;
          `}>
          <div
            css={css`
              display: flex;
              align-items: center;
              justify-content: center;
              width: 2rem;
              height: 2rem;
            `}>
            {icon}
          </div>
          <Text
            css={css`
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            `}>
            {name}
          </Text>
        </div>
      </Button>
    </Tooltip>
  );

}

export default React.memo(TreeItemButton);
