//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { css } from '@emotion/react';

import Loader from '../../../common/components/Loader';
import { File, FileContent } from '../../../types/Model';
import { isSupportedFile } from '../../../utils/File';

import ContentEmpty from './ContentEmpty';
import ContentSupported from './ContentSupported';
import ContentUnsupported from './ContentUnsupported';

interface ContentSectionProps {
  loading?: boolean,
  value?: File & FileContent
}

function AppContent(props: ContentSectionProps) {

  const {
    loading,
    value
  } = props;

  return (
    <section
      css={css`
        display: grid;
      `}>
      <Loader loading={loading}>
        {
          (() => {
            if (value == null) {
              return (
                <ContentEmpty />
              );
            }
            if (isSupportedFile(value)) {
              return (
                <ContentSupported value={value} />
              );
            } else {
              return (
                <ContentUnsupported />
              );
            }
          })()
        }
      </Loader>
    </section>
  );

}

export default React.memo(AppContent);
