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
  Avatar,
  Caption1,
  Menu,
  MenuDivider,
  MenuGroup,
  MenuGroupHeader,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Text,
  Tooltip
} from '@fluentui/react-components';
import { FormattedMessage } from 'react-intl';
import { EventHandler } from '../../../types/Event';
import messages from '../messages';

interface MeControlProps {
  photo?: string,
  userId?: string,
  userName?: string,
  onLinkToPrivacyPolicy?: EventHandler,
  onLinkToTermsOfUse?: EventHandler,
  onSignOut?: EventHandler
}

function MeControl(props: Readonly<MeControlProps>) {

  const {
    photo,
    userId,
    userName,
    onLinkToPrivacyPolicy,
    onLinkToTermsOfUse,
    onSignOut
  } = props;

  return (
    <Menu>
      <MenuTrigger>
        <Tooltip
          relationship="label"
          content={(
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
                {userName}
              </Caption1>
              <Caption1
                css={css`
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                `}>
                {userId}
              </Caption1>
            </div>
          )}>
          <Avatar
            name={userName}
            css={css`
              cursor: pointer;
            `}
            image={{
              src: photo
            }} />
        </Tooltip>
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
          </MenuGroup>
          <MenuDivider />
          <MenuGroup>
            <MenuItem onClick={onLinkToTermsOfUse}>
              <FormattedMessage {...messages.TermsOfUse} />
            </MenuItem>
            <MenuItem onClick={onLinkToPrivacyPolicy}>
              <FormattedMessage {...messages.PrivacyPolicy} />
            </MenuItem>
          </MenuGroup>
          <MenuDivider />
          <MenuGroup>
            <MenuItem onClick={onSignOut}>
              <FormattedMessage {...messages.SignOut} />
            </MenuItem>
          </MenuGroup>
        </MenuList>
      </MenuPopover>
    </Menu>
  );

}

export default React.memo(MeControl);
