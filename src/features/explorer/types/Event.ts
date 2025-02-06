//
// Copyright (c) 2023-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import { FileRejection } from 'react-dropzone';

export interface DropEventData {
  acceptedFiles: File[],
  rejectedFiles: FileRejection[]
}
