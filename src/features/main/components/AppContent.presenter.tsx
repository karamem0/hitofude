//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { css } from '@emotion/react';

import Loader from '../../../common/components/Loader';
import { File } from '../../../types/Model';
import { isSupportedFile } from '../../../utils/File';

import ContentEmpty from './ContentEmpty';
import ContentSupported from './ContentSupported';
import ContentUnsupported from './ContentUnsupported';

interface AppContentProps {
  file?: File,
  loading?: boolean
}

function AppContent(props: Readonly<AppContentProps>) {

  const {
    file,
    loading
  } = props;

  return (
    <div
      css={css`
        display: grid;
      `}>
      <Loader loading={loading}>
        {
          (() => {
            if (file == null) {
              return (
                <ContentEmpty />
              );
            }
            if (isSupportedFile(file)) {
              return (
                <ContentSupported />
              );
            } else {
              return (
                <ContentUnsupported />
              );
            }
          })()
        }
      </Loader>
    </div>
  );

}

export default React.memo(AppContent);
