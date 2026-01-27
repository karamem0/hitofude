//
// Copyright (c) 2023-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import Presenter from './LinkCopyDialog.presenter';

interface LinkCopyDialogProps {
  value?: string
}

function LinkCopyDialog(props: Readonly<LinkCopyDialogProps>) {

  const { value } = props;

  const [ copied, setCopied ] = React.useState<boolean>(false);

  const handleCopy = React.useCallback(async () => {
    await navigator.clipboard.writeText(value ?? '');
    setCopied(true);
  }, [
    value
  ]);

  return (
    <Presenter
      copied={copied}
      value={value}
      onCopy={handleCopy} />
  );

}

export default LinkCopyDialog;
