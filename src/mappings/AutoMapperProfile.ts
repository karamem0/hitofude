//
// Copyright (c) 2023-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import {
  createMap,
  createMapper,
  forMember,
  mapFrom
} from '@automapper/core';
import { PojosMetadataMap, pojos } from '@automapper/pojos';
import { DriveItem, DriveItemVersion } from '@microsoft/microsoft-graph-types';
import {
  File,
  FileVersion,
  Folder
} from '../types/Model';
import { toDate } from '../utils/Date';
import {
  getBaseName,
  getExtension,
  getMimeType
} from '../utils/File';

export const mapper = createMapper({
  strategyInitializer: pojos()
});

PojosMetadataMap.create<DriveItem>('DriveItem', {
  createdDateTime: String,
  id: String,
  lastModifiedDateTime: String,
  name: String,
  size: Number,
  webUrl: String
});

PojosMetadataMap.create<DriveItemVersion>('DriveItemVersion', {
  id: String,
  lastModifiedDateTime: String,
  size: Number
});

PojosMetadataMap.create<File>('File', {
  baseName: String,
  createdDate: Date,
  downloadUrl: String,
  extension: String,
  fullName: String,
  id: String,
  mimeType: 'MimeType',
  parentId: String,
  size: Number,
  updatedDate: Date,
  webUrl: String
});

PojosMetadataMap.create<FileVersion>('FileVersion', {
  id: String,
  size: Number,
  updatedDate: Date,
  version: String
});

PojosMetadataMap.create<Folder>('Folder', {
  createdDate: Date,
  files: [ 'File' ],
  folders: [ 'Folder' ],
  id: String,
  name: String,
  parentId: String,
  updatedDate: Date,
  webUrl: String
});

createMap<DriveItem, File>(
  mapper,
  'DriveItem',
  'File',
  forMember(
    (target) => target.fullName,
    mapFrom((source) => source.name)),
  forMember(
    (target) => target.baseName,
    mapFrom((source) => getBaseName(source.name))),
  forMember(
    (target) => target.extension,
    mapFrom((source) => getExtension(source.name))),
  forMember(
    (target) => target.mimeType,
    mapFrom((source) => getMimeType(source.name, source.file?.mimeType))),
  forMember(
    (target) => target.createdDate,
    mapFrom((source) => toDate(source.createdDateTime))),
  forMember(
    (target) => target.updatedDate,
    mapFrom((source) => toDate(source.lastModifiedDateTime))),
  forMember(
    (target) => target.webUrl,
    mapFrom((source) => {
      if (source.webUrl == null) {
        return undefined;
      }
      return source.webUrl + (source.webUrl.indexOf('?') < 0 ? '?web=1' : '&web=1');
    })),
  forMember(
    (target) => target.downloadUrl,
    mapFrom((source) => (source as Record<string, string>)['@microsoft.graph.downloadUrl'])
  ),
  forMember(
    (target) => target.parentId,
    mapFrom((source) => source.parentReference?.id))
);

createMap<DriveItem, Folder>(
  mapper,
  'DriveItem',
  'Folder',
  forMember(
    (target) => target.createdDate,
    mapFrom((source) => toDate(source.createdDateTime))),
  forMember(
    (target) => target.updatedDate,
    mapFrom((source) => toDate(source.lastModifiedDateTime))),
  forMember(
    (target) => target.root,
    mapFrom((source) => !!source.root)),
  forMember(
    (target) => target.parentId,
    mapFrom((source) => source.parentReference?.id)),
  forMember(
    (target) => target.files,
    mapFrom((source) => source.children ? (
      mapper.mapArray<DriveItem, File>(
        source.children.filter((item) => item.file),
        'DriveItem',
        'File'
      )
    ) : [])),
  forMember(
    (target) => target.folders,
    mapFrom((source) => source.children ? (
      mapper.mapArray<DriveItem, Folder>(
        source.children.filter((item) => item.folder),
        'DriveItem',
        'Folder'
      )
    ) : []))
);

createMap<DriveItemVersion, FileVersion>(
  mapper,
  'DriveItemVersion',
  'FileVersion',
  forMember(
    (target) => target.version,
    mapFrom((source) => source.id)),
  forMember(
    (target) => target.updatedDate,
    mapFrom((source) => toDate(source.lastModifiedDateTime)))
);
