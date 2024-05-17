//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { Controller, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import {
  Button,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  Input
} from '@fluentui/react-components';

import { css } from '@emotion/react';

import ModalDialog from '../../../common/components/ModalDialog';
import { EventHandler } from '../../../types/Event';
import { File } from '../../../types/Model';
import messages from '../messages';
import { FileRenameDialogFormState } from '../types/Form';

interface FileRenameDialogProps {
  loading?: boolean,
  value?: File,
  onSubmit?: EventHandler<FileRenameDialogFormState>
}

function FileRenameDialog(props: Readonly<FileRenameDialogProps>) {

  const {
    loading,
    value,
    onSubmit
  } = props;

  const intl = useIntl();
  const form = useForm<FileRenameDialogFormState>({
    defaultValues: {
      id: value?.id,
      baseName: value?.baseName
    }
  });

  return (
    <ModalDialog>
      <DialogSurface>
        <form onSubmit={form.handleSubmit((formState) => onSubmit?.({}, formState))}>
          <DialogBody>
            <DialogTitle>
              <FormattedMessage {...messages.RenameFile} />
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
                  name="baseName"
                  render={({ field }) => (
                    <Input
                      ref={field.ref}
                      appearance="outline"
                      aria-label={intl.formatMessage(messages.FileName)}
                      contentAfter=".md"
                      placeholder={intl.formatMessage(messages.FileName)}
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
    </ModalDialog>
  );

}

export default React.memo(FileRenameDialog);
