//
// Copyright (c) 2023-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { css } from '@emotion/react';
import { Tooltip } from '@fluentui/react-components';
import { Warning16Regular } from '@fluentui/react-icons';
import { useIntl } from 'react-intl';
import { useTheme } from '../../../providers/ThemeProvider';
import { EventHandler } from '../../../types/Event';
import messages from '../messages';

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
    <Tooltip
      content={intl.formatMessage(messages.ConflictFile)}
      relationship="label">
      <div
        role="button"
        tabIndex={0}
        css={css`
          font-size: 1rem;
          line-height: 1rem;
          color: ${theme.colorPaletteYellowForeground1};
        `}
        onClick={onClick}
        onKeyDown={onKeyDown}>
        <Warning16Regular />
      </div>
    </Tooltip>
  );

}

export default React.memo(ExplorerFileConflictButton);
