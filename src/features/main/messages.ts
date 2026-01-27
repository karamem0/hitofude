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
    Back: { defaultMessage: 'Back' },
    Cancel: { defaultMessage: 'Cancel' },
    ChangeTheme: { defaultMessage: 'Change theme' },
    CopyLink: { defaultMessage: 'Copy link' },
    Download: { defaultMessage: 'Download' },
    Edit: { defaultMessage: 'Edit' },
    Explorer: { defaultMessage: 'Explorer' },
    File: { defaultMessage: 'File' },
    Minimap: { defaultMessage: 'Minimap' },
    MoreOption: { defaultMessage: 'More option' },
    Name: { defaultMessage: 'Name' },
    NoDataDescription: { defaultMessage: 'Please select or create a file to start' },
    NoDataTitle: { defaultMessage: 'There is nothing here' },
    OpenWithOneDrive: { defaultMessage: 'Open with OneDrive' },
    Preview: { defaultMessage: 'Preview' },
    PrivacyPolicy: { defaultMessage: 'Privacy Policy' },
    PrivacyPolicyLink: { defaultMessage: 'https://github.com/karamem0/hitofude/blob/main/PRIVACY_POLICY.md' },
    RootFolder: { defaultMessage: 'OneDrive' },
    Save: { defaultMessage: 'Save' },
    SaveAndClose: { defaultMessage: 'Save and Close' },
    Search: { defaultMessage: 'Search' },
    Settings: { defaultMessage: 'Settings' },
    SignOut: { defaultMessage: 'Sign out' },
    SyncScroll: { defaultMessage: 'Sync scroll' },
    TermsOfUse: { defaultMessage: 'Terms of Use' },
    TermsOfUseLink: { defaultMessage: 'https://github.com/karamem0/hitofude/blob/main/TERMS_OF_USE.md' },
    UnsupportedFileDescription: { defaultMessage: 'Unsupported file format' },
    UnsupportedFileTitle: { defaultMessage: 'Cannot open this file' },
    VersionHistory: { defaultMessage: 'Version history' },
    WordWrap: { defaultMessage: 'Word wrap' },
    WorkFolderSelection: { defaultMessage: 'Select working directory' }
  })
};

export default messages;
