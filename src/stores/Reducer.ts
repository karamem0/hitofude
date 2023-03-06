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
  TabMode
} from '../types/Model';
import {
  Action,
  ActionType,
  State
} from '../types/Store';
import { compare } from '../utils/String';

export const reducer = (storage: StorageService) => (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.appendExploreFile: {
      const payload = action.payload as File | undefined;
      if (!payload) {
        return state;
      }
      if (!state.exploreFolder) {
        return state;
      }
      return {
        ...state,
        exploreFolder: {
          ...state.exploreFolder,
          files: state.exploreFolder.files ? (
            [ ...state.exploreFolder.files, payload ].sort((a, b) => compare(a.baseName, b.baseName))
          ) : (
            [ payload ]
          )
        }
      };
    }
    case ActionType.appendExploreFolder: {
      const payload = action.payload as Folder | undefined;
      if (!payload) {
        return state;
      }
      if (!state.exploreFolder) {
        return state;
      }
      return {
        ...state,
        exploreFolder: {
          ...state.exploreFolder,
          folders: state.exploreFolder.folders ? (
            [ ...state.exploreFolder.folders, payload ].sort((a, b) => compare(a.name, b.name))
          ) : (
            [ payload ]
          )
        }
      };
    }
    case ActionType.deleteExploreFile: {
      const payload = action.payload as File | undefined;
      if (!payload) {
        return state;
      }
      if (!state.exploreFolder) {
        return state;
      }
      return {
        ...state,
        exploreFolder: {
          ...state.exploreFolder,
          files: state.exploreFolder.files?.filter((item) => item.id !== payload.id)
        }
      };
    }
    case ActionType.deleteExploreFolder: {
      const payload = action.payload as Folder | undefined;
      if (!payload) {
        return state;
      }
      if (!state.exploreFolder) {
        return state;
      }
      return {
        ...state,
        exploreFolder: {
          ...state.exploreFolder,
          folders: state.exploreFolder.folders?.filter((item) => item.id !== payload.id)
        }
      };
    }
    case ActionType.setDialogAction: {
      const payload = action.payload as DialogAction | undefined;
      return {
        ...state,
        dialogAction: payload
      };
    }
    case ActionType.setError: {
      const payload = action.payload as Error | undefined;
      return {
        ...state,
        error: payload
      };
    }
    case ActionType.setExploreFile: {
      const payload = action.payload as File | undefined;
      storage.setExploreFileId(payload?.id);
      return {
        ...state,
        exploreFile: payload
      };
    }
    case ActionType.setExploreFolder: {
      const payload = action.payload as Folder | undefined;
      storage.setExploreFolderId(payload?.id);
      return {
        ...state,
        exploreFolder: payload
      };
    }
    case ActionType.setIncludeUnsupportedFiles: {
      const payload = action.payload as boolean | undefined;
      storage.setIncludeUnsupportedFiles(payload);
      return {
        ...state,
        includeUnsupportedFiles: payload
      };
    }
    case ActionType.setInitialValue: {
      const payload = action.payload as Pick<State, 'includeUnsupportedFiles' | 'tabMode'> | undefined;
      return {
        ...state,
        ...payload
      };
    }
    case ActionType.setLoading: {
      const payload = action.payload as boolean | undefined;
      return {
        ...state,
        loading: payload
      };
    }
    case ActionType.setSearchFile: {
      const payload = action.payload as File | undefined;
      return {
        ...state,
        searchFile: payload
      };
    }
    case ActionType.setSearchResults: {
      const payload = action.payload as File[] | undefined;
      return {
        ...state,
        searchResults: payload
      };
    }
    case ActionType.setSearchQuery: {
      const payload = action.payload as string | undefined;
      return {
        ...state,
        searchQuery: payload
      };
    }
    case ActionType.setTabMode: {
      const payload = action.payload as TabMode | undefined;
      storage.setTabMode(payload);
      return {
        ...state,
        tabMode: payload
      };
    }
    case ActionType.setWorkFile: {
      const payload = action.payload as File & FileContent | undefined;
      return {
        ...state,
        workFile: payload
      };
    }
    case ActionType.updateExploreFile: {
      const payload = action.payload as File | undefined;
      if (!payload) {
        return state;
      }
      if (!state.exploreFolder) {
        return state;
      }
      return {
        ...state,
        exploreFolder: {
          ...state.exploreFolder,
          files: state.exploreFolder.files ? (
            state.exploreFolder.files
              .map((item) => item.id === payload.id ? payload : item)
              .sort((a, b) => compare(a.baseName, b.baseName))
          ) : []
        }
      };
    }
    case ActionType.updateExploreFolder: {
      const payload = action.payload as Folder | undefined;
      if (!payload) {
        return state;
      }
      if (!state.exploreFolder) {
        return state;
      }
      return {
        ...state,
        exploreFolder: {
          ...state.exploreFolder,
          folders: state.exploreFolder.folders ? (
            state.exploreFolder.folders
              .map((item) => item.id === payload.id ? payload : item)
              .sort((a, b) => compare(a.name, b.name))
          ) : []
        }
      };
    }
    default:
      return state;
  }
};
