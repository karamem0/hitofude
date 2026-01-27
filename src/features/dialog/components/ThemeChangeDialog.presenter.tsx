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
  Button,
  Card,
  CardHeader,
  Checkbox,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  Text,
  Tooltip
} from '@fluentui/react-components';
import { FormattedMessage, useIntl } from 'react-intl';
import ModalDialog from '../../../common/components/ModalDialog';
import { EventHandler } from '../../../types/Event';
import { ThemeName } from '../../../types/Model';
import messages from '../messages';

interface ThemeChangeDialogProps {
  mountNode?: HTMLElement,
  themeName: ThemeName,
  onChangeTheme?: EventHandler<ThemeName>
}

function ThemeChangeDialog(props: Readonly<ThemeChangeDialogProps>) {

  const {
    mountNode,
    themeName,
    onChangeTheme
  } = props;

  const intl = useIntl();

  return (
    <ModalDialog>
      <DialogSurface mountNode={mountNode}>
        <DialogBody>
          <DialogTitle>
            <FormattedMessage {...messages.ChangeTheme} />
          </DialogTitle>
          <DialogContent
            css={css`
              overflow: hidden;
            `}>
            <div
              css={css`
                display: grid;
                grid-template-rows: auto;
                grid-template-columns: 1fr 1fr;
                grid-gap: 1rem;
              `}>
              <Card
                floatingAction={(
                  <Tooltip
                    content={intl.formatMessage(messages.Light)}
                    relationship="label">
                    <Checkbox
                      checked={themeName === ThemeName.light}
                      name="light"
                      onChange={(event, data) => data.checked && onChangeTheme?.(event, ThemeName.light)} />
                  </Tooltip>
                )}>
                <CardHeader
                  header={(
                    <Text>
                      <FormattedMessage {...messages.Light} />
                    </Text>
                  )} />
              </Card>
              <Card
                floatingAction={(
                  <Tooltip
                    content={intl.formatMessage(messages.Dark)}
                    relationship="label">
                    <Checkbox
                      checked={themeName === ThemeName.dark}
                      name="dark"
                      onChange={(event, data) => data.checked && onChangeTheme?.(event, ThemeName.dark)} />
                  </Tooltip>
                )}>
                <CardHeader
                  header={(
                    <Text>
                      <FormattedMessage {...messages.Dark} />
                    </Text>
                  )} />
              </Card>
            </div>
          </DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Tooltip
                content={intl.formatMessage(messages.Close)}
                relationship="label">
                <Button appearance="secondary">
                  <FormattedMessage {...messages.Close} />
                </Button>
              </Tooltip>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </ModalDialog>
  );

}

export default React.memo(ThemeChangeDialog);
