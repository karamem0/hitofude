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
  Input,
  MessageBar,
  MessageBarTitle,
  Tooltip
} from '@fluentui/react-components';
import { Copy16Regular } from '@fluentui/react-icons';
import { FormattedMessage, useIntl } from 'react-intl';
import ModalDialog from '../../../common/components/ModalDialog';
import { EventHandler } from '../../../types/Event';
import messages from '../messages';

interface LinkCopyDialogProps {
  copied?: boolean,
  mountNode?: HTMLElement,
  value?: string,
  onCopy?: EventHandler
}

function LinkCopyDialog(props: Readonly<LinkCopyDialogProps>) {

  const {
    copied,
    mountNode,
    value,
    onCopy
  } = props;

  const intl = useIntl();

  return (
    <ModalDialog>
      <DialogSurface mountNode={mountNode}>
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
                      <Tooltip
                        content={intl.formatMessage(messages.Copy)}
                        relationship="label">
                        <Button
                          appearance="transparent"
                          icon={(
                            <Copy16Regular />
                          )}
                          onClick={onCopy} />
                      </Tooltip>
                    )} />
                )
              }
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

export default React.memo(LinkCopyDialog);
