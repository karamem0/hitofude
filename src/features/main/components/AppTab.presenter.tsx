//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { css } from '@emotion/react';

import { useTheme } from '../../../providers/ThemeProvider';
import { layouts } from '../../../themes/Layout';
import { TabType } from '../../../types/Model';
import ExplorerTabPanel from '../../explorer/components/ExplorerTabPanel';
import SearchTabPanel from '../../search/components/SearchTabPanel';
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
    <div
      role="tabpanel"
      css={css`
        z-index: 100;
        display: grid;
        width: ${tabOpen ? layouts.appTab.width : '0'};
        max-width: ${layouts.appTab.maxWidth};
        padding: 1rem 0;
        visibility: ${tabOpen ? undefined : 'hidden'};
        background-color: ${theme.colorNeutralBackground2};
      `}>
      {
        (() => {
          switch (tabType) {
            case TabType.explorer:
              return (
                <ExplorerTabPanel />
              );
            case TabType.search:
              return (
                <SearchTabPanel />
              );
            default:
              return null;
          }
        })()
      }
    </div>
  );

}

export default React.memo(AppTab);
