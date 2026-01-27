//
// Copyright (c) 2023-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import Dexie from 'dexie';
import { DexieEntity } from '../types/Dexie';
import { Folder } from '../types/Model';

export class CacheRepository {

  private readonly database: Dexie;

  private readonly timeout: number;

  constructor(database: Dexie, timeout: number = import.meta.env.VITE_CACHE_TIMEOUT) {
    this.database = database;
    this.timeout = timeout;
  }

  async getFolder(id: string): Promise<Folder | undefined> {
    const value = await this.database.table<DexieEntity<Folder>>('folders').get(id);
    if (value == null) {
      return undefined;
    }
    if (value.expired >= Date.now()) {
      return value.value;
    }
    return undefined;
  }

  async setFolder(folder: Folder): Promise<void> {
    await this.database.table<DexieEntity<Folder>>('folders').put({
      expired: Date.now() + this.timeout * 1000,
      id: folder.id,
      value: folder
    });
  }

}
