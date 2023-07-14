//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { InteractionStatus } from '@azure/msal-browser';
import { useMsal } from '@azure/msal-react';

import Presenter from './MsalAdapter.presenter';

function MsalAdapter(props: React.PropsWithChildren<unknown>) {

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
