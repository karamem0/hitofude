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
  ScrollPosition,
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
      if (state.exploreTabProps?.folder == null) {
        return state;
      }
      return {
        ...state,
        exploreTabProps: {
          ...state.exploreTabProps,
          file: data,
          folder: {
            ...state.exploreTabProps?.folder,
            files: state.exploreTabProps?.folder?.files ? (
              [ ...state.exploreTabProps.folder.files, data ].sort((a, b) => compare(a.baseName, b.baseName))
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
      if (state.exploreTabProps?.folder == null) {
        return state;
      }
      return {
        ...state,
        exploreTabProps: {
          ...state.exploreTabProps,
          folder: {
            ...state.exploreTabProps?.folder,
            folders: state.exploreTabProps?.folder?.folders ? (
              [ ...state.exploreTabProps.folder.folders, data ].sort((a, b) => compare(a.name, b.name))
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
      if (state.exploreTabProps?.folder == null) {
        return state;
      }
      return {
        ...state,
        exploreTabProps: {
          ...state.exploreTabProps,
          folder: {
            ...state.exploreTabProps?.folder,
            files: state.exploreTabProps?.folder?.files?.filter((item) => item.id !== data.id)
          }
        }
      };
    }
    case ActionType.deleteExploreFolder: {
      const data = action.data as Folder | undefined;
      if (data == null) {
        return state;
      }
      if (state.exploreTabProps?.folder == null) {
        return state;
      }
      return {
        ...state,
        exploreTabProps: {
          ...state.exploreTabProps,
          folder: {
            ...state.exploreTabProps?.folder,
            folders: state.exploreTabProps?.folder?.folders?.filter((item) => item.id !== data.id)
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
          changed: false,
          position: {
            scrollLeft: 0,
            scrollTop: 0
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
            scrollLeft: 0,
            scrollTop: 0
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
          loading: data ?? false
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
          minimap: data ?? false
        }
      };
    }
    case ActionType.setContentPosition: {
      const data = action.data as ScrollPosition | undefined;
      return {
        ...state,
        contentProps: {
          ...state.contentProps,
          position: data ?? {
            scrollLeft: 0,
            scrollTop: 0
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
          preview: data ?? false
        }
      };
    }
    case ActionType.setContentScroll: {
      const data = action.data as boolean | undefined;
      storage.setContentScroll(data);
      return {
        ...state,
        contentProps: {
          ...state.contentProps,
          scroll: data ?? false
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
          wordWrap: data ?? false
        }
      };
    }
    case ActionType.setMarkdownChanged: {
      const data = action.data as boolean | undefined;
      return {
        ...state,
        markdownProps: {
          ...state.markdownProps,
          changed: data ?? false
        }
      };
    }
    case ActionType.setMarkdownPosition: {
      const data = action.data as ScrollPosition | undefined;
      return {
        ...state,
        markdownProps: {
          ...state.markdownProps,
          position: data ?? {
            scrollLeft: 0,
            scrollTop: 0
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
        exploreTabProps: {
          ...state.exploreTabProps,
          file: data
        }
      };
    }
    case ActionType.setExploreFolder: {
      const data = action.data as Folder | undefined;
      storage.setExploreFolderId(data?.id);
      return {
        ...state,
        exploreTabProps: {
          ...state.exploreTabProps,
          folder: data
        }
      };
    }
    case ActionType.setExploreAllFiles: {
      const data = action.data as boolean | undefined;
      storage.setExploreAllFiles(data);
      return {
        ...state,
        exploreTabProps: {
          ...state.exploreTabProps,
          allFiles: data ?? false
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
          query: data ?? ''
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
      if (state.exploreTabProps?.folder == null) {
        return state;
      }
      return {
        ...state,
        exploreTabProps: {
          ...state.exploreTabProps,
          folder: {
            ...state.exploreTabProps?.folder,
            files: state.exploreTabProps?.folder?.files ? (
              state.exploreTabProps?.folder?.files
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
      if (state.exploreTabProps?.folder == null) {
        return state;
      }
      return {
        ...state,
        exploreTabProps: {
          ...state.exploreTabProps,
          folder: {
            ...state.exploreTabProps?.folder,
            folders: state.exploreTabProps?.folder?.folders ? (
              state.exploreTabProps?.folder?.folders
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
