//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

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
  Text
} from '@fluentui/react-components';
import { FormattedMessage, useIntl } from 'react-intl';
import { EventHandler } from '../../../types/Event';
import ModalDialog from '../../../common/components/ModalDialog';
import { ThemeName } from '../../../types/Model';
import { css } from '@emotion/react';
import messages from '../messages';

interface ThemeChangeDialogProps {
  themeName: ThemeName,
  onChangeTheme: EventHandler<ThemeName>
}

function ThemeChangeDialog(props: Readonly<ThemeChangeDialogProps>) {

  const {
    themeName,
    onChangeTheme
  } = props;

  const intl = useIntl();

  return (
    <ModalDialog>
      <DialogSurface>
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
                  <Checkbox
                    checked={themeName === ThemeName.light}
                    onChange={(event, data) => data.checked && onChangeTheme?.(event, ThemeName.light)} />
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
                  <Checkbox
                    checked={themeName === ThemeName.dark}
                    onChange={(event, data) => data.checked && onChangeTheme?.(event, ThemeName.dark)} />
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
              <Button
                appearance="secondary"
                aria-label={intl.formatMessage(messages.Close)}
                title={intl.formatMessage(messages.Close)}>
                <FormattedMessage {...messages.Close} />
              </Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </ModalDialog>
  );

}

export default React.memo(ThemeChangeDialog);
