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
import messages from '../messages';

interface FileDeleteDialogProps {
  loading?: boolean,
  mountNode?: HTMLElement,
  onSubmit?: EventHandler
}

function FileDeleteDialog(props: Readonly<FileDeleteDialogProps>) {

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
            <FormattedMessage {...messages.DeleteFile} />
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
                <FormattedMessage {...messages.DeleteFileConfirm} />
              </Text>
            </div>
          </DialogContent>
          <DialogActions>
            <Tooltip
              content={intl.formatMessage(messages.OK)}
              relationship="label">
              <Button
                appearance="primary"
                disabled={loading}
                onClick={onSubmit}>
                <FormattedMessage {...messages.OK} />
              </Button>
            </Tooltip>
            <DialogTrigger disableButtonEnhancement>
              <Tooltip
                content={intl.formatMessage(messages.Cancel)}
                relationship="label">
                <Button appearance="secondary">
                  <FormattedMessage {...messages.Cancel} />
                </Button>
              </Tooltip>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </ModalDialog>
  );

}

export default React.memo(FileDeleteDialog);
