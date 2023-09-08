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
    case ActionType.appendExploreFolder: {
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
    case ActionType.deleteExploreFile: {
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
    case ActionType.deleteExploreFolder: {
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
    case ActionType.setContentEditing: {
      const data = action.data as boolean | undefined;
      return {
        ...state,
        contentProps: {
          ...state.contentProps,
          editing: data ?? false
        },
        markdownProps: {
          position: {
            left: 0,
            top: 0
          },
          text: ''
        }
      };
    }
    case ActionType.setContentFile: {
      const data = action.data as File | undefined;
      return {
        ...state,
        contentProps: {
          ...state.contentProps,
          editing: false,
          file: data,
          position: {
            left: 0,
            top: 0
          },
          text: ''
        }
      };
    }
    case ActionType.setContentLoading: {
      const data = action.data as boolean | undefined;
      return {
        ...state,
        contentProps: {
          ...state.contentProps,
          loading: data
        }
      };
    }
    case ActionType.setContentMinimap: {
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
    case ActionType.setContentPosition: {
      const data = action.data as Position | undefined;
      return {
        ...state,
        contentProps: {
          ...state.contentProps,
          position: data ?? {
            left: 0,
            top: 0
          }
        }
      };
    }
    case ActionType.setContentPreview: {
      const data = action.data as boolean | undefined;
      storage.setContentPreview(data);
      return {
        ...state,
        contentProps: {
          ...state.contentProps,
          preview: data
        }
      };
    }
    case ActionType.setContentText: {
      const data = action.data as string | undefined;
      return {
        ...state,
        contentProps: {
          ...state.contentProps,
          text: data ?? ''
        }
      };
    }
    case ActionType.setContentWordWrap: {
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
    case ActionType.setMarkdownPosition: {
      const data = action.data as Position | undefined;
      return {
        ...state,
        markdownProps: {
          ...state.markdownProps,
          position: data ?? {
            left: 0,
            top: 0
          }
        }
      };
    }
    case ActionType.setMarkdownText: {
      const data = action.data as string | undefined;
      return {
        ...state,
        markdownProps: {
          ...state.markdownProps,
          text: data ?? ''
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
        exploreProps: {
          ...state.exploreProps,
          file: data
        }
      };
    }
    case ActionType.setExploreFolder: {
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
    case ActionType.setExploreAllFiles: {
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
    case ActionType.setInitialState: {
      const data = action.data as InitialState | undefined;
      return {
        ...state,
        ...data
      };
    }
    case ActionType.setSearchFile: {
      const data = action.data as File | undefined;
      return {
        ...state,
        searchTabProps: {
          ...state.searchTabProps,
          file: data
        }
      };
    }
    case ActionType.setSearchResults: {
      const data = action.data as File[] | undefined;
      return {
        ...state,
        searchTabProps: {
          ...state.searchTabProps,
          results: data
        }
      };
    }
    case ActionType.setSearchQuery: {
      const data = action.data as string | undefined;
      return {
        ...state,
        searchTabProps: {
          ...state.searchTabProps,
          query: data
        }
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
    case ActionType.updateExploreFile: {
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
    case ActionType.updateExploreFolder: {
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
