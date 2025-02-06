//
// Copyright (c) 2023-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { InteractionStatus } from '@azure/msal-browser';
import Presenter from './MsalAdapter.presenter';
import { useMsal } from '@azure/msal-react';

function MsalAdapter(props: Readonly<React.PropsWithChildren<unknown>>) {

  const { children } = props;

  const msal = useMsal();

  React.useEffect(() => {
    if (msal.accounts.length > 0) {
      msal.instance.setActiveAccount(msal.accounts[0]);
    }
  }, [
    msal
  ]);

  return (
    <Presenter loading={msal.inProgress !== InteractionStatus.None}>
      {children}
    </Presenter>
  );

}

export default MsalAdapter;
