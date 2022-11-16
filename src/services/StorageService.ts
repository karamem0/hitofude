//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

export class StorageService {

  private readonly storage: Storage;

  constructor(storage: Storage = localStorage) {
    this.storage = storage;
  }

  getTabMode(): boolean | undefined {
    return Boolean(Number(this.storage.getItem('tabMode'))) || undefined;
  }

  getWorkFolderId(): string | undefined {
    return this.storage.getItem('workFolderId') || undefined;
  }

  setTabMode(value?: boolean): void {
    this.storage.setItem('tabMode', String(Number(value)));
  }

  setWorkFolderId(value?: string): void {
    if (value) {
      this.storage.setItem('workFolderId', value);
    } else {
      this.storage.removeItem('workFolderId');
    }
  }

}
