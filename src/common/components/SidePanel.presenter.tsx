//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import {
  Button,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle
} from '@fluentui/react-components';
import { CancelIcon } from '@fluentui/react-icons-mdl2';
import { DrawerOverlay } from '@fluentui/react-components/unstable';
import { EventHandler } from '../../types/Event';
import { css } from '@emotion/react';

interface SidePanelProps {
  open?: boolean,
  title?: React.ReactNode,
  onOpenChange?: EventHandler<boolean>
}

function SidePanel(props: Readonly<React.PropsWithChildren<SidePanelProps>>) {

  const {
    children,
    open,
    title,
    onOpenChange
  } = props;

  return (
    <DrawerOverlay
      as="aside"
      open={open}
      position="end"
      size="medium"
      css={css`
        height: 100svh;
      `}
      onOpenChange={(event, data) => onOpenChange?.(event, data.open)}>
      <DrawerHeader>
        <DrawerHeaderTitle
          action={(
            <Button
              appearance="subtle"
              aria-label="Close"
              icon={(
                <CancelIcon
                  css={css`
                    font-size: 1rem;
                    line-height: 1rem;
                  `} />
              )}
              onClick={(event) => onOpenChange?.(event, false)} />
          )}>
          {title}
        </DrawerHeaderTitle>
      </DrawerHeader>
      <DrawerBody
        role="group"
        tabIndex={0}
        css={css`
          margin-bottom: 1rem;
        `}>
        {children}
      </DrawerBody>
    </DrawerOverlay>
  );

}

export default React.memo(SidePanel);
