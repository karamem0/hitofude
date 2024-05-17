//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import { TabType, ThemeName } from '../types/Model';

export class StorageService {

  private readonly storage: Storage;

  constructor(storage: Storage = localStorage) {
    this.storage = storage;
  }

  getContentMinimap(): boolean | undefined {
    return Boolean(Number(this.storage.getItem('contentMinimap') ?? undefined));
  }

  getContentPreview(): boolean | undefined {
    return Boolean(Number(this.storage.getItem('contentPreview') ?? undefined));
  }

  getContentScroll(): boolean | undefined {
    return Boolean(Number(this.storage.getItem('contentScroll') ?? undefined));
  }

  getContentWordWrap(): boolean | undefined {
    return Boolean(Number(this.storage.getItem('contentWordWrap') ?? undefined));
  }

  getExploreAllFiles(): boolean | undefined {
    return Boolean(Number(this.storage.getItem('exploreAllFiles') ?? undefined));
  }

  getExploreFileId(): string | undefined {
    return this.storage.getItem('exploreFileId') ?? undefined;
  }

  getExploreFolderId(): string | undefined {
    return this.storage.getItem('exploreFolderId') ?? undefined;
  }

  getTabOpen(): boolean | undefined {
    return Boolean(Number(this.storage.getItem('tabOpen') ?? true));
  }

  getTabType(): TabType | undefined {
    return Number(this.storage.getItem('tabType') ?? TabType.explorer);
  }

  getThemeName(): ThemeName | undefined {
    return Number(this.storage.getItem('themeName') ?? ThemeName.light);
  }

  setContentMinimap(value?: boolean): void {
    if (value != null) {
      this.storage.setItem('contentMinimap', String(Number(value)));
    } else {
      this.storage.removeItem('contentMinimap');
    }
  }

  setContentPreview(value?: boolean): void {
    if (value != null) {
      this.storage.setItem('contentPreview', String(Number(value)));
    } else {
      this.storage.removeItem('contentPreview');
    }
  }

  setContentScroll(value?: boolean): void {
    if (value != null) {
      this.storage.setItem('contentScroll', String(Number(value)));
    } else {
      this.storage.removeItem('contentScroll');
    }
  }

  setContentWordWrap(value?: boolean): void {
    if (value != null) {
      this.storage.setItem('contentWordWrap', String(Number(value)));
    } else {
      this.storage.removeItem('contentWordWrap');
    }
  }

  setExploreAllFiles(value?: boolean): void {
    if (value != null) {
      this.storage.setItem('exploreAllFiles', String(Number(value)));
    } else {
      this.storage.removeItem('exploreAllFiles');
    }
  }

  setExploreFileId(value?: string): void {
    if (value != null) {
      this.storage.setItem('exploreFileId', value);
    } else {
      this.storage.removeItem('exploreFileId');
    }
  }

  setExploreFolderId(value?: string): void {
    if (value != null) {
      this.storage.setItem('exploreFolderId', value);
    } else {
      this.storage.removeItem('exploreFolderId');
    }
  }

  setTabOpen(value?: boolean): void {
    if (value != null) {
      this.storage.setItem('tabOpen', String(Number(value)));
    } else {
      this.storage.removeItem('tabOpen');
    }
  }

  setTabType(value?: TabType): void {
    if (value != null) {
      this.storage.setItem('tabType', String(Number(value)));
    } else {
      this.storage.removeItem('tabType');
    }
  }

  setThemeName(value?: ThemeName): void {
    this.storage.setItem('themeName', String(Number(value)));
  }

}
