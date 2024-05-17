//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { useError } from 'react-use';

import { useMsal } from '@azure/msal-react';

import { useService } from '../../../providers/ServiceProvider';
import { FileNotFoundError } from '../../../types/Error';

import Presenter from './MeControl.presenter';

function MeControl() {

  const setError = useError();
  const msal = useMsal();
  const { graph } = useService();
  const [ photo, setPhoto ] = React.useState<string>();
  const account = msal.instance.getActiveAccount();

  const handleSignOut = React.useCallback(async () => {
    await msal.instance.logoutRedirect({
      account: msal.instance.getActiveAccount()
    });
  }, [
    msal
  ]);

  React.useEffect(() => {
    (async () => {
      try {
        setPhoto(await graph.getPhoto());
      } catch (e) {
        if (e instanceof FileNotFoundError) {
          setPhoto(undefined);
          return;
        }
        if (e instanceof Error) {
          setError(e);
          return;
        }
        throw e;
      }
    })();
  }, [
    graph,
    msal,
    setError
  ]);

  return (
    <Presenter
      photo={photo}
      userId={account?.username}
      userName={account?.name}
      onSignOut={handleSignOut} />
  );

}

export default MeControl;
