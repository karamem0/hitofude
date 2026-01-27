//
// Copyright (c) 2023-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import { CacheRepository } from '../repositories/CacheRepository';
import { GraphRepository } from '../repositories/GraphRepository';
import { FolderNotFoundError } from '../types/Error';
import {
  File,
  FileVersion,
  Folder
} from '../types/Model';

export class GraphService {

  private readonly cache: CacheRepository;

  private readonly graph: GraphRepository;

  constructor(cache: CacheRepository, graph: GraphRepository) {
    this.cache = cache;
    this.graph = graph;
  }

  async copyFile(file: Pick<File, 'id'>, name: string): Promise<File> {
    const value = await this.graph.copyFile(file, name);
    if (value.parentId == null) {
      throw new FolderNotFoundError();
    }
    await this.cache.setFolder(await this.graph.getFolderById(value.parentId));
    return value;
  }

  async createFile(folder: Pick<Folder, 'id'>, name: string, content?: Blob): Promise<File> {
    const value = await this.graph.createFile(folder, name, content);
    if (value.parentId == null) {
      throw new FolderNotFoundError();
    }
    await this.cache.setFolder(await this.graph.getFolderById(value.parentId));
    return value;
  }

  async createFolder(folder: Pick<Folder, 'id'>, name: string): Promise<Folder> {
    const value = await this.graph.createFolder(folder, name);
    if (value.parentId == null) {
      throw new FolderNotFoundError();
    }
    await this.cache.setFolder(await this.graph.getFolderById(value.parentId));
    return value;
  }

  async deleteFile(file: Pick<File, 'id' | 'parentId'>): Promise<void> {
    await this.graph.deleteFile(file);
    if (file.parentId == null) {
      throw new FolderNotFoundError();
    }
    await this.cache.setFolder(await this.graph.getFolderById(file.parentId));
  }

  async deleteFolder(folder: Pick<Folder, 'id' | 'parentId'>): Promise<void> {
    await this.graph.deleteFolder(folder);
    if (folder.parentId == null) {
      throw new FolderNotFoundError();
    }
    await this.cache.setFolder(await this.graph.getFolderById(folder.parentId));
  }

  async getFileById(id: string): Promise<File> {
    return await this.graph.getFileById(id);
  }

  async getFileByUrl(url: string): Promise<File> {
    return await this.graph.getFileByUrl(url);
  }

  async getFilePreviewUrl(file: Pick<File, 'id'>): Promise<string> {
    return await this.graph.getFilePreviewUrl(file);
  }

  async getFileText(file: Pick<File, 'mimeType' | 'downloadUrl'>): Promise<string> {
    return await this.graph.getFileText(file);
  }

  async getFileVersions(file: Pick<File, 'id'>): Promise<FileVersion[]> {
    return await this.graph.getFileVersions(file);
  }

  async getFolderById(id: string, force: boolean = false): Promise<Folder> {
    if (!force) {
      const cacheValue = await this.cache.getFolder(id);
      if (cacheValue != null) {
        return cacheValue;
      }
    }
    const graphValue = await this.graph.getFolderById(id);
    await this.cache.setFolder(graphValue);
    return graphValue;
  }

  async getMyPhoto(): Promise<string> {
    return await this.graph.getMyPhoto();
  }

  async getRootFolder(): Promise<Folder> {
    return await this.graph.getRootFolder();
  }

  async renameFile(file: Pick<File, 'id'>, name: string): Promise<File> {
    const value = await this.graph.renameFile(file, name);
    if (value.parentId == null) {
      throw new FolderNotFoundError();
    }
    await this.cache.setFolder(await this.graph.getFolderById(value.parentId));
    return value;
  }

  async renameFolder(folder: Pick<Folder, 'id'>, name: string): Promise<Folder> {
    const value = await this.graph.renameFolder(folder, name);
    if (value.parentId == null) {
      throw new FolderNotFoundError();
    }
    await this.cache.setFolder(await this.graph.getFolderById(value.parentId));
    return value;
  }

  async restoreFile(file: Pick<FileVersion, 'id' | 'version'>): Promise<void> {
    await this.graph.restoreFile(file);
  }

  async searchFiles(query: string): Promise<File[]> {
    return await this.graph.searchFiles(query);
  }

  async setFileContent(file: Pick<File, 'id'>, content: Blob): Promise<File> {
    return await this.graph.setFileContent(file, content);
  }

}
