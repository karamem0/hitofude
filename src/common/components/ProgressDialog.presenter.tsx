//
// Copyright (c) 2023-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogSurface,
  Spinner,
  Text
} from '@fluentui/react-components';
import { ProgressType } from '../../types/Model';
import { css } from '@emotion/react';
import messages from '../messages';
import { useIntl } from 'react-intl';
import { useTheme } from '../../providers/ThemeProvider';

interface ProgressDialogProps {
  mountNode?: HTMLElement,
  type?: ProgressType
}

function ProgressDialog(props: Readonly<ProgressDialogProps>) {

  const {
    mountNode,
    type
  } = props;

  const intl = useIntl();
  const { theme } = useTheme();

  return (
    <Dialog
      modalType="modal"
      open={type != null}>
      <DialogSurface mountNode={mountNode}>
        <DialogBody>
          <DialogContent
            css={css`
              display: flex;
              flex-flow: row;
              grid-gap: 0.5rem;
              align-items: center;
              justify-content: center;
              padding: 1rem;
            `}>
            <Spinner size="small" />
            <Text
              css={css`
                font-size: ${theme.fontSizeBase600};
                line-height: calc(${theme.fontSizeBase600} * 1.25);
              `}>
              {
                (() => {
                  switch (type) {
                    case 'save':
                      return intl.formatMessage(messages.Saving);
                    case 'upload':
                      return intl.formatMessage(messages.Uploading);
                    default:
                      return null;
                  }
                })()
              }
            </Text>
          </DialogContent>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );

}

export default React.memo(ProgressDialog);
