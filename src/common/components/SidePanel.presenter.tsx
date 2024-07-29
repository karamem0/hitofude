//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { Button, Text } from '@fluentui/react-components';
import { CancelIcon } from '@fluentui/react-icons-mdl2';

import { css } from '@emotion/react';

import { useTheme } from '../../providers/ThemeProvider';
import { layouts } from '../../themes/Layout';
import { EventHandler } from '../../types/Event';

interface SidePanelProps {
  className?: string,
  content?: React.ReactNode,
  open?: boolean,
  title?: React.ReactNode,
  onOpenChange?: EventHandler<boolean>
}

function SidePanel(props: Readonly<React.PropsWithChildren<SidePanelProps>>) {

  const {
    children,
    className,
    content,
    open,
    title,
    onOpenChange
  } = props;

  const { theme } = useTheme();

  return (
    <React.Fragment>
      <div
        role="button"
        tabIndex={-1}
        onClick={(event) => onOpenChange?.(event, true)}>
        {children}
      </div>
      {
        open ? (
          <div
            css={css`
              position: fixed;
              inset: 0;
              z-index: 1000;
              display: grid;
              grid-template-rows: auto;
              grid-template-columns: 1fr auto;
              background-color: ${theme.colorNeutralBackgroundAlpha};
            `}>
            <div
              role="button"
              tabIndex={-1}
              css={css`
                cursor: pointer;
              `}
              onClick={(event) => onOpenChange?.(event, false)} />
            <div
              className={className}
              css={css`
                width: ${layouts.sidePanel.width};
                max-width: ${layouts.sidePanel.maxWidth};
                background-color: ${theme.colorNeutralBackground1};
                box-shadow: rgb(0 0 0 / 35%) 0 0 2rem 0;
              `}>
              <div
                css={css`
                  display: grid;
                  grid-template-rows: auto;
                  grid-template-columns: 1fr auto;
                  grid-gap: 0.5rem;
                  align-items: center;
                  height: ${layouts.sidePanelHeader.height};
                  margin: 1rem;
                `}>
                <Text
                  css={css`
                    font-weight: bold;
                  `}>
                  {title}
                </Text>
                <Button
                  appearance="transparent"
                  icon={(
                    <CancelIcon
                      css={css`
                        font-size: 1rem;
                        line-height: 1rem;
                      `}
                      onClick={(event) => onOpenChange?.(event, false)} />
                  )} />
              </div>
              <div
                css={css`
                  height: ${layouts.sidePanelBody.height};
                  margin: 1rem;
                `}>
                {content}
              </div>
            </div>
          </div>
        ) : null
      }
    </React.Fragment>
  );

}

export default React.memo(SidePanel);
