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
  Folder,
  Position,
  SidePanelAction,
  TabMode
} from '../types/Model';
import {
  AppAction,
  AppActionType,
  InitialAppState,
  AppState
} from '../types/Store';
import { compare } from '../utils/String';

export const reducer = (storage: StorageService) => (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case AppActionType.appendExploreFile: {
      const data = action.data as File | undefined;
      if (data == null) {
        return state;
      }
      if (state.exploreProps?.folder == null) {
        return state;
      }
      return {
        ...state,
        exploreProps: {
          ...state.exploreProps,
          file: data,
          folder: {
            ...state.exploreProps?.folder,
            files: state.exploreProps?.folder?.files ? (
              [ ...state.exploreProps.folder.files, data ].sort((a, b) => compare(a.baseName, b.baseName))
            ) : (
              [ data ]
            )
          }
        }
      };
    }
    case AppActionType.appendExploreFolder: {
      const data = action.data as Folder | undefined;
      if (data == null) {
        return state;
      }
      if (state.exploreProps?.folder == null) {
        return state;
      }
      return {
        ...state,
        exploreProps: {
          ...state.exploreProps,
          folder: {
            ...state.exploreProps?.folder,
            folders: state.exploreProps?.folder?.folders ? (
              [ ...state.exploreProps.folder.folders, data ].sort((a, b) => compare(a.name, b.name))
            ) : (
              [ data ]
            )
          }
        }
      };
    }
    case AppActionType.deleteExploreFile: {
      const data = action.data as File | undefined;
      if (data == null) {
        return state;
      }
      if (state.exploreProps?.folder == null) {
        return state;
      }
      return {
        ...state,
        exploreProps: {
          ...state.exploreProps,
          folder: {
            ...state.exploreProps?.folder,
            files: state.exploreProps?.folder?.files?.filter((item) => item.id !== data.id)
          }
        }
      };
    }
    case AppActionType.deleteExploreFolder: {
      const data = action.data as Folder | undefined;
      if (data == null) {
        return state;
      }
      if (state.exploreProps?.folder == null) {
        return state;
      }
      return {
        ...state,
        exploreProps: {
          ...state.exploreProps,
          folder: {
            ...state.exploreProps?.folder,
            folders: state.exploreProps?.folder?.folders?.filter((item) => item.id !== data.id)
          }
        }
      };
    }
    case AppActionType.setContentEditing: {
      const data = action.data as boolean | undefined;
      return {
        ...state,
        contentProps: {
          ...state.contentProps,
          editing: data ?? false
        }
      };
    }
    case AppActionType.setContentFile: {
      const data = action.data as File | undefined;
      return {
        ...state,
        contentProps: {
          ...state.contentProps,
          editing: false,
          file: data,
          position: {
            left: 1,
            top: 1
          },
          text: ''
        }
      };
    }
    case AppActionType.setContentLoading: {
      const data = action.data as boolean | undefined;
      return {
        ...state,
        contentProps: {
          ...state.contentProps,
          loading: data
        }
      };
    }
    case AppActionType.setContentMinimap: {
      const data = action.data as boolean | undefined;
      storage.setContentMinimap(data);
      return {
        ...state,
        contentProps: {
          ...state.contentProps,
          minimap: data
        }
      };
    }
    case AppActionType.setContentPosition: {
      const data = action.data as Position | undefined;
      return {
        ...state,
        contentProps: {
          ...state.contentProps,
          position: data ?? {
            left: 1,
            top: 1
          }
        }
      };
    }
    case AppActionType.setContentText: {
      const data = action.data as string | undefined;
      return {
        ...state,
        contentProps: {
          ...state.contentProps,
          text: data ?? ''
        }
      };
    }
    case AppActionType.setContentWordWrap: {
      const data = action.data as boolean | undefined;
      storage.setContentWordWrap(data);
      return {
        ...state,
        contentProps: {
          ...state.contentProps,
          wordWrap: data
        }
      };
    }
    case AppActionType.setDialogAction: {
      const data = action.data as DialogAction | undefined;
      return {
        ...state,
        dialogAction: data
      };
    }
    case AppActionType.setError: {
      const data = action.data as Error | undefined;
      return {
        ...state,
        error: data
      };
    }
    case AppActionType.setExploreFile: {
      const data = action.data as File | undefined;
      storage.setExploreFileId(data?.id);
      return {
        ...state,
        exploreProps: {
          ...state.exploreProps,
          file: data
        }
      };
    }
    case AppActionType.setExploreFolder: {
      const data = action.data as Folder | undefined;
      storage.setExploreFolderId(data?.id);
      return {
        ...state,
        exploreProps: {
          ...state.exploreProps,
          folder: data
        }
      };
    }
    case AppActionType.setExploreAllFiles: {
      const data = action.data as boolean | undefined;
      storage.setExploreAllFiles(data);
      return {
        ...state,
        exploreProps: {
          ...state.exploreProps,
          allFiles: data
        }
      };
    }
    case AppActionType.setInitialState: {
      const data = action.data as InitialAppState | undefined;
      return {
        ...state,
        ...data
      };
    }
    case AppActionType.setSearchFile: {
      const data = action.data as File | undefined;
      return {
        ...state,
        searchTabProps: {
          ...state.searchTabProps,
          file: data
        }
      };
    }
    case AppActionType.setSearchResults: {
      const data = action.data as File[] | undefined;
      return {
        ...state,
        searchTabProps: {
          ...state.searchTabProps,
          results: data
        }
      };
    }
    case AppActionType.setSearchQuery: {
      const data = action.data as string | undefined;
      return {
        ...state,
        searchTabProps: {
          ...state.searchTabProps,
          query: data
        }
      };
    }
    case AppActionType.setSidePanelAction: {
      const data = action.data as SidePanelAction | undefined;
      return {
        ...state,
        sidePanelAction: data
      };
    }
    case AppActionType.setTabMode: {
      const data = action.data as TabMode | undefined;
      storage.setTabMode(data);
      return {
        ...state,
        tabMode: data
      };
    }
    case AppActionType.updateExploreFile: {
      const data = action.data as File | undefined;
      if (data == null) {
        return state;
      }
      if (state.exploreProps?.folder == null) {
        return state;
      }
      return {
        ...state,
        exploreProps: {
          ...state.exploreProps,
          folder: {
            ...state.exploreProps?.folder,
            files: state.exploreProps?.folder?.files ? (
              state.exploreProps?.folder?.files
                .map((item) => item.id === data.id ? data : item)
                .sort((a, b) => compare(a.baseName, b.baseName))
            ) : []
          }
        }
      };
    }
    case AppActionType.updateExploreFolder: {
      const data = action.data as Folder | undefined;
      if (data == null) {
        return state;
      }
      if (state.exploreProps?.folder == null) {
        return state;
      }
      return {
        ...state,
        exploreProps: {
          ...state.exploreProps,
          folder: {
            ...state.exploreProps?.folder,
            folders: state.exploreProps?.folder?.folders ? (
              state.exploreProps?.folder?.folders
                .map((item) => item.id === data.id ? data : item)
                .sort((a, b) => compare(a.name, b.name))
            ) : []
          }
        }
      };
    }
    default:
      return state;
  }
};
