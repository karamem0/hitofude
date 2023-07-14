//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import ProgressDialog from '../common/components/ProgressDialog';
import { ProgressType } from '../types/Model';

interface ProgressContextState {
  progress: ProgressType,
  setProgress: (value?: ProgressType) => void
}

const ProgressContext = React.createContext<ProgressContextState | undefined>(undefined);

export const useProgress = (): ProgressContextState => {
  const value = React.useContext(ProgressContext);
  if (value == null) {
    throw new Error();
  }
  return value;
};

function ProgressProvider(props: React.PropsWithChildren<unknown>) {

  const { children } = props;

  const [ progress, setProgress ] = React.useState(ProgressType.none);

  const value = React.useMemo(() => ({
    progress,
    setProgress: (value?: ProgressType) => setProgress(value || ProgressType.none)
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
