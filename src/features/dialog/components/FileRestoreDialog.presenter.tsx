//
// Copyright (c) 2023-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { FormattedMessage, useIntl } from 'react-intl';

import {
  Button,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  Text
} from '@fluentui/react-components';
import { EventHandler } from '../../../types/Event';
import ModalDialog from '../../../common/components/ModalDialog';
import { css } from '@emotion/react';
import messages from '../messages';

interface FileRestoreDialogProps {
  loading?: boolean,
  mountNode?: HTMLElement,
  onSubmit?: EventHandler
}

function FileRestoreDialog(props: Readonly<FileRestoreDialogProps>) {

  const {
    loading,
    mountNode,
    onSubmit
  } = props;

  const intl = useIntl();

  return (
    <ModalDialog>
      <DialogSurface mountNode={mountNode}>
        <DialogBody>
          <DialogTitle>
            <FormattedMessage {...messages.RestoreFile} />
          </DialogTitle>
          <DialogContent
            css={css`
              overflow: hidden;
            `}>
            <div
              css={css`
                display: flex;
                flex-direction: column;
                padding: 1rem 0;
              `}>
              <Text>
                <FormattedMessage {...messages.RestoreFileConfirm} />
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
    </ModalDialog>
  );

}

export default React.memo(FileRestoreDialog);
