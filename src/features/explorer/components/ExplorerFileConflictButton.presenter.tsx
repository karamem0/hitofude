//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { EventHandler } from '../../../types/Event';
import { FileConflict } from '../../../types/Model';
import { WarningIcon } from '@fluentui/react-icons-mdl2';
import { css } from '@emotion/react';
import messages from '../messages';
import { useIntl } from 'react-intl';
import { useTheme } from '../../../providers/ThemeProvider';

interface ExplorerFileConflictButtonProps {
  fileConflict?: FileConflict,
  onClick?: EventHandler<FileConflict>
}

function ExplorerFileConflictButton(props: Readonly<ExplorerFileConflictButtonProps>) {

  const {
    fileConflict,
    onClick
  } = props;

  const intl = useIntl();
  const { theme: { theme } } = useTheme();

  return fileConflict ? (
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
      onClick={(event) => onClick?.(event, fileConflict)}>
      <WarningIcon />
    </div>
  ) : null;

}

export default React.memo(ExplorerFileConflictButton);
