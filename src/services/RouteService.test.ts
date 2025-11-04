//
// Copyright (c) 2023-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import { Location, NavigateFunction } from 'react-router-dom';
import { RouteService } from './RouteService';
import { TabType } from '../types/Model';

beforeEach(() => {
  vi.clearAllMocks();
  vi.resetModules();
});

describe('getParams', () => {

  it('should get the value when the hash is not null', () => {
    // Setup
    const param = {
      location: {
        hash: '#tab=1&folder=folder1&file=file1&search=search1'
      } as Location<unknown>,
      navigate: vi.fn()
    };
    const expected = {
      tab: 1,
      folder: 'folder1',
      file: 'file1',
      search: 'search1'
    };
    // Execute
    const target = new RouteService(param.location, param.navigate);
    const actual = target.getParams();
    // Assert
    expect(actual).toStrictEqual(expected);
  });

  it('should get empty when the hash is null', () => {
    // Setup
    const param = {
      location: {
        hash: ''
      } as Location<unknown>,
      navigate: {} as NavigateFunction
    };
    const expected = {};
    // Execute
    const target = new RouteService(param.location, param.navigate);
    const actual = target.getParams();
    // Assert
    expect(actual).toStrictEqual(expected);
  });

});

describe('setParams', () => {

  it('should set the hash when the tab type is explorer', () => {
    // Setup
    const param = {
      location: {} as Location<unknown>,
      navigate: vi.fn(),
      route: {
        tab: TabType.explorer,
        folder: 'folder1',
        file: 'file1'
      }
    };
    // Execute
    const target = new RouteService(param.location, param.navigate);
    target.setParams(param.route);
    // Assert
    expect(param.navigate).toHaveBeenCalledWith('#tab=0&folder=folder1&file=file1');
  });

  it('should set the hash when the tab type is search', () => {
    // Setup
    const param = {
      location: {} as Location<unknown>,
      navigate: vi.fn(),
      route: {
        tab: TabType.search,
        search: 'search1',
        file: 'file1'
      }
    };
    // Execute
    const target = new RouteService(param.location, param.navigate);
    target.setParams(param.route);
    // Assert
    expect(param.navigate).toHaveBeenCalledWith('#tab=1&search=search1&file=file1');
  });

  it('should not set the hash tab type is invalid', () => {
    // Setup
    const param = {
      location: {} as Location<unknown>,
      navigate: vi.fn(),
      route: {
        tab: 2
      }
    };
    // Execute
    const target = new RouteService(param.location, param.navigate);
    target.setParams(param.route);
    // Assert
    expect(param.navigate).not.toHaveBeenCalled();
  });

});
