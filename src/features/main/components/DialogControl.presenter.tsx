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
  Folder
} from '../../../types/Model';

import FileCopyDialog from './FileCopyDialog';
import FileCreateDialog from './FileCreateDialog';
import FileDeleteDialog from './FileDeleteDialog';
import FileRenameDialog from './FileRenameDialog';
import FolderCreateDialog from './FolderCreateDialog';
import FolderDeleteDialog from './FolderDeleteDialog';
import FolderRenameDialog from './FolderRenameDialog';

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
        <FileCopyDialog file={action.payload as File} />
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
        <FileDeleteDialog file={action.payload as File} />
      );
    case DialogType.deleteFolder:
      return (
        <FolderDeleteDialog folder={action.payload as Folder} />
      );
    case DialogType.renameFile:
      return (
        <FileRenameDialog file={action.payload as File} />
      );
    case DialogType.renameFolder:
      return (
        <FolderRenameDialog folder={action.payload as Folder} />
      );
    default:
      return null;
  }

}

export default React.memo(DialogControl);
