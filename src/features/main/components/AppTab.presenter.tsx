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
import { TabType } from '../../../types/Model';

import ExplorerTabItem from './ExplorerTabItem';
import SearchTabItem from './SearchTabItem';

interface AppTabProps {
  tabOpen?: boolean,
  tabType?: TabType
}

function AppTab(props: Readonly<AppTabProps>) {

  const {
    tabOpen,
    tabType
  } = props;

  const { theme } = useTheme();

  return (
    <section
      css={css`
        display: grid;
        width: ${tabOpen ? '20rem' : '0'};
        max-width: calc(100vw - 4rem);
        padding: 1rem 0;
        visibility: ${tabOpen ? undefined : 'hidden'};
        background-color: ${theme.colorNeutralBackground2};
      `}>
      {
        (() => {
          switch (tabType) {
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
