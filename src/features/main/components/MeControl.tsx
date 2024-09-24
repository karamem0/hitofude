//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { FileNotFoundError } from '../../../types/Error';
import Presenter from './MeControl.presenter';
import messages from '../messages';
import { useError } from 'react-use';
import { useIntl } from 'react-intl';
import { useMsal } from '@azure/msal-react';
import { useService } from '../../../providers/ServiceProvider';

function MeControl() {

  const setError = useError();
  const intl = useIntl();
  const msal = useMsal();
  const { graph } = useService();
  const [ photo, setPhoto ] = React.useState<string>();

  const account = React.useMemo(() => msal.instance.getActiveAccount(), [
    msal
  ]);

  const handleLinkToPrivacyPolicy = React.useCallback(() => {
    window.open(intl.formatMessage(messages.PrivacyPolicyLink), '_blank', 'noreferrer');
  }, [
    intl
  ]);

  const handleLinkToTermsOfUse = React.useCallback(() => {
    window.open(intl.formatMessage(messages.TermsOfUseLink), '_blank', 'noreferrer');
  }, [
    intl
  ]);

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
        setPhoto(await graph.getMyPhoto());
      } catch (error) {
        if (error instanceof FileNotFoundError) {
          setPhoto(undefined);
          return;
        }
        if (error instanceof Error) {
          setError(error);
          return;
        }
        throw error;
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
      onLinkToPrivacyPolicy={handleLinkToPrivacyPolicy}
      onLinkToTermsOfUse={handleLinkToTermsOfUse}
      onSignOut={handleSignOut} />
  );

}

export default MeControl;
