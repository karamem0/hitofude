//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { File } from '../../../types/Model';

import Presenter from './ImageControl.presenter';

interface ImageControlProps {
  value: File
}

function ImageControl(props: ImageControlProps) {

  const {
    value
  } = props;

  return (
    <Presenter src={value.downloadUrl} />
  );

}

export default ImageControl;
