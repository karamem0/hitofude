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

import Presenter from './Error500Page.presenter';

function Error500Page(props: FallbackProps) {

  const { error } = props;

  const appInsights = useAppInsightsContext();

  React.useCallback(() => {
    if (error) {
      appInsights.trackException({ error });
    }
  }, [
    appInsights,
    error
  ]);

  return (
    <Presenter />
  );

}

export default Error500Page;
