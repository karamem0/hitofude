//
// Copyright (c) 2023-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import Presenter from './Communication.presenter';

interface CommunicationProps {
  description?: string,
  image?: string,
  title?: string
}

function Communication(props: Readonly<CommunicationProps>) {

  const {
    description,
    image,
    title
  } = props;

  return (
    <Presenter
      description={description}
      image={image}
      title={title} />
  );

}

export default Communication;
