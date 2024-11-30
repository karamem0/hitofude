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
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  Input,
  MessageBar,
  MessageBarTitle
} from '@fluentui/react-components';
import { FormattedMessage, useIntl } from 'react-intl';
import { Copy16Regular } from '@fluentui/react-icons';
import { EventHandler } from '../../../types/Event';
import ModalDialog from '../../../common/components/ModalDialog';
import { css } from '@emotion/react';
import messages from '../messages';

interface LinkCopyDialogProps {
  copied?: boolean,
  value?: string,
  onCopy?: EventHandler
}

function LinkCopyDialog(props: Readonly<LinkCopyDialogProps>) {

  const {
    copied,
    value,
    onCopy
  } = props;

  const intl = useIntl();

  return (
    <ModalDialog>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>
            <FormattedMessage {...messages.CopyLink} />
          </DialogTitle>
          <DialogContent
            css={css`
              overflow: hidden;
            `}>
            <div
              css={css`
                display: flex;
                flex-direction: column;
                height: 3.5rem;
                padding: 1rem 0;
              `}>
              {
                copied ? (
                  <MessageBar intent="success">
                    <MessageBarTitle>
                      <FormattedMessage {...messages.LinkCopied} />
                    </MessageBarTitle>
                  </MessageBar>
                ) : (
                  <Input
                    appearance="outline"
                    aria-label={intl.formatMessage(messages.Link)}
                    placeholder={intl.formatMessage(messages.Link)}
                    readOnly={true}
                    value={value}
                    contentAfter={(
                      <Button
                        appearance="transparent"
                        aria-label={intl.formatMessage(messages.Copy)}
                        title={intl.formatMessage(messages.Copy)}
                        icon={(
                          <Copy16Regular />
                        )}
                        onClick={onCopy} />
                    )} />
                )
              }
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

export default React.memo(LinkCopyDialog);
