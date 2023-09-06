//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { FallbackProps } from 'react-error-boundary';

import { useAppInsightsContext } from '@microsoft/applicationinsights-react-js';

import { useTheme } from '../../../providers/ThemeProvider';
import { ThemeName } from '../../../types/Model';

import Presenter from './Error500Page.presenter';

function Error500Page(props: FallbackProps) {

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
