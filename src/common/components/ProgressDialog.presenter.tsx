//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { useIntl } from 'react-intl';

import { css } from '@emotion/react';
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogSurface,
  Spinner,
  Text
} from '@fluentui/react-components';

import { themeConfig } from '../../providers/ThemeProvider';
import { ProgressType } from '../../types/Model';
import messages from '../messages';

interface ProgressDialogProps {
  value?: ProgressType
}

function ProgressDialog(props: ProgressDialogProps) {

  const {
    value
  } = props;

  const intl = useIntl();

  return (
    <Dialog
      modalType="alert"
      open={value !== ProgressType.none}>
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
                font-size: ${themeConfig.fontSizeBase600};
                line-height: calc(${themeConfig.fontSizeBase600} * 1.25);
              `}>
              {
                (() => {
                  switch (value) {
                    case ProgressType.save:
                      return intl.formatMessage(messages.Saving);
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

export default ProgressDialog;
