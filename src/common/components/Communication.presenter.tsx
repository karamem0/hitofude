//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { css } from '@emotion/react';
import { Text } from '@fluentui/react-components';

import { themeConfig } from '../../providers/ThemeProvider';

interface CommunicationProps {
  description?: string,
  image?: string,
  title?: string
}

function Communication(props: CommunicationProps) {

  const {
    description,
    image,
    title
  } = props;

  return (
    <div
      css={css`
        display: grid;
        grid-template-rows: auto auto;
        grid-template-columns: auto;
        grid-gap: 2rem;
      `}>
      <img
        src={image}
        css={css`
          max-width: 16rem;
          max-height: 12rem;
          margin: auto;
        `} />
      <div
        css={css`
          display: flex;
          flex-direction: column;
          grid-gap: 1rem;
          align-items: center;
          justify-content: center;
          color: ${themeConfig.colorNeutralForeground4};
        `}>
        <Text
          css={css`
            font-size: 2rem;
            line-height: calc(2rem * 1.25);
          `}>
          {title}
        </Text>
        <Text>
          {description}
        </Text>
      </div>
    </div>
  );

}

export default Communication;
