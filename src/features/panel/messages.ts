//
// Copyright (c) 2023-2025 karamem0
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
    RestoreFile: { defaultMessage: 'Restore file' },
    Size: { defaultMessage: 'Size' },
    UpdatedDate: { defaultMessage: 'Updated date' },
    Version: { defaultMessage: 'Version' },
    VersionHistory: { defaultMessage: 'Version history' }
  })
};

export default messages;
