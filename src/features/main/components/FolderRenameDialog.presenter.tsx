//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { Controller, useForm } from 'react-hook-form';
import { FormattedMessage, MessageDescriptor, useIntl } from 'react-intl';

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
  Input,
  Link
} from '@fluentui/react-components';
import { Alert } from '@fluentui/react-components/unstable';

import { themeConfig } from '../../../providers/ThemeProvider';
import { EventHandler } from '../../../types/Event';
import { Folder } from '../../../types/Model';
import messages from '../messages';
import { FolderRenameDialogFormState } from '../types/Form';

interface FolderRenameDialogProps {
  alert?: MessageDescriptor,
  folder?: Folder,
  loading?: boolean,
  open?: boolean,
  onDismiss?: EventHandler,
  onOpenChange?: EventHandler<boolean>,
  onSubmit?: EventHandler<FolderRenameDialogFormState>
}

function FolderRenameDialog(props: FolderRenameDialogProps) {

  const {
    alert,
    folder,
    loading,
    open,
    onOpenChange,
    onDismiss,
    onSubmit
  } = props;

  const intl = useIntl();
  const form = useForm<FolderRenameDialogFormState>({
    defaultValues: {
      id: folder?.id,
      name: folder?.name
    }
  });

  return (
    <Dialog
      modalType="modal"
      open={open}
      onOpenChange={(e, data) => onOpenChange?.(e, data.open)}>
      <DialogSurface>
        <form onSubmit={form.handleSubmit((formState) => onSubmit?.({}, formState))}>
          <DialogBody>
            <DialogTitle>
              <FormattedMessage {...messages.RenameFolder} />
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
                <Controller
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <Input
                      ref={field.ref}
                      appearance="outline"
                      aria-label={intl.formatMessage(messages.FolderName)}
                      placeholder={intl.formatMessage(messages.FolderName)}
                      value={field.value}
                      onBlur={field.onBlur}
                      onChange={field.onChange} />
                  )}
                  rules={{
                    required: true
                  }} />
              </div>
            </DialogContent>
            <DialogActions>
              <Button
                appearance="primary"
                aria-label={intl.formatMessage(messages.Save)}
                disabled={!form.formState.isValid || loading}
                title={intl.formatMessage(messages.Save)}
                type="submit">
                <FormattedMessage {...messages.Save} />
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
        </form>
      </DialogSurface>
    </Dialog>
  );

}

export default React.memo(FolderRenameDialog);
