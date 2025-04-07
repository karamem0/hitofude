//
// Copyright (c) 2023-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import { Location, NavigateFunction } from 'react-router-dom';
import { RouteParams, TabType } from '../types/Model';

export class RouteService {

  private location: Location<unknown>;
  private navigate: NavigateFunction;

  constructor(location: Location<unknown>, navigate: NavigateFunction) {
    this.location = location;
    this.navigate = navigate;
  }

  getParams(): RouteParams {
    const params = new URLSearchParams(this.location.hash.slice(1));
    if (params.size === 0) {
      return {};
    }
    return {
      tab: Number(params.get('tab') ?? undefined),
      folder: params.get('folder') ?? undefined,
      file: params.get('file') ?? undefined,
      search: params.get('search') ?? undefined
    };
  }

  setParams(value: RouteParams): void {
    const params = new URLSearchParams();
    switch (value.tab) {
      case TabType.explorer: {
        params.set('tab', String(value.tab));
        if (value.folder != null) {
          params.set('folder', value.folder);
        }
        if (value.file != null) {
          params.set('file', value.file);
        }
        this.navigate(`#${params}`);
        break;
      }
      case TabType.search: {
        params.set('tab', String(value.tab));
        if (value.search != null) {
          params.set('search', value.search);
        }
        if (value.file != null) {
          params.set('file', value.file);
        }
        this.navigate(`#${params}`);
        break;
      }
      default:
        break;
    }
  }

}
