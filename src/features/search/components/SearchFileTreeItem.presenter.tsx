//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import {
  File,
  SearchMenuAction,
  SearchMenuType
} from '../../../types/Model';
import {
  LinkIcon,
  OpenFolderHorizontalIcon,
  TextDocumentIcon
} from '@fluentui/react-icons-mdl2';
import {
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList
} from '@fluentui/react-components';
import { EventHandler } from '../../../types/Event';
import { FormattedMessage } from 'react-intl';
import TreeItem from '../../../common/components/TreeItem';
import { css } from '@emotion/react';
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

  return (
    <React.Fragment>
      {
        resultFiles?.map((item) => (
          <TreeItem
            key={item.id}
            name={item.fullName}
            selected={selectedFile?.id === item.id}
            icon={(
              <TextDocumentIcon
                css={css`
                  font-size: 1rem;
                  line-height: 1rem;
                `} />
            )}
            menu={(
              <MenuList>
                <MenuGroup>
                  <MenuItem
                    key={SearchMenuType.copyLink}
                    icon={(
                      <LinkIcon
                        css={css`
                          font-size: 1rem;
                          line-height: 1rem;
                        `} />
                    )}
                    onClick={(event) => onMenuClick?.(event, {
                      type: SearchMenuType.copyLink,
                      data: item
                    })}>
                    <FormattedMessage {...messages.CopyLink} />
                  </MenuItem>
                </MenuGroup>
                <MenuDivider />
                <MenuGroup>
                  <MenuItem
                    key={SearchMenuType.openFileLocation}
                    icon={(
                      <OpenFolderHorizontalIcon
                        css={css`
                        font-size: 1rem;
                        line-height: 1rem;
                      `} />
                    )}
                    onClick={(event) => onMenuClick?.(event, {
                      type: SearchMenuType.openFileLocation,
                      data: item
                    })}>
                    <FormattedMessage {...messages.OpenFileLocation} />
                  </MenuItem>
                </MenuGroup>
              </MenuList>
            )}
            onClick={(event) => onClick?.(event, item)} />
        ))
      }
    </React.Fragment>
  );

}

export default React.memo(SearchFileTreeItem);
