//
// Copyright (c) 2023-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { css } from '@emotion/react';
import { Caption1 } from '@fluentui/react-components';
import { DocumentOnePage16Regular } from '@fluentui/react-icons';
import bytes from 'bytes';
import { useIntl } from 'react-intl';
import TreeItem from '../../../common/components/TreeItem';
import { EventHandler } from '../../../types/Event';
import { File, Folder } from '../../../types/Model';
import { isMarkdown } from '../../../utils/File';
import messages from '../messages';
import ExplorerFileConflictButton from './ExplorerFileConflictButton';
import ExplorerFileMenuList from './ExplorerFileMenuList';

interface ExplorerFileTreeItemProps {
  allFiles?: boolean,
  selectedFile?: File,
  selectedFolder?: Folder,
  onClick?: EventHandler<File>
}

function ExplorerFileTreeItem(props: Readonly<ExplorerFileTreeItemProps>) {

  const {
    allFiles,
    selectedFile,
    selectedFolder,
    onClick
  } = props;

  const intl = useIntl();

  return selectedFolder?.files?.filter((file) => (allFiles ?? false) || isMarkdown(file)).map((file) => (
    <TreeItem
      key={file.id}
      name={file.fullName}
      selected={selectedFile?.id === file.id}
      icon={(
        <DocumentOnePage16Regular />
      )}
      info={(
        <ExplorerFileConflictButton file={file} />
      )}
      menu={(
        <ExplorerFileMenuList file={file} />
      )}
      title={(
        <div
          css={css`
            display: flex;
            flex-direction: column;
          `}>
          <Caption1
            css={css`
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            `}>
            {intl.formatMessage(messages.Name)}: {file.fullName}
          </Caption1>
          <Caption1>
            {intl.formatMessage(messages.LastModified)}: {intl.formatDate(file.updatedDate, {
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              month: '2-digit',
              year: 'numeric'
            })}
          </Caption1>
          <Caption1>
            {intl.formatMessage(messages.Size)}: {bytes(file?.size ?? 0, { unitSeparator: ' ' })}
          </Caption1>
        </div>
      )}
      onClick={(event) => onClick?.(event, file)} />
  ));

};

export default React.memo(ExplorerFileTreeItem);
