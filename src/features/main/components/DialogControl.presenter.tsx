//
// Copyright (c) 2023 karamem0
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

import FileCopyDialog from './dialog/FileCopyDialog';
import FileCreateDialog from './dialog/FileCreateDialog';
import FileDeleteDialog from './dialog/FileDeleteDialog';
import FileRenameDialog from './dialog/FileRenameDialog';
import FileRestoreDialog from './dialog/FileRestoreDialog';
import FolderCreateDialog from './dialog/FolderCreateDialog';
import FolderDeleteDialog from './dialog/FolderDeleteDialog';
import FolderRenameDialog from './dialog/FolderRenameDialog';

interface DialogControlProps {
  action?: DialogAction
}

function DialogControl(props: DialogControlProps) {

  const {
    action
  } = props;

  switch (action?.type) {
    case DialogType.copyFile:
      return (
        <FileCopyDialog value={action.payload as File} />
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
        <FileDeleteDialog value={action.payload as File} />
      );
    case DialogType.deleteFolder:
      return (
        <FolderDeleteDialog value={action.payload as Folder} />
      );
    case DialogType.renameFile:
      return (
        <FileRenameDialog value={action.payload as File} />
      );
    case DialogType.renameFolder:
      return (
        <FolderRenameDialog value={action.payload as Folder} />
      );
    case DialogType.restoreFile:
      return (
        <FileRestoreDialog value={action.payload as FileVersion} />
      );
    default:
      return null;
  }

}

export default React.memo(DialogControl);
