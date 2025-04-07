//
// Copyright (c) 2023-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import { File, Folder } from '../types/Model';
import { appendExplorerFile, appendExplorerFolder } from './Action';
import { State } from '../types/Store';
import { StorageService } from '../services/StorageService';
import { reducer } from './Reducer';

describe('appendExplorerFile', () => {

  it('should update the state', () => {
    const param = {
      state: {
        explorerProps: {
          selectedFile: {
            id: 'foo',
            baseName: 'foo'
          },
          selectedFolder: {
            id: 'bar',
            name: 'bar',
            files: [
              {
                id: 'baz',
                baseName: 'baz'
              }
            ]
          }
        }
      } as State,
      data: {
        id: 'qux',
        baseName: 'qux'
      } as File
    };
    const expected = {
      explorerProps: {
        selectedFile: {
          id: 'qux',
          baseName: 'qux'
        },
        selectedFolder: {
          id: 'bar',
          name: 'bar',
          files: [
            {
              id: 'baz',
              baseName: 'baz'
            },
            {
              id: 'qux',
              baseName: 'qux'
            }
          ]
        }
      }
    } as State;
    const target = reducer(new StorageService({} as unknown as Storage));
    const actual = target(param.state, appendExplorerFile(param.data));
    expect(actual).toStrictEqual(expected);
  });

  it('should not update the state when the payload is undefined', () => {
    const param = {
      state: {
        explorerProps: {
          selectedFile: {
            id: 'foo',
            baseName: 'foo'
          },
          selectedFolder: {
            id: 'bar',
            name: 'bar',
            files: [
              {
                id: 'baz',
                baseName: 'baz'
              }
            ]
          }
        }
      } as State,
      data: undefined
    };
    const expected = {
      explorerProps: {
        selectedFile: {
          id: 'foo',
          baseName: 'foo'
        },
        selectedFolder: {
          id: 'bar',
          name: 'bar',
          files: [
            {
              id: 'baz',
              baseName: 'baz'
            }
          ]
        }
      }
    } as State;
    const target = reducer(new StorageService({} as unknown as Storage));
    const actual = target(param.state, appendExplorerFile(param.data));
    expect(actual).toStrictEqual(expected);
  });

});

describe('appendExplorerFolder', () => {

  it('should update the state', () => {
    const param = {
      state: {
        explorerProps: {
          selectedFile: {
            id: 'foo',
            baseName: 'foo'
          },
          selectedFolder: {
            id: 'bar',
            name: 'bar',
            folders: [
              {
                id: 'baz',
                name: 'baz'
              }
            ]
          }
        }
      } as State,
      data: {
        id: 'qux',
        name: 'qux'
      } as Folder
    };
    const expected = {
      explorerProps: {
        selectedFile: {
          id: 'foo',
          baseName: 'foo'
        },
        selectedFolder: {
          id: 'bar',
          name: 'bar',
          folders: [
            {
              id: 'baz',
              name: 'baz'
            },
            {
              id: 'qux',
              name: 'qux'
            }
          ]
        }
      }
    } as State;
    const target = reducer(new StorageService({} as unknown as Storage));
    const actual = target(param.state, appendExplorerFolder(param.data));
    expect(actual).toStrictEqual(expected);
  });

  it('should not update the state when the payload is undefined', () => {
    const param = {
      state: {
        explorerProps: {
          selectedFile: {
            id: 'foo',
            baseName: 'foo'
          },
          selectedFolder: {
            id: 'bar',
            name: 'bar',
            folders: [
              {
                id: 'baz',
                name: 'baz'
              }
            ]
          }
        }
      } as State,
      data: undefined
    };
    const expected = {
      explorerProps: {
        selectedFile: {
          id: 'foo',
          baseName: 'foo'
        },
        selectedFolder: {
          id: 'bar',
          name: 'bar',
          folders: [
            {
              id: 'baz',
              name: 'baz'
            }
          ]
        }
      }
    } as State;
    const target = reducer(new StorageService({} as unknown as Storage));
    const actual = target(param.state, appendExplorerFolder(param.data));
    expect(actual).toStrictEqual(expected);
  });

});
