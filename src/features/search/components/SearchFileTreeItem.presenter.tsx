//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import {
  Document16Regular,
  FolderOpen16Regular,
  Link16Regular
} from '@fluentui/react-icons';
import { File, SearchMenuAction } from '../../../types/Model';
import {
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList
} from '@fluentui/react-components';
import { EventHandler } from '../../../types/Event';
import { FormattedMessage } from 'react-intl';
import TreeItem from '../../../common/components/TreeItem';
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
                type: 'copyLink',
                data: item
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
                type: 'openFileLocation',
                data: item
              })}>
              <FormattedMessage {...messages.OpenFileLocation} />
            </MenuItem>
          </MenuGroup>
        </MenuList>
      )}
      onClick={(event) => onClick?.(event, item)} />
  ));

}

export default React.memo(SearchFileTreeItem);
