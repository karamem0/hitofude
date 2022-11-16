//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import {
  FormattedMessage,
  MessageDescriptor,
  useIntl
} from 'react-intl';

import { css } from '@emotion/react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  Link,
  Text
} from '@fluentui/react-components';
import { Alert } from '@fluentui/react-components/unstable';

import { themeConfig } from '../../../providers/ThemeProvider';
import { EventHandler } from '../../../types/Event';
import messages from '../messages';

interface FileDeleteDialogProps {
  alert?: MessageDescriptor,
  loading?: boolean,
  open?: boolean,
  onDismiss?: EventHandler,
  onOpenChange?: EventHandler<boolean>,
  onSubmit?: EventHandler
}

function FileDeleteDialog(props: FileDeleteDialogProps) {

  const {
    alert,
    loading,
    open,
    onDismiss,
    onOpenChange,
    onSubmit
  } = props;

  const intl = useIntl();

  return (
    <Dialog
      modalType="modal"
      open={open}
      onOpenChange={(e, data) => onOpenChange?.(e, data.open)}>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>
            <FormattedMessage {...messages.DeleteFile} />
          </DialogTitle>
          <DialogContent>
            {
              alert ? (
                <Alert
                  intent="error"
                  action={
                    <Link
                      as="button"
                      onClick={onDismiss}>
                      <FormattedMessage {...messages.Dismiss} />
                    </Link>
                  }
                  css={css`
                    background-color: ${themeConfig.colorNeutralBackground2};
                  `}>
                  <FormattedMessage {...alert} />
                </Alert>
              ) : null
            }
            <div
              css={css`
                display: flex;
                flex-direction: column;
                padding: 1rem 0;
              `}>
              <Text>
                <FormattedMessage {...messages.DeleteFileConfirm} />
              </Text>
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              appearance="primary"
              aria-label={intl.formatMessage(messages.OK)}
              disabled={loading}
              title={intl.formatMessage(messages.OK)}
              onClick={onSubmit}>
              <FormattedMessage {...messages.OK} />
            </Button>
            <DialogTrigger disableButtonEnhancement>
              <Button
                appearance="secondary"
                aria-label={intl.formatMessage(messages.Cancel)}
                title={intl.formatMessage(messages.Cancel)}>
                <FormattedMessage {...messages.Cancel} />
              </Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );

}

export default React.memo(FileDeleteDialog);
