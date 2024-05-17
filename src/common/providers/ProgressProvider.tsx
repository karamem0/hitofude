//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { InvalidOperationError } from '../../types/Error';
import { ProgressType } from '../../types/Model';
import ProgressDialog from '../components/ProgressDialog';

interface ProgressContextState {
  progress?: ProgressType,
  setProgress: (value?: ProgressType) => void
}

const ProgressContext = React.createContext<ProgressContextState | undefined>(undefined);

export const useProgress = (): ProgressContextState => {
  const value = React.useContext(ProgressContext);
  if (value == null) {
    throw new InvalidOperationError();
  }
  return value;
};

function ProgressProvider(props: Readonly<React.PropsWithChildren<unknown>>) {

  const { children } = props;

  const [ progress, setProgress ] = React.useState<ProgressType>();

  const value = React.useMemo<ProgressContextState>(() => ({
    progress,
    setProgress: (value?: ProgressType) => setProgress(value)
  }), [
    progress
  ]);

  return (
    <ProgressContext.Provider value={value}>
      <ProgressDialog />
      {children}
    </ProgressContext.Provider>
  );

}

export default ProgressProvider;
