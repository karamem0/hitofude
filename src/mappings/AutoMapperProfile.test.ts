//
// Copyright (c) 2023-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import { DriveItem, DriveItemVersion } from '@microsoft/microsoft-graph-types';
import { File, FileVersion, Folder } from '../types/Model';
import { mapper } from './AutoMapperProfile';

beforeEach(() => {
  vi.clearAllMocks();
  vi.resetModules();
});

it('should convert DriveItem to File', () => {
  // Setup
  const param = {
    '@microsoft.graph.downloadUrl': 'https://m365x214355-my.sharepoint.com/personal/meganb_m365x214355_onmicrosoft_com/_layouts/15/download.aspx?UniqueId=5adb5f85-9453-4e1d-889b-7a72e76e214c&Translate=false&tempauth=v1.eyJzaXRlaWQiOiJkODIzMTJmOS1iMjNiLTRjYmMtOTVkNS0zZTBkOTRlNjhjMWUiLCJhcHBfZGlzcGxheW5hbWUiOiJhcGlzYW5kYm94cHJveHkiLCJhcHBpZCI6IjA1YjEwYTJkLTYyZGItNDIwYy04NjI2LTU1ZjNhNWU3ODY1YiIsImF1ZCI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMC9tMzY1eDIxNDM1NS1teS5zaGFyZXBvaW50LmNvbUBkY2QyMTlkZC1iYzY4LTRiOWItYmYwYi00YTMzYTc5NmJlMzUiLCJleHAiOiIxNzQ0MTYxNjk2In0.CgoKBHNuaWQSAjY0EgsIiprM2dDB-z0QBRoOMjAuMTkwLjE0NC4xNzAqLHJXOGFHck92ckUzbGc2bUZEeHVQQUNFeFJUZ1g2NGdpYkwyNmlWMGl6eDg9MKkBOAFCEKGSoZUzoAAAlxBRVhTEOzpKEGhhc2hlZHByb29mdG9rZW5yKTBoLmZ8bWVtYmVyc2hpcHwxMDAzYmZmZGEzODEzMWFmQGxpdmUuY29tegEyggESCd0Z0txovJtLEb8LSjOnlr41kgEFTWVnYW6aAQVCb3dlbqIBIm1lZ2FuYkBtMzY1eDIxNDM1NS5vbm1pY3Jvc29mdC5jb22qARAxMDAzQkZGREEzODEzMUFGsgFWbXlmaWxlcy5yZWFkIGdyb3VwLnJlYWQgYWxsc2l0ZXMucmVhZCBhbGxwcm9maWxlcy5yZWFkIGFsbHByb2ZpbGVzLnJlYWQgdGVybXN0b3JlLnJlYWTIAQE.98_0VuXaD1fwkqDhqlKpGFwTSPzEitJYd3wxh5tAKcI&ApiVersion=2.0',
    'createdDateTime': '2017-08-07T16:01:51Z',
    'file': {
      'mimeType': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    },
    'id': '01BYE5RZ4FL7NVUU4UDVHIRG32OLTW4IKM',
    'lastModifiedDateTime': '2017-08-07T16:01:51Z',
    'name': 'Annual Financial Report (DRAFT).docx',
    'parentReference': {
      'id': '01BYE5RZ56Y2GOVW7725BZO354PWSELRRZ'
    },
    'size': 1234,
    'webUrl': 'https://m365x214355-my.sharepoint.com/personal/meganb_m365x214355_onmicrosoft_com/_layouts/15/Doc.aspx?sourcedoc=%7B5ADB5F85-9453-4E1D-889B-7A72E76E214C%7D&file=Annual%20Financial%20Report%20(DRAFT).docx&action=default&mobileredirect=true'
  } as DriveItem;
  const expected = {
    baseName: 'Annual Financial Report (DRAFT)',
    createdDate: new Date('2017-08-07T16:01:51Z'),
    downloadUrl: 'https://m365x214355-my.sharepoint.com/personal/meganb_m365x214355_onmicrosoft_com/_layouts/15/download.aspx?UniqueId=5adb5f85-9453-4e1d-889b-7a72e76e214c&Translate=false&tempauth=v1.eyJzaXRlaWQiOiJkODIzMTJmOS1iMjNiLTRjYmMtOTVkNS0zZTBkOTRlNjhjMWUiLCJhcHBfZGlzcGxheW5hbWUiOiJhcGlzYW5kYm94cHJveHkiLCJhcHBpZCI6IjA1YjEwYTJkLTYyZGItNDIwYy04NjI2LTU1ZjNhNWU3ODY1YiIsImF1ZCI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMC9tMzY1eDIxNDM1NS1teS5zaGFyZXBvaW50LmNvbUBkY2QyMTlkZC1iYzY4LTRiOWItYmYwYi00YTMzYTc5NmJlMzUiLCJleHAiOiIxNzQ0MTYxNjk2In0.CgoKBHNuaWQSAjY0EgsIiprM2dDB-z0QBRoOMjAuMTkwLjE0NC4xNzAqLHJXOGFHck92ckUzbGc2bUZEeHVQQUNFeFJUZ1g2NGdpYkwyNmlWMGl6eDg9MKkBOAFCEKGSoZUzoAAAlxBRVhTEOzpKEGhhc2hlZHByb29mdG9rZW5yKTBoLmZ8bWVtYmVyc2hpcHwxMDAzYmZmZGEzODEzMWFmQGxpdmUuY29tegEyggESCd0Z0txovJtLEb8LSjOnlr41kgEFTWVnYW6aAQVCb3dlbqIBIm1lZ2FuYkBtMzY1eDIxNDM1NS5vbm1pY3Jvc29mdC5jb22qARAxMDAzQkZGREEzODEzMUFGsgFWbXlmaWxlcy5yZWFkIGdyb3VwLnJlYWQgYWxsc2l0ZXMucmVhZCBhbGxwcm9maWxlcy5yZWFkIGFsbHByb2ZpbGVzLnJlYWQgdGVybXN0b3JlLnJlYWTIAQE.98_0VuXaD1fwkqDhqlKpGFwTSPzEitJYd3wxh5tAKcI&ApiVersion=2.0',
    extension: '.docx',
    fullName: 'Annual Financial Report (DRAFT).docx',
    id: '01BYE5RZ4FL7NVUU4UDVHIRG32OLTW4IKM',
    mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    parentId: '01BYE5RZ56Y2GOVW7725BZO354PWSELRRZ',
    size: 1234,
    updatedDate: new Date('2017-08-07T16:01:51Z'),
    webUrl: 'https://m365x214355-my.sharepoint.com/personal/meganb_m365x214355_onmicrosoft_com/_layouts/15/Doc.aspx?sourcedoc=%7B5ADB5F85-9453-4E1D-889B-7A72E76E214C%7D&file=Annual%20Financial%20Report%20(DRAFT).docx&action=default&mobileredirect=true&web=1'
  } as File;
  // Execute
  const actual = mapper.map(param, 'DriveItem', 'File');
  // Assert
  expect(actual).toStrictEqual(expected);
});

it('should convert DriveItem to Folder', () => {
  // Setup
  const param = {
    'createdDateTime': '2017-07-31T18:56:29Z',
    'id': '01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K',
    'lastModifiedDateTime': '2017-07-31T18:56:29Z',
    'name': 'Attachments',
    'parentReference': {
      'id': '01BYE5RZ56Y2GOVW7725BZO354PWSELRRZ'
    },
    'webUrl': 'https://m365x214355-my.sharepoint.com/personal/meganb_m365x214355_onmicrosoft_com/Documents/Attachments'
  } as DriveItem;
  const expected = {
    createdDate: new Date('2017-07-31T18:56:29Z'),
    files: [],
    folders: [],
    id: '01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K',
    name: 'Attachments',
    parentId: '01BYE5RZ56Y2GOVW7725BZO354PWSELRRZ',
    root: false,
    updatedDate: new Date('2017-07-31T18:56:29Z'),
    webUrl: 'https://m365x214355-my.sharepoint.com/personal/meganb_m365x214355_onmicrosoft_com/Documents/Attachments'
  } as Folder;
  // Execute
  const actual = mapper.map(param, 'DriveItem', 'Folder');
  // Assert
  expect(actual).toStrictEqual(expected);
});

it('should convert DriveItemVersion to FileVersion', () => {
  // Setup
  const param = {
    'id': '1.0',
    'lastModifiedDateTime': '2017-08-07T16:01:51Z',
    'size': 22750
  } as DriveItemVersion;
  const expected = {
    id: '1.0',
    size: 22750,
    updatedDate: new Date('2017-08-07T16:01:51Z'),
    version: '1.0'
  } as FileVersion;
  // Execute
  const actual = mapper.map(param, 'DriveItemVersion', 'FileVersion');
  // Assert
  expect(actual).toStrictEqual(expected);
});
