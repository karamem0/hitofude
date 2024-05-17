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
  DialogType,
  File,
  FileVersion,
  Folder
} from '../../../types/Model';
import FileCopyDialog from '../components/FileCopyDialog';
import FileCreateDialog from '../components/FileCreateDialog';
import FileDeleteDialog from '../components/FileDeleteDialog';
import FileRenameDialog from '../components/FileRenameDialog';
import FileRestoreDialog from '../components/FileRestoreDialog';
import FolderCreateDialog from '../components/FolderCreateDialog';
import FolderDeleteDialog from '../components/FolderDeleteDialog';
import FolderRenameDialog from '../components/FolderRenameDialog';
import ThemeChangeDialog from '../components/ThemeChangeDialog';

interface DialogFactoryProps {
  action?: DialogAction
}

function DialogFactory(props: Readonly<DialogFactoryProps>) {

  const {
    action
  } = props;

  switch (action?.type) {
    case DialogType.changeTheme:
      return (
        <ThemeChangeDialog />
      );
    case DialogType.copyFile:
      return (
        <FileCopyDialog value={action.data as File} />
      );
    case DialogType.createFile:
      return (
        <FileCreateDialog />
      );
    case DialogType.createFolder:
      return (
        <FolderCreateDialog />
      );
    case DialogType.deleteFile:
      return (
        <FileDeleteDialog value={action.data as File} />
      );
    case DialogType.deleteFolder:
      return (
        <FolderDeleteDialog value={action.data as Folder} />
      );
    case DialogType.renameFile:
      return (
        <FileRenameDialog value={action.data as File} />
      );
    case DialogType.renameFolder:
      return (
        <FolderRenameDialog value={action.data as Folder} />
      );
    case DialogType.restoreFile:
      return (
        <FileRestoreDialog value={action.data as FileVersion} />
      );
    default:
      return null;
  }

}

export default React.memo(DialogFactory);
