//
// Copyright (c) 2023-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import {
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  SplitButton,
  Tooltip
} from '@fluentui/react-components';
import { FormattedMessage, useIntl } from 'react-intl';
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
            <Tooltip
              content={intl.formatMessage(messages.Save)}
              relationship="label">
              <SplitButton
                appearance="primary"
                disabled={disabled}
                menuButton={trigger}
                onClick={(event: Event) => {
                  const { target } = event;
                  const text = intl.formatMessage(messages.Save);
                  if (target instanceof HTMLButtonElement && target.innerText === text) {
                    onClick?.(event, true);
                  }
                }}>
                <FormattedMessage {...messages.Save} />
              </SplitButton>
            </Tooltip>
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
