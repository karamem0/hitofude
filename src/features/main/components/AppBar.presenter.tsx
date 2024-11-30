//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { AppBarMenuAction, TabType } from '../../../types/Model';
import {
  Color16Regular,
  Document24Regular,
  Search24Regular,
  Settings24Regular
} from '@fluentui/react-icons';
import { FormattedMessage, useIntl } from 'react-intl';
import { MenuItem, MenuList } from '@fluentui/react-components';
import AppBarButton from './AppBarButton';
import AppBarMenuButton from './AppBarMenuButton';
import { EventHandler } from '../../../types/Event';
import { css } from '@emotion/react';
import messages from '../messages';
import { useTheme } from '../../../providers/ThemeProvider';

interface AppBarProps {
  onKeyDown?: EventHandler,
  onMenuClick?: EventHandler<AppBarMenuAction>,
  onToggleTab?: EventHandler<TabType>
}

function AppBar(props: Readonly<AppBarProps>, ref: React.Ref<HTMLDivElement>) {

  const {
    onKeyDown,
    onMenuClick,
    onToggleTab
  } = props;

  const intl = useIntl();
  const { theme } = useTheme();

  return (
    <div
      ref={ref}
      role="tablist"
      tabIndex={-1}
      css={css`
        z-index: 100;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 1rem 0;
        background-color: ${theme.colorNeutralBackground3};
      `}
      onKeyDown={onKeyDown}>
      <div
        role="group"
        css={css`
          display: flex;
          flex-direction: column;
          grid-gap: 0.5rem;
        `}>
        <AppBarButton
          title={intl.formatMessage(messages.Explorer)}
          type={TabType.explorer}
          icon={(
            <Document24Regular />
          )}
          onClick={(event) => onToggleTab?.(event, TabType.explorer)} />
        <AppBarButton
          title={intl.formatMessage(messages.Search)}
          type={TabType.search}
          icon={(
            <Search24Regular />
          )}
          onClick={(event) => onToggleTab?.(event, TabType.search)} />
      </div>
      <div
        role="group"
        css={css`
          display: flex;
          flex-direction: column;
          grid-gap: 0.5rem;
        `}>
        <AppBarMenuButton
          title={intl.formatMessage(messages.Settings)}
          icon={(
            <Settings24Regular />
          )}
          menu={(
            <MenuList>
              <MenuItem
                key="changeTheme"
                icon={(
                  <Color16Regular />
                )}
                onClick={(event) => onMenuClick?.(event, {
                  type: 'changeTheme',
                  data: undefined
                })}>
                <FormattedMessage {...messages.ChangeTheme} />
              </MenuItem>
            </MenuList>
          )}
          menuProps={{
            positioning: 'after'
          }} />
      </div>
    </div>
  );

}

export default React.memo(React.forwardRef(AppBar));
