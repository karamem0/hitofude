//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import { StorageService } from '../services/StorageService';
import {
  DialogAction,
  File,
  FileContent,
  Folder,
  SidePanelAction,
  TabMode
} from '../types/Model';
import {
  Action,
  ActionType,
  InitialState,
  State
} from '../types/Store';
import { compare } from '../utils/String';

export const reducer = (storage: StorageService) => (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.appendExploreFile: {
      const data = action.data as File | undefined;
      if (data == null) {
        return state;
      }
      if (state.exploreFolder == null) {
        return state;
      }
      return {
        ...state,
        exploreFile: data,
        exploreFolder: {
          ...state.exploreFolder,
          files: state.exploreFolder.files ? (
            [ ...state.exploreFolder.files, data ].sort((a, b) => compare(a.baseName, b.baseName))
          ) : (
            [ data ]
          )
        }
      };
    }
    case ActionType.appendExploreFolder: {
      const data = action.data as Folder | undefined;
      if (data == null) {
        return state;
      }
      if (state.exploreFolder == null) {
        return state;
      }
      return {
        ...state,
        exploreFolder: {
          ...state.exploreFolder,
          folders: state.exploreFolder.folders ? (
            [ ...state.exploreFolder.folders, data ].sort((a, b) => compare(a.name, b.name))
          ) : (
            [ data ]
          )
        }
      };
    }
    case ActionType.deleteExploreFile: {
      const data = action.data as File | undefined;
      if (data == null) {
        return state;
      }
      if (state.exploreFolder == null) {
        return state;
      }
      return {
        ...state,
        exploreFolder: {
          ...state.exploreFolder,
          files: state.exploreFolder.files?.filter((item) => item.id !== data.id)
        }
      };
    }
    case ActionType.deleteExploreFolder: {
      const data = action.data as Folder | undefined;
      if (data == null) {
        return state;
      }
      if (state.exploreFolder == null) {
        return state;
      }
      return {
        ...state,
        exploreFolder: {
          ...state.exploreFolder,
          folders: state.exploreFolder.folders?.filter((item) => item.id !== data.id)
        }
      };
    }
    case ActionType.setDialogAction: {
      const data = action.data as DialogAction | undefined;
      return {
        ...state,
        dialogAction: data
      };
    }
    case ActionType.setError: {
      const data = action.data as Error | undefined;
      return {
        ...state,
        error: data
      };
    }
    case ActionType.setExploreFile: {
      const data = action.data as File | undefined;
      storage.setExploreFileId(data?.id);
      return {
        ...state,
        exploreFile: data
      };
    }
    case ActionType.setExploreFolder: {
      const data = action.data as Folder | undefined;
      storage.setExploreFolderId(data?.id);
      return {
        ...state,
        exploreFolder: data
      };
    }
    case ActionType.setIncludeUnsupportedFiles: {
      const data = action.data as boolean | undefined;
      storage.setIncludeUnsupportedFiles(data);
      return {
        ...state,
        includeUnsupportedFiles: data
      };
    }
    case ActionType.setInitialState: {
      const data = action.data as InitialState | undefined;
      return {
        ...state,
        ...data
      };
    }
    case ActionType.setLoading: {
      const data = action.data as boolean | undefined;
      return {
        ...state,
        loading: data
      };
    }
    case ActionType.setMinimapEnabled: {
      const data = action.data as boolean | undefined;
      storage.setMinimapEnabled(data);
      return {
        ...state,
        minimapEnabled: data
      };
    }
    case ActionType.setSearchFile: {
      const data = action.data as File | undefined;
      return {
        ...state,
        searchFile: data
      };
    }
    case ActionType.setSearchResults: {
      const data = action.data as File[] | undefined;
      return {
        ...state,
        searchResults: data
      };
    }
    case ActionType.setSearchQuery: {
      const data = action.data as string | undefined;
      return {
        ...state,
        searchQuery: data
      };
    }
    case ActionType.setSidePanelAction: {
      const data = action.data as SidePanelAction | undefined;
      return {
        ...state,
        sidePanelAction: data
      };
    }
    case ActionType.setTabMode: {
      const data = action.data as TabMode | undefined;
      storage.setTabMode(data);
      return {
        ...state,
        tabMode: data
      };
    }
    case ActionType.setWorkFile: {
      const data = action.data as File & FileContent | undefined;
      return {
        ...state,
        workFile: data
      };
    }
    case ActionType.updateExploreFile: {
      const data = action.data as File | undefined;
      if (data == null) {
        return state;
      }
      if (state.exploreFolder == null) {
        return state;
      }
      return {
        ...state,
        exploreFolder: {
          ...state.exploreFolder,
          files: state.exploreFolder.files ? (
            state.exploreFolder.files
              .map((item) => item.id === data.id ? data : item)
              .sort((a, b) => compare(a.baseName, b.baseName))
          ) : []
        }
      };
    }
    case ActionType.updateExploreFolder: {
      const data = action.data as Folder | undefined;
      if (data == null) {
        return state;
      }
      if (state.exploreFolder == null) {
        return state;
      }
      return {
        ...state,
        exploreFolder: {
          ...state.exploreFolder,
          folders: state.exploreFolder.folders ? (
            state.exploreFolder.folders
              .map((item) => item.id === data.id ? data : item)
              .sort((a, b) => compare(a.name, b.name))
          ) : []
        }
      };
    }
    default:
      return state;
  }
};
