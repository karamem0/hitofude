//
// Copyright (c) 2023-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider as Provider } from '@azure/msal-react';
import MsalAdapter from '../common/components/MsalAdapter';
import { msalConfig } from '../config/MsalConfig';

function MsalProvider(props: Readonly<React.PropsWithChildren<unknown>>) {

  const { children } = props;

  return (
    <Provider instance={new PublicClientApplication(msalConfig)}>
      <MsalAdapter>
        {children}
      </MsalAdapter>
    </Provider>
  );

}

export default MsalProvider;
