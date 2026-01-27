//
// Copyright (c) 2023-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import {
  Link,
  Toast,
  ToastIntent,
  ToastTitle,
  ToastTrigger,
  Toaster,
  useId,
  useToastController
} from '@fluentui/react-components';
import { FormattedMessage, useIntl } from 'react-intl';
import {
  FileConflictError,
  FileNotFoundError,
  FolderConflictError,
  FolderNotFoundError
} from '../../types/Error';
import messages from '../messages';

const ToastContext = React.createContext<(message: string | Error, intent: ToastIntent) => void>(() => {});

export const useToast = (): (message: string | Error, intent: ToastIntent) => void => {
  const props = React.useContext(ToastContext);
  if (props == null) {
    throw new Error('The context is not initialzed: ToastContext');
  }
  return props;
};

function ToastProvider(props: Readonly<React.PropsWithChildren<unknown>>) {

  const { children } = props;

  const toasterId = useId();
  const { dispatchToast } = useToastController(toasterId);
  const intl = useIntl();

  const value = React.useMemo(() => (message: string | Error, intent: ToastIntent) =>
    dispatchToast(
      (
        <Toast>
          <ToastTitle
            action={
              <ToastTrigger>
                <Link>
                  <FormattedMessage {...messages.Dismiss} />
                </Link>
              </ToastTrigger>
            }>
            {
              (() => {
                switch (true) {
                  case message instanceof FileConflictError:
                    return intl.formatMessage(messages.FileAlreadyExists);
                  case message instanceof FileNotFoundError:
                    return intl.formatMessage(messages.FileDoesNotExists);
                  case message instanceof FolderConflictError:
                    return intl.formatMessage(messages.FolderAlreadyExists);
                  case message instanceof FolderNotFoundError:
                    return intl.formatMessage(messages.FolderDoesNotExists);
                  case message instanceof Error:
                    return message.message;
                  default:
                    return message;
                }
              })()
            }
          </ToastTitle>
        </Toast>
      ),
      {intent: intent}
    ),
  [
    intl,
    dispatchToast
  ]);

  return (
    <React.Fragment>
      <Toaster toasterId={toasterId} />
      <ToastContext.Provider value={value}>
        {children}
      </ToastContext.Provider>
    </React.Fragment>
  );

}

export default ToastProvider;
