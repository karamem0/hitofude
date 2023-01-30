//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { FormattedMessage, useIntl } from 'react-intl';

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
  Text
} from '@fluentui/react-components';

import { EventHandler } from '../../../types/Event';
import messages from '../messages';

interface FileDeleteDialogProps {
  loading?: boolean,
  open?: boolean,
  onOpenChange?: EventHandler<boolean>,
  onSubmit?: EventHandler
}

function FileDeleteDialog(props: FileDeleteDialogProps) {

  const {
    loading,
    open,
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
