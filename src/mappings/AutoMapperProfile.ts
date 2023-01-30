//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import {
  createMap,
  createMapper,
  forMember,
  fromValue,
  mapFrom
} from '@automapper/core';
import { pojos, PojosMetadataMap } from '@automapper/pojos';
import { DriveItem } from '@microsoft/microsoft-graph-types';

import { Folder, File } from '../types/Model';
import { toDate } from '../utils/Date';
import { getBaseName } from '../utils/File';

export const mapper = createMapper({
  strategyInitializer: pojos()
});

PojosMetadataMap.create<DriveItem>('DriveItem', {
  id: String,
  name: String,
  createdDateTime: String,
  lastModifiedDateTime: String,
  webUrl: String
});

PojosMetadataMap.create<File>('File', {
  id: String,
  name: String,
  createdDate: Date,
  updatedDate: Date,
  parentId: String
});

PojosMetadataMap.create<Folder>('Folder', {
  id: String,
  name: String,
  createdDate: Date,
  updatedDate: Date,
  webUrl: String,
  parentId: String,
  folders: [ 'Folder' ],
  files: [ 'File' ]
});

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
        source.children.filter((item) => item.file && item.name?.endsWith('.md')),
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

createMap<DriveItem, File>(
  mapper,
  'DriveItem',
  'File',
  forMember(
    (target) => target.name,
    mapFrom((source) => getBaseName(source.name))),
  forMember(
    (target) => target.createdDate,
    mapFrom((source) => toDate(source.createdDateTime))),
  forMember(
    (target) => target.updatedDate,
    mapFrom((source) => toDate(source.lastModifiedDateTime))),
  forMember(
    (target) => target.parentId,
    mapFrom((source) => source.parentReference?.id)),
  forMember(
    (target) => target.downloadUrl,
    mapFrom((source) => (source as Record<string, string>)['@microsoft.graph.downloadUrl'])
  ),
  forMember(
    (target) => target.editing,
    fromValue(false)
  )
);
