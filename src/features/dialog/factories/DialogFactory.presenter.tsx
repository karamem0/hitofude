//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import {
  DialogAction,
  File,
  FileConflict,
  FileVersion,
  Folder
} from '../../../types/Model';
import FileCopyDialog from '../components/FileCopyDialog';
import FileCreateDialog from '../components/FileCreateDialog';
import FileDeleteDialog from '../components/FileDeleteDialog';
import FileOverwriteDialog from '../components/FileOverwriteDialog';
import FileRenameDialog from '../components/FileRenameDialog';
import FileRestoreDialog from '../components/FileRestoreDialog';
import FolderCreateDialog from '../components/FolderCreateDialog';
import FolderDeleteDialog from '../components/FolderDeleteDialog';
import FolderRenameDialog from '../components/FolderRenameDialog';
import LinkCopyDialog from '../components/LinkCopyDialog';
import ThemeChangeDialog from '../components/ThemeChangeDialog';

interface DialogFactoryProps {
  action?: DialogAction
}

function DialogFactory(props: Readonly<DialogFactoryProps>) {

  const {
    action
  } = props;

  switch (action?.type) {
    case 'changeTheme':
      return (
        <ThemeChangeDialog />
      );
    case 'copyFile':
      return (
        <FileCopyDialog value={action.data as File} />
      );
    case 'copyLink':
      return (
        <LinkCopyDialog value={action.data as string} />
      );
    case 'createFile':
      return (
        <FileCreateDialog />
      );
    case 'createFolder':
      return (
        <FolderCreateDialog />
      );
    case 'deleteFile':
      return (
        <FileDeleteDialog value={action.data as File} />
      );
    case 'deleteFolder':
      return (
        <FolderDeleteDialog value={action.data as Folder} />
      );
    case 'overwriteFile':
      return (
        <FileOverwriteDialog value={action.data as FileConflict} />
      );
    case 'renameFile':
      return (
        <FileRenameDialog value={action.data as File} />
      );
    case 'renameFolder':
      return (
        <FolderRenameDialog value={action.data as Folder} />
      );
    case 'restoreFile':
      return (
        <FileRestoreDialog value={action.data as FileVersion} />
      );
    default:
      return null;
  }

}

export default React.memo(DialogFactory);
