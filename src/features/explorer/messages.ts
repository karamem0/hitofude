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
    ConflictFile: { defaultMessage: 'Conflict file' },
    CopyFile: { defaultMessage: 'Copy file' },
    CopyLink: { defaultMessage: 'Copy link' },
    DeleteFile: { defaultMessage: 'Delete file' },
    DeleteFolder: { defaultMessage: 'Delete folder' },
    Download: { defaultMessage: 'Download' },
    DragDropFile: { defaultMessage: 'Drag and drop files here' },
    Explorer: { defaultMessage: 'Explorer' },
    HideUnsupportedFiles: { defaultMessage: 'Hide other files' },
    LastModified: { defaultMessage: 'Last modified' },
    Name: { defaultMessage: 'Name' },
    NewFile: { defaultMessage: 'New file' },
    NewFolder: { defaultMessage: 'New folder' },
    OpenWithOneDrive: { defaultMessage: 'Open with OneDrive' },
    Refresh: { defaultMessage: 'Refresh' },
    RenameFile: { defaultMessage: 'Rename file' },
    RenameFolder: { defaultMessage: 'Rename folder' },
    RootFolder: { defaultMessage: 'OneDrive' },
    ShowUnsupportedFiles: { defaultMessage: 'Show other files' },
    Size: { defaultMessage: 'Size' }
  })
};

export default messages;
