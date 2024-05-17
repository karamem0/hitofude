//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { useProgress } from '../providers/ProgressProvider';

import Presenter from './ProgressDialog.presenter';

function ProgressDialog() {

  const { progress } = useProgress();

  return (
    <Presenter value={progress} />
  );

}

export default ProgressDialog;
