//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import {
  Avatar,
  Menu,
  MenuGroup,
  MenuGroupHeader,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Text
} from '@fluentui/react-components';
import { EventHandler } from '../../../types/Event';
import { FormattedMessage } from 'react-intl';
import { SignOutIcon } from '@fluentui/react-icons-mdl2';
import { css } from '@emotion/react';
import messages from '../messages';

interface MeControlProps {
  photo?: string,
  userId?: string,
  userName?: string,
  onSignOut?: EventHandler
}

function MeControl(props: Readonly<MeControlProps>) {

  const {
    photo,
    userId,
    userName,
    onSignOut
  } = props;

  return (
    <Menu>
      <MenuTrigger>
        <Avatar
          name={userName}
          title={userName}
          css={css`
            cursor: pointer;
          `}
          image={{
            src: photo
          }} />
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
          <MenuGroup>
            <MenuGroupHeader
              css={css`
                display: flex;
                flex-direction: column;
                align-items: start;
                height: 3rem;
              `}>
              <Text
                css={css`
                  font-weight: bold;
                `}>
                {userName}
              </Text>
              <Text>
                {userId}
              </Text>
            </MenuGroupHeader>
            <MenuItem
              icon={(
                <SignOutIcon
                  css={css`
                    font-size: 1rem;
                    line-height: 1rem;
                  `} />
              )}
              onClick={onSignOut}>
              <FormattedMessage {...messages.SignOut} />
            </MenuItem>
          </MenuGroup>
        </MenuList>
      </MenuPopover>
    </Menu>
  );

}

export default React.memo(MeControl);
