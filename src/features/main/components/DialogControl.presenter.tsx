//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { EventHandler } from '../../../types/Event';
import { File, Folder } from '../../../types/Model';
import { DialogAction, DialogType } from '../types/Dialog';

import FileCopyDialog from './FileCopyDialog';
import FileCreateDialog from './FileCreateDialog';
import FileDeleteDialog from './FileDeleteDialog';
import FileRenameDialog from './FileRenameDialog';
import FolderCreateDialog from './FolderCreateDialog';
import FolderDeleteDialog from './FolderDeleteDialog';
import FolderRenameDialog from './FolderRenameDialog';

interface DialogControlProps {
  action?: DialogAction,
  onOpenDialog?: EventHandler<DialogAction>
}

function DialogControl(props: DialogControlProps) {

  const {
    action,
    onOpenDialog
  } = props;

  return action ? (
    (() => {
      switch (action.type) {
        case DialogType.copyFile:
          return (
            <FileCopyDialog
              file={action.payload as File}
              onOpenChange={(e, data) => !data && onOpenDialog?.(e, undefined)} />
          );
        case DialogType.createFile:
          return (
            <FileCreateDialog onOpenChange={(e, data) => !data && onOpenDialog?.(e, undefined)} />
          );
        case DialogType.createFolder:
          return (
            <FolderCreateDialog onOpenChange={(e, data) => !data && onOpenDialog?.(e, undefined)} />
          );
        case DialogType.deleteFile:
          return (
            <FileDeleteDialog
              file={action.payload as File}
              onOpenChange={(e, data) => !data && onOpenDialog?.(e, undefined)} />
          );
        case DialogType.deleteFolder:
          return (
            <FolderDeleteDialog
              folder={action.payload as Folder}
              onOpenChange={(e, data) => !data && onOpenDialog?.(e, undefined)} />
          );
        case DialogType.renameFile:
          return (
            <FileRenameDialog
              file={action.payload as File}
              onOpenChange={(e, data) => !data && onOpenDialog?.(e, undefined)} />
          );
        case DialogType.renameFolder:
          return (
            <FolderRenameDialog
              folder={action.payload as Folder}
              onOpenChange={(e, data) => !data && onOpenDialog?.(e, undefined)} />
          );
        default:
          return null;
      }
    })()
  ) : null;

}

export default React.memo(DialogControl);
