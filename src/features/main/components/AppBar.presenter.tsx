//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { FormattedMessage, useIntl } from 'react-intl';

import {
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger
} from '@fluentui/react-components';
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
  DialogAction,
  DialogType,
  TabType
} from '../../../types/Model';
import messages from '../messages';

import AppBarButton from './AppBarButton';

interface AppBarProps {
  tabLoading?: boolean,
  tabType?: TabType,
  onOpenDialog?: EventHandler<DialogAction>,
  onToggleTab?: EventHandler<TabType>
}

function AppBar(props: Readonly<AppBarProps>) {

  const {
    tabLoading,
    tabType,
    onOpenDialog,
    onToggleTab
  } = props;

  const intl = useIntl();
  const { theme } = useTheme();

  return (
    <section
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 1rem 0;
        background-color: ${theme.colorNeutralBackground3};
      `} >
      <div
        css={css`
          display: flex;
          flex-direction: column;
          grid-gap: 0.5rem;
        `}>
        <AppBarButton
          disabled={tabLoading}
          selected={tabType === TabType.explorer}
          title={intl.formatMessage(messages.Explorer)}
          icon={(
            <TextDocumentIcon />
          )}
          onClick={(e) => onToggleTab?.(e, TabType.explorer)} />
        <AppBarButton
          disabled={tabLoading}
          selected={tabType === TabType.search}
          title={intl.formatMessage(messages.Search)}
          icon={(
            <SearchIcon />
          )}
          onClick={(e) => onToggleTab?.(e, TabType.search)} />
      </div>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          grid-gap: 0.5rem;
        `}>
        <Menu positioning="after">
          <MenuTrigger>
            <div
              role="button"
              tabIndex={-1}>
              <AppBarButton
                title={intl.formatMessage(messages.Settings)}
                icon={(
                  <SettingsIcon />
                )} />
            </div>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItem
                key="ChangeTheme"
                icon={(
                  <ColorIcon
                    css={css`
                      font-size: 1rem;
                      line-height: 1rem;
                    `} />
                )}
                onClick={(e) => onOpenDialog?.(e, {
                  type: DialogType.changeTheme,
                  data: undefined
                })}>
                <FormattedMessage {...messages.ChangeTheme} />
              </MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>
      </div>
    </section>
  );

}

export default React.memo(AppBar);
