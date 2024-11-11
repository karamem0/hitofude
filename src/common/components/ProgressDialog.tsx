//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import Presenter from './ProgressDialog.presenter';
import { useProgress } from '../providers/ProgressProvider';

function ProgressDialog() {

  const { progress } = useProgress();

  return (
    <Presenter type={progress} />
  );

}

export default ProgressDialog;
