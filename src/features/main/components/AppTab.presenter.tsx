//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { css } from '@emotion/react';

import { useTheme } from '../../../providers/ThemeProvider';
import { TabMode, TabType } from '../../../types/Model';

import ExplorerTabItem from './ExplorerTabItem';
import SearchTabItem from './SearchTabItem';

interface AppTabProps {
  tabMode?: TabMode
}

function AppTab(props: AppTabProps) {

  const {
    tabMode
  } = props;

  const { theme } = useTheme();

  return (
    <section
      css={css`
        display: grid;
        width: ${tabMode?.open ? '20rem' : '0'};
        max-width: calc(100vw - 4rem);
        padding: 1rem 0;
        visibility: ${tabMode?.open ? undefined : 'hidden'};
        background-color: ${theme.colorNeutralBackground2};
      `}>
      {
        (() => {
          switch (tabMode?.type) {
            case TabType.explorer:
              return (
                <ExplorerTabItem />
              );
            case TabType.search:
              return (
                <SearchTabItem />
              );
            default:
              return null;
          }
        })()
      }
    </section>
  );

}

export default React.memo(AppTab);
