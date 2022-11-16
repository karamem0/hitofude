//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

export class FileConflictError extends Error {

  constructor(message?: string) {
    super(message);
    this.name = 'FileConflictError';
  }

}

export class FileNotFoundError extends Error {

  constructor(message?: string) {
    super(message);
    this.name = 'FileNotFoundError';
  }

}

export class FolderConflictError extends Error {

  constructor(message?: string) {
    super(message);
    this.name = 'FolderConflictError';
  }

}

export class FolderNotFoundError extends Error {

  constructor(message?: string) {
    super(message);
    this.name = 'FolderNotFoundError';
  }

}
