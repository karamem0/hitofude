//
// Copyright (c) 2023-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import { TabType, ThemeName } from '../types/Model';

export class StorageService {

  private readonly storage: Storage;

  private readonly accountId: string;

  private readonly tenantId: string;

  constructor(storage: Storage = localStorage, accountId: string, tenantId: string) {
    this.storage = storage;
    this.accountId = accountId;
    this.tenantId = tenantId;
  }

  getContentShowMinimap(): boolean | undefined {
    return Boolean(Number(this.storage.getItem(`${this.accountId}.${this.tenantId}.contentShowMinimap`) ?? undefined));
  }

  getContentShowPreview(): boolean | undefined {
    return Boolean(Number(this.storage.getItem(`${this.accountId}.${this.tenantId}.contentShowPreview`) ?? undefined));
  }

  getContentSyncScroll(): boolean | undefined {
    return Boolean(Number(this.storage.getItem(`${this.accountId}.${this.tenantId}.contentSyncScroll`) ?? undefined));
  }

  getContentWordWrap(): boolean | undefined {
    return Boolean(Number(this.storage.getItem(`${this.accountId}.${this.tenantId}.contentWordWrap`) ?? undefined));
  }

  getExplorerAllFiles(): boolean | undefined {
    return Boolean(Number(this.storage.getItem(`${this.accountId}.${this.tenantId}.explorerAllFiles`) ?? undefined));
  }

  getExplorerFileId(): string | undefined {
    return this.storage.getItem(`${this.accountId}.${this.tenantId}.explorerFileId`) ?? undefined;
  }

  getExplorerFolderId(): string | undefined {
    return this.storage.getItem(`${this.accountId}.${this.tenantId}.explorerFolderId`) ?? undefined;
  }

  getTabOpen(): boolean | undefined {
    return Boolean(Number(this.storage.getItem(`${this.accountId}.${this.tenantId}.tabOpen`) ?? true));
  }

  getTabType(): TabType | undefined {
    return Number(this.storage.getItem(`${this.accountId}.${this.tenantId}.tabType`) ?? TabType.explorer);
  }

  getThemeName(): ThemeName | undefined {
    return Number(this.storage.getItem(`${this.accountId}.${this.tenantId}.themeName`) ?? ThemeName.light);
  }

  setContentShowMinimap(value?: boolean): void {
    if (value != null) {
      this.storage.setItem(`${this.accountId}.${this.tenantId}.contentShowMinimap`, String(Number(value)));
    } else {
      this.storage.removeItem(`${this.accountId}.${this.tenantId}.contentShowMinimap`);
    }
  }

  setContentShowPreview(value?: boolean): void {
    if (value != null) {
      this.storage.setItem(`${this.accountId}.${this.tenantId}.contentShowPreview`, String(Number(value)));
    } else {
      this.storage.removeItem(`${this.accountId}.${this.tenantId}.contentShowPreview`);
    }
  }

  setContentSyncScroll(value?: boolean): void {
    if (value != null) {
      this.storage.setItem(`${this.accountId}.${this.tenantId}.contentSyncScroll`, String(Number(value)));
    } else {
      this.storage.removeItem(`${this.accountId}.${this.tenantId}.contentSyncScroll`);
    }
  }

  setContentWordWrap(value?: boolean): void {
    if (value != null) {
      this.storage.setItem(`${this.accountId}.${this.tenantId}.contentWordWrap`, String(Number(value)));
    } else {
      this.storage.removeItem(`${this.accountId}.${this.tenantId}.contentWordWrap`);
    }
  }

  setExplorerAllFiles(value?: boolean): void {
    if (value != null) {
      this.storage.setItem(`${this.accountId}.${this.tenantId}.explorerAllFiles`, String(Number(value)));
    } else {
      this.storage.removeItem(`${this.accountId}.${this.tenantId}.explorerAllFiles`);
    }
  }

  setExplorerFileId(value?: string): void {
    if (value != null) {
      this.storage.setItem(`${this.accountId}.${this.tenantId}.explorerFileId`, value);
    } else {
      this.storage.removeItem(`${this.accountId}.${this.tenantId}.explorerFileId`);
    }
  }

  setExplorerFolderId(value?: string): void {
    if (value != null) {
      this.storage.setItem(`${this.accountId}.${this.tenantId}.explorerFolderId`, value);
    } else {
      this.storage.removeItem(`${this.accountId}.${this.tenantId}.explorerFolderId`);
    }
  }

  setTabOpen(value?: boolean): void {
    if (value != null) {
      this.storage.setItem(`${this.accountId}.${this.tenantId}.tabOpen`, String(Number(value)));
    } else {
      this.storage.removeItem(`${this.accountId}.${this.tenantId}.tabOpen`);
    }
  }

  setTabType(value?: TabType): void {
    if (value != null) {
      this.storage.setItem(`${this.accountId}.${this.tenantId}.tabType`, String(Number(value)));
    } else {
      this.storage.removeItem(`${this.accountId}.${this.tenantId}.tabType`);
    }
  }

  setThemeName(value?: ThemeName): void {
    if (value != null) {
      this.storage.setItem(`${this.accountId}.${this.tenantId}.themeName`, String(Number(value)));
    } else {
      this.storage.removeItem(`${this.accountId}.${this.tenantId}.themeName`);
    }
  }

}
