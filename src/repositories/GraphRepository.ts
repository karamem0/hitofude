//
// Copyright (c) 2023-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import {
  Client,
  GraphError,
  PageIterator,
  ResponseType
} from '@microsoft/microsoft-graph-client';
import {
  DriveItem,
  DriveItemVersion,
  ItemPreviewInfo
} from '@microsoft/microsoft-graph-types';
import { mapper } from '../mappings/AutoMapperProfile';
import {
  FileConflictError,
  FileNotFoundError,
  FolderConflictError,
  FolderNotFoundError
} from '../types/Error';
import {
  File,
  FileVersion,
  Folder
} from '../types/Model';

export class GraphRepository {

  private readonly client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  async copyFile(file: Pick<File, 'id'>, name: string): Promise<File> {
    try {
      const data = await this.client
        .api(`/me/drive/items/${file.id}/copy?@microsoft.graph.conflictBehavior=fail`)
        .responseType(ResponseType.RAW)
        .post({
          name
        });
      const location = data.headers.get('location');
      while (true) {
        const response = await fetch(location, { method: 'GET' });
        if (response.ok) {
          const json = await response.json();
          if (json.status === 'completed') {
            return await this.getFileById(json.resourceId);
          } else {
            await new Promise((resolve) => setTimeout(resolve, 250));
          }
        } else {
          throw new GraphError(response.status, response.statusText);
        }
      }
    } catch (error) {
      if (error instanceof GraphError && [ 409 ].includes(error.statusCode)) {
        throw new FileConflictError(error.message);
      }
      throw error;
    }
  }

  async createFile(folder: Pick<Folder, 'id'>, name: string, content?: Blob): Promise<File> {
    try {
      const data = await this.client
        .api(`/me/drive/items/${folder.id}:/${name}:/content?@microsoft.graph.conflictBehavior=fail`)
        .put(content ?? '');
      const value = data as DriveItem;
      return mapper.map(value, 'DriveItem', 'File');
    } catch (error) {
      if (error instanceof GraphError && [ 409 ].includes(error.statusCode)) {
        throw new FileConflictError(error.message);
      }
      throw error;
    }
  }

  async createFolder(folder: Pick<Folder, 'id'>, name: string): Promise<Folder> {
    try {
      const data = await this.client
        .api(`/me/drive/items/${folder.id}/children`)
        .post({
          '@microsoft.graph.conflictBehavior': 'fail',
          'folder': {},
          name
        });
      const value = data as DriveItem;
      return mapper.map(value, 'DriveItem', 'Folder');
    } catch (error) {
      if (error instanceof GraphError && [ 409 ].includes(error.statusCode)) {
        throw new FolderConflictError(error.message);
      }
      throw error;
    }
  }

  async deleteFile(file: Pick<File, 'id'>): Promise<void> {
    try {
      await this.client
        .api(`/me/drive/items/${file.id}`)
        .delete();
    } catch (error) {
      if (error instanceof GraphError && [ 404 ].includes(error.statusCode)) {
        throw new FileNotFoundError(error.message);
      }
      throw error;
    }
  }

  async deleteFolder(folder: Pick<Folder, 'id'>): Promise<void> {
    try {
      await this.client
        .api(`/me/drive/items/${folder.id}`)
        .delete();
    } catch (error) {
      if (error instanceof GraphError && [ 404 ].includes(error.statusCode)) {
        throw new FolderNotFoundError(error.message);
      }
      throw error;
    }
  }

  async getFileById(id: string): Promise<File> {
    try {
      const data = await this.client
        .api(`/me/drive/items/${id}`)
        .select('content.downloadUrl,createdDateTime,file,id,lastModifiedDateTime,name,size,parentReference,webUrl')
        .get();
      const value = data as DriveItem;
      if (value.file == null) {
        throw new FileNotFoundError();
      }
      return mapper.map(value, 'DriveItem', 'File');
    } catch (error) {
      if (error instanceof GraphError && [ 400, 404 ].includes(error.statusCode)) {
        throw new FileNotFoundError(error.message);
      }
      throw error;
    }
  }

  async getFileByUrl(url: string): Promise<File> {
    try {
      const data = await this.client
        .api(`/me/drive/root:/${url}`)
        .select('content.downloadUrl,createdDateTime,file,id,lastModifiedDateTime,name,size,parentReference,webUrl')
        .get();
      const value = data as DriveItem;
      if (value.file == null) {
        throw new FileNotFoundError();
      }
      return mapper.map(value, 'DriveItem', 'File');
    } catch (error) {
      if (error instanceof GraphError && [ 400, 404 ].includes(error.statusCode)) {
        throw new FileNotFoundError(error.message);
      }
      throw error;
    }
  }

  async getFilePreviewUrl(file: Pick<File, 'id'>): Promise<string> {
    try {
      const data = await this.client
        .api(`/me/drive/items/${file.id}/preview`)
        .post({});
      const value = data as ItemPreviewInfo;
      const previewUrl = value.getUrl;
      if (previewUrl == null) {
        throw new FileNotFoundError();
      }
      return previewUrl;
    } catch (error) {
      if (error instanceof GraphError && [ 400, 404 ].includes(error.statusCode)) {
        throw new FileNotFoundError(error.message);
      }
      throw error;
    }
  }

  async getFileText(file: Pick<File, 'mimeType' | 'downloadUrl'>): Promise<string> {
    try {
      const downloadUrl = file.downloadUrl;
      if (downloadUrl == null) {
        throw new FileNotFoundError();
      }
      return await Promise.resolve()
        .then(() => fetch(downloadUrl, { method: 'GET' }))
        .then((response) => response.text());
    } catch (error) {
      if (error instanceof GraphError && [ 404 ].includes(error.statusCode)) {
        throw new FileNotFoundError(error.message);
      }
      throw error;
    }
  }

  async getFileVersions(file: Pick<File, 'id'>): Promise<FileVersion[]> {
    try {
      const data = await this.client
        .api(`/me/drive/items/${file.id}/versions`)
        .get();
      const value = data.value as DriveItemVersion[];
      return mapper
        .mapArray<DriveItemVersion, FileVersion>(value, 'DriveItemVersion', 'FileVersion')
        .map((item) => ({
          ...item,
          id: file.id
        }));
    } catch (error) {
      if (error instanceof GraphError && [ 400, 404 ].includes(error.statusCode)) {
        throw new FileNotFoundError(error.message);
      }
      throw error;
    }
  }

  async getFolderById(id: string): Promise<Folder> {
    try {
      const data = await this.client
        .api(`/me/drive/items/${id}`)
        .expand('children($select=content.downloadUrl,createdDateTime,file,folder,id,lastModifiedDateTime,name,parentReference,root,size,webUrl)')
        .select('createdDateTime,folder,id,lastModifiedDateTime,name,parentReference,root,webUrl')
        .get();
      const value = data as DriveItem;
      if (value.folder == null) {
        throw new FolderNotFoundError();
      }
      return mapper.map(value, 'DriveItem', 'Folder');
    } catch (error) {
      if (error instanceof GraphError && [ 400, 404 ].includes(error.statusCode)) {
        throw new FolderNotFoundError(error.message);
      }
      throw error;
    }
  }

  async getMyPhoto(): Promise<string> {
    try {
      const data = await this.client
        .api('/me/photo/$value')
        .responseType(ResponseType.BLOB)
        .get();
      const value = data as Blob;
      return URL.createObjectURL(value);
    } catch (error) {
      if (error instanceof GraphError && [ 404 ].includes(error.statusCode)) {
        throw new FileNotFoundError(error.message);
      }
      throw error;
    }
  }

  async getRootFolder(): Promise<Folder> {
    try {
      const data = await this.client
        .api('/me/drive/items/root:/')
        .expand('children($select=content.downloadUrl,createdDateTime,file,folder,id,lastModifiedDateTime,name,parentReference,root,size,webUrl)')
        .select('createdDateTime,folder,id,lastModifiedDateTime,name,parentReference,root,webUrl')
        .get();
      const value = data as DriveItem;
      if (value.folder == null) {
        throw new GraphError(404);
      }
      return mapper.map(value, 'DriveItem', 'Folder');
    } catch (error) {
      if (error instanceof GraphError && [ 400, 404 ].includes(error.statusCode)) {
        throw new FolderNotFoundError(error.message);
      }
      throw error;
    }
  }

  async renameFile(file: Pick<File, 'id'>, name: string): Promise<File> {
    try {
      const data = await this.client
        .api(`/me/drive/items/${file.id}`)
        .patch({
          name
        });
      const value = data as DriveItem;
      return mapper.map(value, 'DriveItem', 'File');
    } catch (error) {
      if (error instanceof GraphError && [ 400, 404 ].includes(error.statusCode)) {
        throw new FileNotFoundError(error.message);
      }
      if (error instanceof GraphError && [ 409 ].includes(error.statusCode)) {
        throw new FileConflictError(error.message);
      }
      throw error;
    }
  }

  async renameFolder(folder: Pick<Folder, 'id'>, name: string): Promise<Folder> {
    try {
      const data = await this.client
        .api(`/me/drive/items/${folder.id}`)
        .patch({
          name
        });
      const value = data as DriveItem;
      return mapper.map(value, 'DriveItem', 'Folder');
    } catch (error) {
      if (error instanceof GraphError && [ 400, 404 ].includes(error.statusCode)) {
        throw new FileNotFoundError(error.message);
      }
      if (error instanceof GraphError && [ 409 ].includes(error.statusCode)) {
        throw new FolderConflictError(error.message);
      }
      throw error;
    }
  }

  async restoreFile(file: Pick<FileVersion, 'id' | 'version'>): Promise<void> {
    try {
      await this.client
        .api(`/me/drive/items/${file.id}/versions/${file.version}/restoreVersion`)
        .post(null);
    } catch (error) {
      if (error instanceof GraphError && [ 404 ].includes(error.statusCode)) {
        throw new FileNotFoundError(error.message);
      }
      throw error;
    }
  }

  async searchFiles(query: string): Promise<File[]> {
    try {
      if (query == null || query.length === 0) {
        return [];
      }
      const data = await this.client
        .api(`/me/drive/root/search(q='${query}')`)
        .get();
      const array: DriveItem[] = [];
      const iterator = new PageIterator(
        this.client,
        data,
        (value) => Boolean(array.push(value)));
      await iterator.iterate();
      return mapper
        .mapArray<DriveItem, File>(
          array.filter((item) => item.file),
          'DriveItem',
          'File'
        );
    } catch (error) {
      if (error instanceof GraphError && [ 400, 404 ].includes(error.statusCode)) {
        throw new FileNotFoundError(error.message);
      }
      throw error;
    }
  }

  async setFileContent(file: Pick<File, 'id'>, content: Blob): Promise<File> {
    try {
      const data = await this.client
        .api(`/me/drive/items/${file.id}/content`)
        .put(content);
      const value = data as DriveItem;
      return mapper.map(value, 'DriveItem', 'File');
    } catch (error) {
      if (error instanceof GraphError && [ 400, 404 ].includes(error.statusCode)) {
        throw new FileNotFoundError(error.message);
      }
      if (error instanceof GraphError && [ 409 ].includes(error.statusCode)) {
        throw new FileConflictError(error.message);
      }
      throw error;
    }
  }

}
