//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import { TabMode, TabType, ThemeName } from '../types/Model';

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

  getTabMode(): TabMode | undefined {
    return {
      type: Number(this.storage.getItem('tabType') ?? TabType.explorer),
      open: Boolean(Number(this.storage.getItem('tabOpen') ?? true))
    };
  }

  getThemeName(): ThemeName | undefined {
    return Number(this.storage.getItem('themeName') ?? ThemeName.light);
  }

  setContentMinimap(value?: boolean): void {
    if (value) {
      this.storage.setItem('contentMinimap', String(Number(value)));
    } else {
      this.storage.removeItem('contentMinimap');
    }
  }

  setContentPreview(value?: boolean): void {
    if (value) {
      this.storage.setItem('contentPreview', String(Number(value)));
    } else {
      this.storage.removeItem('contentPreview');
    }
  }

  setContentWordWrap(value?: boolean): void {
    if (value) {
      this.storage.setItem('contentWordWrap', String(Number(value)));
    } else {
      this.storage.removeItem('contentWordWrap');
    }
  }

  setExploreAllFiles(value?: boolean): void {
    if (value) {
      this.storage.setItem('exploreAllFiles', String(Number(value)));
    } else {
      this.storage.removeItem('exploreAllFiles');
    }
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

  setTabMode(value?: TabMode): void {
    if (value) {
      this.storage.setItem('tabType', String(Number(value.type)));
      this.storage.setItem('tabOpen', String(Number(value.open)));
    } else {
      this.storage.removeItem('tabType');
      this.storage.removeItem('tabOpen');
    }
  }

  setThemeName(value?: ThemeName): void {
    this.storage.setItem('themeName', String(Number(value)));
  }

}
