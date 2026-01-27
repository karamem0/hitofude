//
// Copyright (c) 2023-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { useIntl } from 'react-intl';
import { useRoute } from '../../../providers/RouteProvider';
import { useService } from '../../../providers/ServiceProvider';
import { useStore } from '../../../providers/StoreProvider';
import { setTabOpen, setTabType } from '../../../stores/Action';
import { TabType } from '../../../types/Model';

import messages from '../messages';
import Presenter from './MainPage.presenter';

function MainPage() {

  const intl = useIntl();
  const { route } = useRoute();
  const {
    dispatch,
    state: {
      explorerProps,
      searchProps,
      tabProps
    }
  } = useStore();
  const { storage } = useService();
  const [ title, setTitle ] = React.useState<string>();

  React.useEffect(() => {
    const { tab } = route.getParams();
    if (tab == null) {
      route.setParams({
        tab: storage.getTabType()
      });
    } else {
      dispatch(setTabType(tab));
      dispatch(setTabOpen(storage.getTabOpen()));
    }
  }, [
    route,
    storage,
    dispatch
  ]);

  React.useEffect(() => {
    switch (tabProps?.type) {
      case TabType.explorer: {
        setTitle(
          explorerProps?.selectedFile?.fullName ??
          explorerProps?.selectedFolder?.root ? intl.formatMessage(messages.RootFolder) : explorerProps?.selectedFolder?.name
        );
        break;
      }
      case TabType.search: {
        setTitle(searchProps?.selectedFile?.fullName);
        break;
      }
      default: {
        setTitle(undefined);
        break;
      }
    }
  }, [
    explorerProps?.selectedFile,
    explorerProps?.selectedFolder,
    intl,
    searchProps?.selectedFile,
    tabProps?.type
  ]);

  return (
    <Presenter
      loading={tabProps?.type == null}
      title={title} />
  );

}

export default MainPage;
