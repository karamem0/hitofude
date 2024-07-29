//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { FormattedMessage, useIntl } from 'react-intl';

import { MenuItem, MenuList } from '@fluentui/react-components';
import {
  ColorIcon,
  SearchIcon,
  SettingsIcon,
  TextDocumentIcon
} from '@fluentui/react-icons-mdl2';

import { css } from '@emotion/react';

import { useTheme } from '../../../providers/ThemeProvider';
import { EventHandler } from '../../../types/Event';
import {
  AppBarMenuAction,
  AppBarMenuType,
  TabType
} from '../../../types/Model';
import messages from '../messages';

import AppBarButton from './AppBarButton';
import AppBarMenuButton from './AppBarMenuButton';

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
            <TextDocumentIcon
              css={css`
                font-size: 1.5rem;
                line-height: 1.5rem;
              `} />
          )}
          onClick={(event) => onToggleTab?.(event, TabType.explorer)} />
        <AppBarButton
          title={intl.formatMessage(messages.Search)}
          type={TabType.search}
          icon={(
            <SearchIcon
              css={css`
                font-size: 1.5rem;
                line-height: 1.5rem;
              `} />
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
            <SettingsIcon
              css={css`
                font-size: 1.5rem;
                line-height: 1.5rem;
              `} />
          )}
          menu={(
            <MenuList>
              <MenuItem
                key={AppBarMenuType.changeTheme}
                icon={(
                  <ColorIcon
                    css={css`
                      font-size: 1rem;
                      line-height: 1rem;
                    `} />
                )}
                onClick={(event) => onMenuClick?.(event, {
                  type: AppBarMenuType.changeTheme,
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
