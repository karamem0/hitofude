//
// Copyright (c) 2023-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import { StorageService } from '../services/StorageService';
import { File, Folder } from '../types/Model';
import { State } from '../types/Store';
import { appendExplorerFile, appendExplorerFolder } from './Action';
import { reducer } from './Reducer';

beforeEach(() => {
  vi.clearAllMocks();
  vi.resetModules();
});

describe('appendExplorerFile', () => {

  it('should update the state', () => {
    // Setup
    const param = {
      accountId: '3a2bc284-f11c-4676-a9e1-6310eea60f26',
      data: {
        baseName: 'qux',
        id: 'qux'
      } as File,
      state: {
        explorerProps: {
          selectedFile: {
            baseName: 'foo',
            id: 'foo'
          },
          selectedFolder: {
            files: [
              {
                baseName: 'baz',
                id: 'baz'
              }
            ],
            id: 'bar',
            name: 'bar'
          }
        }
      } as State,
      storage: {} as unknown as Storage,
      tenantId: 'dd172b04-e4e2-4084-885c-47c9cc57f059'
    };
    const expected = {
      explorerProps: {
        selectedFile: {
          baseName: 'qux',
          id: 'qux'
        },
        selectedFolder: {
          files: [
            {
              baseName: 'baz',
              id: 'baz'
            },
            {
              baseName: 'qux',
              id: 'qux'
            }
          ],
          id: 'bar',
          name: 'bar'
        }
      }
    } as State;
    // Execute
    const target = reducer(new StorageService(param.storage, param.accountId, param.tenantId));
    const actual = target(param.state, appendExplorerFile(param.data));
    // Assert
    expect(actual).toStrictEqual(expected);
  });

  it('should not update the state when the payload is undefined', () => {
    // Setup
    const param = {
      accountId: '3a2bc284-f11c-4676-a9e1-6310eea60f26',
      data: undefined,
      state: {
        explorerProps: {
          selectedFile: {
            baseName: 'foo',
            id: 'foo'
          },
          selectedFolder: {
            files: [
              {
                baseName: 'baz',
                id: 'baz'
              }
            ],
            id: 'bar',
            name: 'bar'
          }
        }
      } as State,
      storage: {} as unknown as Storage,
      tenantId: 'dd172b04-e4e2-4084-885c-47c9cc57f059'
    };
    const expected = {
      explorerProps: {
        selectedFile: {
          baseName: 'foo',
          id: 'foo'
        },
        selectedFolder: {
          files: [
            {
              baseName: 'baz',
              id: 'baz'
            }
          ],
          id: 'bar',
          name: 'bar'
        }
      }
    } as State;
    // Execute
    const target = reducer(new StorageService(param.storage, param.accountId, param.tenantId));
    const actual = target(param.state, appendExplorerFile(param.data));
    // Assert
    expect(actual).toStrictEqual(expected);
  });

});

describe('appendExplorerFolder', () => {

  it('should update the state', () => {
    // Setup
    const param = {
      accountId: '3a2bc284-f11c-4676-a9e1-6310eea60f26',
      data: {
        id: 'qux',
        name: 'qux'
      } as Folder,
      state: {
        explorerProps: {
          selectedFile: {
            baseName: 'foo',
            id: 'foo'
          },
          selectedFolder: {
            folders: [
              {
                id: 'baz',
                name: 'baz'
              }
            ],
            id: 'bar',
            name: 'bar'
          }
        }
      } as State,
      storage: {} as unknown as Storage,
      tenantId: 'dd172b04-e4e2-4084-885c-47c9cc57f059'
    };
    const expected = {
      explorerProps: {
        selectedFile: {
          baseName: 'foo',
          id: 'foo'
        },
        selectedFolder: {
          folders: [
            {
              id: 'baz',
              name: 'baz'
            },
            {
              id: 'qux',
              name: 'qux'
            }
          ],
          id: 'bar',
          name: 'bar'
        }
      }
    } as State;
    // Execute
    const target = reducer(new StorageService(param.storage, param.accountId, param.tenantId));
    const actual = target(param.state, appendExplorerFolder(param.data));
    // Assert
    expect(actual).toStrictEqual(expected);
  });

  it('should not update the state when the payload is undefined', () => {
    // Setup
    const param = {
      accountId: '3a2bc284-f11c-4676-a9e1-6310eea60f26',
      data: undefined,
      state: {
        explorerProps: {
          selectedFile: {
            baseName: 'foo',
            id: 'foo'
          },
          selectedFolder: {
            folders: [
              {
                id: 'baz',
                name: 'baz'
              }
            ],
            id: 'bar',
            name: 'bar'
          }
        }
      } as State,
      storage: {} as unknown as Storage,
      tenantId: 'dd172b04-e4e2-4084-885c-47c9cc57f059'
    };
    const expected = {
      explorerProps: {
        selectedFile: {
          baseName: 'foo',
          id: 'foo'
        },
        selectedFolder: {
          folders: [
            {
              id: 'baz',
              name: 'baz'
            }
          ],
          id: 'bar',
          name: 'bar'
        }
      }
    } as State;
    // Execute
    const target = reducer(new StorageService(param.storage, param.accountId, param.tenantId));
    const actual = target(param.state, appendExplorerFolder(param.data));
    // Assert
    expect(actual).toStrictEqual(expected);
  });

});
