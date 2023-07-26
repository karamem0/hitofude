//
// Copyright (c) 2023 karamem0
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
import { DriveItem, DriveItemVersion } from '@microsoft/microsoft-graph-types';

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
import { isMimeType } from '../utils/File';

export class GraphService {

  private readonly client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  async createFile(folder: Pick<Folder, 'id'>, name: string, content?: string): Promise<File> {
    try {
      const data = await this.client
        .api(`/me/drive/items/${folder.id}:/${name}:/content?@microsoft.graph.conflictBehavior=fail`)
        .put(content ?? '');
      const value = data as DriveItem;
      return mapper.map(value, 'DriveItem', 'File');
    } catch (e) {
      if (e instanceof GraphError) {
        if (e.statusCode === 409) {
          throw new FileConflictError(e.message);
        }
      }
      throw e;
    }
  }

  async createFolder(folder: Pick<Folder, 'id'>, name: string): Promise<Folder> {
    try {
      const data = await this.client
        .api(`/me/drive/items/${folder.id}/children`)
        .post({
          name,
          folder: {},
          '@microsoft.graph.conflictBehavior': 'fail'
        });
      const value = data as DriveItem;
      return mapper.map(value, 'DriveItem', 'Folder');
    } catch (e) {
      if (e instanceof GraphError) {
        if (e.statusCode === 409) {
          throw new FileConflictError(e.message);
        }
      }
      throw e;
    }
  }

  async deleteExploreFile(file: Pick<File, 'id'>): Promise<void> {
    try {
      await this.client
        .api(`/me/drive/items/${file.id}`)
        .delete();
    } catch (e) {
      if (e instanceof GraphError) {
        if (e.statusCode === 404) {
          throw new FileNotFoundError(e.message);
        }
      }
      throw e;
    }
  }

  async deleteExploreFolder(file: Pick<Folder, 'id'>): Promise<void> {
    try {
      await this.client
        .api(`/me/drive/items/${file.id}`)
        .delete();
    } catch (e) {
      if (e instanceof GraphError) {
        if (e.statusCode === 404) {
          throw new FolderNotFoundError(e.message);
        }
      }
      throw e;
    }
  }

  async getFileById(id: string): Promise<File> {
    try {
      const data = await this.client
        .api(`/me/drive/items/${id}`)
        .get();
      const value = data as DriveItem;
      if (value.file == null) {
        throw new FileNotFoundError();
      }
      return mapper.map(value, 'DriveItem', 'File');
    } catch (e) {
      if (e instanceof GraphError) {
        if (e.statusCode === 400 ||
            e.statusCode === 404) {
          throw new FileNotFoundError(e.message);
        }
      }
      throw e;
    }
  }

  async getFileByUrl(path: string): Promise<File> {
    try {
      const data = await this.client
        .api(`/me/drive/root:/${path}`)
        .get();
      const value = data as DriveItem;
      if (value.file == null) {
        throw new FileNotFoundError();
      }
      return mapper.map(value, 'DriveItem', 'File');
    } catch (e) {
      if (e instanceof GraphError) {
        if (e.statusCode === 400 ||
            e.statusCode === 404) {
          throw new FileNotFoundError(e.message);
        }
      }
      throw e;
    }
  }

  async getFileText(file: Pick<File, 'mimeType' | 'downloadUrl'>): Promise<string> {
    try {
      if (isMimeType(file, { type: 'text' })) {
        const downloadUrl = typeof (file) === 'string' ? file : file.downloadUrl;
        if (downloadUrl == null) {
          throw new FileNotFoundError();
        }
        const data = await fetch(downloadUrl, { method: 'GET' });
        const value = await data.text();
        return value;
      } else {
        return '';
      }
    } catch (e) {
      if (e instanceof GraphError) {
        if (e.statusCode === 404) {
          throw new FileNotFoundError(e.message);
        }
      }
      throw e;
    }
  }

  async getFileVersions(id: string): Promise<FileVersion[]> {
    try {
      const data = await this.client
        .api(`/me/drive/items/${id}/versions`)
        .get();
      const value = data.value as DriveItemVersion[];
      return mapper
        .mapArray<DriveItemVersion, FileVersion>(value, 'DriveItemVersion', 'FileVersion')
        .map((item) => ({
          ...item,
          id
        }));
    } catch (e) {
      if (e instanceof GraphError) {
        if (e.statusCode === 400 ||
            e.statusCode === 404) {
          throw new FileNotFoundError(e.message);
        }
      }
      throw e;
    }
  }

  async getFolderById(id: string): Promise<Folder> {
    try {
      const data = await this.client
        .api(`/me/drive/items/${id}?$expand=children`)
        .get();
      const value = data as DriveItem;
      if (value.folder == null) {
        throw new FolderNotFoundError();
      }
      return mapper.map(value, 'DriveItem', 'Folder');
    } catch (e) {
      if (e instanceof GraphError) {
        if (e.statusCode === 400 ||
            e.statusCode === 404) {
          throw new FolderNotFoundError(e.message);
        }
      }
      throw e;
    }
  }

  async getPhoto(): Promise<string> {
    try {
      const data = await this.client
        .api('/me/photo/$value')
        .responseType(ResponseType.BLOB)
        .get();
      const value = data as Blob;
      return URL.createObjectURL(value);
    } catch (e) {
      if (e instanceof GraphError) {
        if (e.statusCode === 404) {
          throw new FileNotFoundError(e.message);
        }
      }
      throw e;
    }
  }

  async getRootFolder(): Promise<Folder> {
    try {
      const data = await this.client
        .api('/me/drive/items/root:/?$expand=children')
        .get();
      const value = data as DriveItem;
      if (value.folder == null) {
        throw new GraphError(404);
      }
      return mapper.map(value, 'DriveItem', 'Folder');
    } catch (e) {
      if (e instanceof GraphError) {
        if (e.statusCode === 400 ||
            e.statusCode === 404) {
          throw new FolderNotFoundError(e.message);
        }
      }
      throw e;
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
    } catch (e) {
      if (e instanceof GraphError) {
        if (e.statusCode === 400 ||
            e.statusCode === 404) {
          throw new FileNotFoundError(e.message);
        }
        if (e.statusCode === 409) {
          throw new FileConflictError(e.message);
        }
      }
      throw e;
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
    } catch (e) {
      if (e instanceof GraphError) {
        if (e.statusCode === 400 ||
            e.statusCode === 404) {
          throw new FolderNotFoundError(e.message);
        }
        if (e.statusCode === 409) {
          throw new FolderConflictError(e.message);
        }
      }
      throw e;
    }
  }

  async restoreFile(file: Pick<FileVersion, 'id' | 'version'>): Promise<void> {
    try {
      await this.client
        .api(`/me/drive/items/${file.id}/versions/${file.version}/restoreVersion`)
        .post(null);
    } catch (e) {
      if (e instanceof GraphError) {
        if (e.statusCode === 404) {
          throw new FileNotFoundError(e.message);
        }
      }
      throw e;
    }
  }

  async searchResults(query: string): Promise<File[]> {
    try {
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
    } catch (e) {
      if (e instanceof GraphError) {
        if (e.statusCode === 400 ||
            e.statusCode === 404) {
          throw new FileNotFoundError(e.message);
        }
      }
      throw e;
    }
  }

  async setFileContent(file: File, content: string): Promise<File> {
    try {
      const data = await this.client
        .api(`/me/drive/items/${file.id}/content`)
        .put(content);
      const value = data as DriveItem;
      return mapper.map(value, 'DriveItem', 'File');
    } catch (e) {
      if (e instanceof GraphError) {
        if (e.statusCode === 400 ||
            e.statusCode === 404) {
          throw new FileNotFoundError(e.message);
        }
        if (e.statusCode === 409) {
          throw new FileConflictError(e.message);
        }
      }
      throw e;
    }
  }

}
