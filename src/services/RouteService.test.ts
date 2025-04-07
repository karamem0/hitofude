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

describe('getParams', () => {

  it('should get the value when the hash is not null', () => {
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
    const target = new RouteService(param.location, param.navigate);
    const actual = target.getParams();
    expect(actual).toStrictEqual(expected);
  });

  it('should get empty when the hash is null', () => {
    const param = {
      location: {
        hash: ''
      } as Location<unknown>,
      navigate: {} as NavigateFunction
    };
    const expected = {};
    const target = new RouteService(param.location, param.navigate);
    const actual = target.getParams();
    expect(actual).toStrictEqual(expected);
  });

});

describe('setParams', () => {

  it('should set the hash when the tab type is explorer', () => {
    const param = {
      location: {} as Location<unknown>,
      navigate: vi.fn(),
      route: {
        tab: TabType.explorer,
        folder: 'folder1',
        file: 'file1'
      }
    };
    const target = new RouteService(param.location, param.navigate);
    target.setParams(param.route);
    expect(param.navigate).toHaveBeenCalledWith('#tab=0&folder=folder1&file=file1');
  });

  it('should set the hash when the tab type is search', () => {
    const param = {
      location: {} as Location<unknown>,
      navigate: vi.fn(),
      route: {
        tab: TabType.search,
        search: 'search1',
        file: 'file1'
      }
    };
    const target = new RouteService(param.location, param.navigate);
    target.setParams(param.route);
    expect(param.navigate).toHaveBeenCalledWith('#tab=1&search=search1&file=file1');
  });

  it('should not set the hash tab type is invalid', () => {
    const param = {
      location: {} as Location<unknown>,
      navigate: vi.fn(),
      route: {
        tab: 2
      }
    };
    const target = new RouteService(param.location, param.navigate);
    target.setParams(param.route);
    expect(param.navigate).not.toHaveBeenCalled();
  });

});
