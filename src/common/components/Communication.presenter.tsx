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

import { useTheme } from '../../providers/ThemeProvider';

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

  const { theme } = useTheme();

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
          color: ${theme.colorNeutralForeground4};
        `}>
        <Text
          css={css`
            font-size: ${theme.fontSizeHero800};
            line-height: calc(${theme.fontSizeHero800} * 1.25);
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

export default React.memo(Communication);
