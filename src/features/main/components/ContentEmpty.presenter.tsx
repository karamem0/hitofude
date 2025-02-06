//
// Copyright (c) 2023-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import Communication from '../../../common/components/Communication';
import { css } from '@emotion/react';
import messages from '../messages';
import { useIntl } from 'react-intl';

function ContentEmpty() {

  const intl = useIntl();

  return (
    <div
      css={css`
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;
      `}>
      <Communication
        description={intl.formatMessage(messages.NoDataDescription)}
        image="/assets/images/BlankCanvas.svg"
        title={intl.formatMessage(messages.NoDataTitle)} />
    </div>
  );

}

export default React.memo(ContentEmpty);
