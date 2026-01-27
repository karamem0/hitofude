//
// Copyright (c) 2023-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import Dexie from 'dexie';

export const database = new Dexie('hitofude');

database.version(1).stores({
  folders: '&id, expired, value'
});
