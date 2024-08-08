//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { useIntl } from 'react-intl';

import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogSurface,
  Spinner,
  Text
} from '@fluentui/react-components';

import { css } from '@emotion/react';

import { useTheme } from '../../providers/ThemeProvider';
import { ProgressType } from '../../types/Model';
import messages from '../messages';

interface ProgressDialogProps {
  value?: ProgressType
}

function ProgressDialog(props: Readonly<ProgressDialogProps>) {

  const {
    value
  } = props;

  const intl = useIntl();
  const { theme: { theme } } = useTheme();

  return (
    <Dialog
      modalType="alert"
      open={!!value}>
      <DialogSurface>
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
                  switch (value) {
                    case ProgressType.save:
                      return intl.formatMessage(messages.Saving);
                    case ProgressType.upload:
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
