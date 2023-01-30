//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { css } from '@emotion/react';

import { themeConfig } from '../../../providers/ThemeProvider';
import { TabMode, TabType } from '../../../types/Model';

import ExplorerControl from './ExplorerControl';
import SearchControl from './SearchControl';

interface AppTabControlProps {
  tabMode?: TabMode
}

function AppTabControl(props: AppTabControlProps) {

  const {
    tabMode
  } = props;

  return (
    <section
      css={css`
        display: grid;
        visibility: ${tabMode?.open ? undefined : 'hidden'};
        width: ${tabMode?.open ? '20rem' : '0'};
        max-width: calc(100vw - 4rem);
        padding: 1rem 0;
        background-color: ${themeConfig.colorNeutralBackground2};
      `}>
      {
        (() => {
          switch (tabMode?.type) {
            case TabType.explorer:
              return (
                <ExplorerControl />
              );
            case TabType.search:
              return (
                <SearchControl />
              );
            default:
              return null;
          }
        })()
      }
    </section>
  );

}

export default React.memo(AppTabControl);
