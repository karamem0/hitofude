//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { useIntl } from 'react-intl';

import { css } from '@emotion/react';
import { Button } from '@fluentui/react-components';
import {
  SearchIcon,
  TextDocumentIcon
} from '@fluentui/react-icons-mdl2';

import { themeConfig } from '../../../providers/ThemeProvider';
import { EventHandler } from '../../../types/Event';
import { TabMode, TabType } from '../../../types/Model';
import messages from '../messages';

interface AppBarProps {
  tabMode?: TabMode,
  onToggleTab?: EventHandler<TabType>
}

function AppBar(props: AppBarProps) {

  const {
    tabMode,
    onToggleTab
  } = props;

  const intl = useIntl();

  return (
    <section
      css={css`
        display: flex;
        flex-direction: column;
        grid-gap: 0.5rem;
        padding: 1rem 0.5rem;
        background-color: ${themeConfig.colorNeutralBackground3};
      `} >
      <Button
        appearance="transparent"
        aria-label={intl.formatMessage(messages.Explorer)}
        title={intl.formatMessage(messages.Explorer)}
        icon={
          tabMode?.type === TabType.explorer ? (
            <TextDocumentIcon
              css={css`
                font-size: 1rem;
                color: ${themeConfig.colorNeutralForeground1};
              `} />
          ) : (
            <TextDocumentIcon
              css={css`
                font-size: 1rem;
                color: ${themeConfig.colorNeutralForeground4};
              `} />
          )
        }
        onClick={(e) => onToggleTab?.(e, TabType.explorer)} />
      <Button
        appearance="transparent"
        aria-label={intl.formatMessage(messages.Search)}
        title={intl.formatMessage(messages.Search)}
        icon={
          tabMode?.type === TabType.search ? (
            <SearchIcon
              css={css`
                font-size: 1rem;
                color: ${themeConfig.colorNeutralForeground1};
              `} />
          ) : (
            <SearchIcon
              css={css`
                font-size: 1rem;
                color: ${themeConfig.colorNeutralForeground4};
              `} />
          )
        }
        onClick={(e) => onToggleTab?.(e, TabType.search)} />
    </section>
  );

}

export default React.memo(AppBar);
