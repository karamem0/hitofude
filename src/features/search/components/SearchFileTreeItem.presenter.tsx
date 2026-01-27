//
// Copyright (c) 2023-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { css } from '@emotion/react';
import {
  Caption1,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList
} from '@fluentui/react-components';
import {
  Document16Regular,
  FolderOpen16Regular,
  Link16Regular
} from '@fluentui/react-icons';
import bytes from 'bytes';
import { FormattedMessage, useIntl } from 'react-intl';
import TreeItem from '../../../common/components/TreeItem';
import { EventHandler } from '../../../types/Event';
import { File, SearchMenuAction } from '../../../types/Model';
import messages from '../messages';

interface SearchFileTreeItemProps {
  resultFiles?: File[],
  selectedFile?: File,
  onClick?: EventHandler<File>,
  onMenuClick?: EventHandler<SearchMenuAction>
}

function SearchFileTreeItem(props: Readonly<SearchFileTreeItemProps>) {

  const {
    resultFiles,
    selectedFile,
    onClick,
    onMenuClick
  } = props;

  const intl = useIntl();

  return resultFiles?.map((item) => (
    <TreeItem
      key={item.id}
      name={item.fullName}
      selected={selectedFile?.id === item.id}
      icon={(
        <Document16Regular />
      )}
      menu={(
        <MenuList>
          <MenuGroup>
            <MenuItem
              key="copyLink"
              icon={(
                <Link16Regular />
              )}
              onClick={(event) => onMenuClick?.(event, {
                data: item,
                type: 'copyLink'
              })}>
              <FormattedMessage {...messages.CopyLink} />
            </MenuItem>
          </MenuGroup>
          <MenuDivider />
          <MenuGroup>
            <MenuItem
              key="openFileLocation"
              icon={(
                <FolderOpen16Regular />
              )}
              onClick={(event) => onMenuClick?.(event, {
                data: item,
                type: 'openFileLocation'
              })}>
              <FormattedMessage {...messages.OpenFileLocation} />
            </MenuItem>
          </MenuGroup>
        </MenuList>
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
            {intl.formatMessage(messages.Name)}: {item.fullName}
          </Caption1>
          <Caption1>
            {intl.formatMessage(messages.LastModified)}: {intl.formatDate(item.updatedDate, {
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              month: '2-digit',
              year: 'numeric'
            })}
          </Caption1>
          <Caption1>
            {intl.formatMessage(messages.Size)}: {bytes(item?.size ?? 0, { unitSeparator: ' ' })}
          </Caption1>
        </div>
      )}
      onClick={(event) => onClick?.(event, item)} />
  ));

}

export default React.memo(SearchFileTreeItem);
