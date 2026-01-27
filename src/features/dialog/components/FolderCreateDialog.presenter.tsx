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
  Tooltip
} from '@fluentui/react-components';
import { Controller, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import ModalDialog from '../../../common/components/ModalDialog';
import { EventHandler } from '../../../types/Event';
import messages from '../messages';
import { FolderCreateDialogFormState } from '../types/Form';

interface FolderCreateDialogProps {
  loading?: boolean,
  mountNode?: HTMLElement,
  onSubmit?: EventHandler<FolderCreateDialogFormState>
}

function FolderCreateDialog(props: Readonly<FolderCreateDialogProps>) {

  const {
    loading,
    mountNode,
    onSubmit
  } = props;

  const intl = useIntl();
  const form = useForm<FolderCreateDialogFormState>();

  return (
    <ModalDialog>
      <DialogSurface mountNode={mountNode}>
        <form onSubmit={form.handleSubmit((formState) => onSubmit?.({}, formState))}>
          <DialogBody>
            <DialogTitle>
              <FormattedMessage {...messages.NewFolder} />
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
                <Controller
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <Input
                      appearance="outline"
                      aria-label={intl.formatMessage(messages.FolderName)}
                      placeholder={intl.formatMessage(messages.FolderName)}
                      ref={field.ref}
                      onBlur={field.onBlur}
                      onChange={field.onChange} />
                  )}
                  rules={{
                    required: true
                  }} />
              </div>
            </DialogContent>
            <DialogActions>
              <Tooltip
                content={intl.formatMessage(messages.Save)}
                relationship="label">
                <Button
                  appearance="primary"
                  disabled={!form.formState.isValid || loading}
                  type="submit">
                  <FormattedMessage {...messages.Save} />
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
        </form>
      </DialogSurface>
    </ModalDialog>
  );

}

export default React.memo(FolderCreateDialog);
