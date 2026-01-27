//
// Copyright (c) 2023-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import { defineMessages } from 'react-intl';
import parentMessages from '../messages';

const messages = {
  ...parentMessages,
  ...defineMessages({
    CopyLink: { defaultMessage: 'Copy link' },
    LastModified: { defaultMessage: 'Last modified' },
    Name: { defaultMessage: 'Name' },
    OpenFileLocation: { defaultMessage: 'Open file location' },
    Search: { defaultMessage: 'Search' },
    Size: { defaultMessage: 'Size' }
  })
};

export default messages;
