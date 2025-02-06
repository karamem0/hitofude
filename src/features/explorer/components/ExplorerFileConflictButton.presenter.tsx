//
// Copyright (c) 2023-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { EventHandler } from '../../../types/Event';
import { Warning16Regular } from '@fluentui/react-icons';
import { css } from '@emotion/react';
import messages from '../messages';
import { useIntl } from 'react-intl';
import { useTheme } from '../../../providers/ThemeProvider';

interface ExplorerFileConflictButtonProps {
  disabled: boolean,
  onClick?: EventHandler,
  onKeyDown?: EventHandler
}

function ExplorerFileConflictButton(props: Readonly<ExplorerFileConflictButtonProps>) {

  const {
    disabled,
    onClick,
    onKeyDown
  } = props;

  const intl = useIntl();
  const { theme } = useTheme();

  return disabled ? null : (
    <div
      aria-label={intl.formatMessage(messages.ConflictFile)}
      role="button"
      tabIndex={0}
      title={intl.formatMessage(messages.ConflictFile)}
      css={css`
        font-size: 1rem;
        line-height: 1rem;
        color: ${theme.colorPaletteYellowForeground1};
      `}
      onClick={onClick}
      onKeyDown={onKeyDown}>
      <Warning16Regular />
    </div>
  );

}

export default React.memo(ExplorerFileConflictButton);
