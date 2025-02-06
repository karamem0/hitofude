//
// Copyright (c) 2023-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { FallbackProps } from 'react-error-boundary';
import Presenter from './Error500Page.presenter';
import { ThemeName } from '../../../types/Model';
import { useAppInsightsContext } from '@microsoft/applicationinsights-react-js';
import { useTheme } from '../../../providers/ThemeProvider';

function Error500Page(props: Readonly<FallbackProps>) {

  const { error } = props;

  const { changeTheme } = useTheme();
  const appInsights = useAppInsightsContext();

  React.useCallback(() => {
    if (error == null) {
      return;
    }
    appInsights.trackException({ error });
  }, [
    appInsights,
    error
  ]);

  React.useEffect(() => {
    changeTheme(ThemeName.light);
  }, [
    changeTheme
  ]);

  return (
    <Presenter />
  );

}

export default Error500Page;
