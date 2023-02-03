//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import { TabMode, TabType } from '../types/Model';

export class StorageService {

  private readonly storage: Storage;

  constructor(storage: Storage = localStorage) {
    this.storage = storage;
  }

  getTabMode(): TabMode | undefined {
    return {
      type: Number(this.storage.getItem('tabType')) || TabType.explorer,
      open: Boolean(Number(this.storage.getItem('tabOpen') || true))
    };
  }

  getExploreFileId(): string | undefined {
    return this.storage.getItem('exploreFileId') || undefined;
  }

  getExploreFolderId(): string | undefined {
    return this.storage.getItem('exploreFolderId') || undefined;
  }

  setTabMode(value?: TabMode): void {
    this.storage.setItem('tabType', String(Number(value?.type)));
    this.storage.setItem('tabOpen', String(Number(value?.open)));
  }

  setExploreFileId(value?: string): void {
    if (value) {
      this.storage.setItem('exploreFileId', value);
    } else {
      this.storage.removeItem('exploreFileId');
    }
  }

  setExploreFolderId(value?: string): void {
    if (value) {
      this.storage.setItem('exploreFolderId', value);
    } else {
      this.storage.removeItem('exploreFolderId');
    }
  }

}
