//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { FormattedMessage, useIntl } from 'react-intl';

import {
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  SplitButton
} from '@fluentui/react-components';

import { Event, EventHandler } from '../../../types/Event';
import messages from '../messages';

interface ContentSaveButtonProps {
  disabled?: boolean,
  onClick?: EventHandler<boolean>
}

function ContentSaveButton(props: Readonly<ContentSaveButtonProps>) {

  const {
    disabled,
    onClick
  } = props;

  const intl = useIntl();

  return (
    <Menu positioning="below-end">
      <MenuTrigger disableButtonEnhancement>
        {
          (trigger) => (
            <SplitButton
              appearance="primary"
              aria-label={intl.formatMessage(messages.Save)}
              disabled={disabled}
              menuButton={trigger}
              title={intl.formatMessage(messages.Save)}
              onClick={(event: Event) => {
                if (event.target instanceof HTMLButtonElement &&
                  event.target.innerText === intl.formatMessage(messages.Save)) {
                  onClick?.(event, true);
                }
              }}>
              <FormattedMessage {...messages.Save} />
            </SplitButton>
          )
        }
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
          <MenuItem
            key="SaveAndClose"
            onClick={(event) => onClick?.(event, false)}>
            <FormattedMessage {...messages.SaveAndClose} />
          </MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  );

}

export default React.memo(ContentSaveButton);
