//
// Copyright (c) 2023-2024 karamem0
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
  TabType
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
      if (state.explorerProps?.folder == null) {
        return state;
      }
      return {
        ...state,
        explorerProps: {
          ...state.explorerProps,
          file: data,
          folder: {
            ...state.explorerProps?.folder,
            files: state.explorerProps?.folder?.files ? (
              [ ...state.explorerProps.folder.files, data ].sort((a, b) => compare(a.baseName, b.baseName))
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
      if (state.explorerProps?.folder == null) {
        return state;
      }
      return {
        ...state,
        explorerProps: {
          ...state.explorerProps,
          folder: {
            ...state.explorerProps?.folder,
            folders: state.explorerProps?.folder?.folders ? (
              [ ...state.explorerProps.folder.folders, data ].sort((a, b) => compare(a.name, b.name))
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
      if (state.explorerProps?.folder == null) {
        return state;
      }
      return {
        ...state,
        explorerProps: {
          ...state.explorerProps,
          folder: {
            ...state.explorerProps?.folder,
            files: state.explorerProps?.folder?.files?.filter((item) => item.id !== data.id)
          }
        }
      };
    }
    case ActionType.deleteExploreFolder: {
      const data = action.data as Folder | undefined;
      if (data == null) {
        return state;
      }
      if (state.explorerProps?.folder == null) {
        return state;
      }
      return {
        ...state,
        explorerProps: {
          ...state.explorerProps,
          folder: {
            ...state.explorerProps?.folder,
            folders: state.explorerProps?.folder?.folders?.filter((item) => item.id !== data.id)
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
          defaultText: state.contentProps?.text,
          scrollPosition: {
            scrollX: 0,
            scrollY: 0
          },
          text: state.contentProps?.text
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
          scrollPosition: {
            scrollX: 0,
            scrollY: 0
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
    case ActionType.setContentScrollPosition: {
      const data = action.data as ScrollPosition | undefined;
      return {
        ...state,
        contentProps: {
          ...state.contentProps,
          scrollPosition: data ?? {
            scrollX: 0,
            scrollY: 0
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
        },
        markdownProps: {
          defaultText: data ?? '',
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
    case ActionType.setMarkdownDefaultText: {
      const data = action.data as string | undefined;
      return {
        ...state,
        markdownProps: {
          ...state.markdownProps,
          defaultText: data ?? ''
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
    case ActionType.setMarkdownScrollPosition: {
      const data = action.data as ScrollPosition | undefined;
      return {
        ...state,
        markdownProps: {
          ...state.markdownProps,
          scrollPosition: data ?? {
            scrollX: 0,
            scrollY: 0
          }
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
        explorerProps: {
          ...state.explorerProps,
          file: data
        }
      };
    }
    case ActionType.setExploreFolder: {
      const data = action.data as Folder | undefined;
      storage.setExploreFolderId(data?.id);
      return {
        ...state,
        explorerProps: {
          ...state.explorerProps,
          folder: data
        }
      };
    }
    case ActionType.setExploreAllFiles: {
      const data = action.data as boolean | undefined;
      storage.setExploreAllFiles(data);
      return {
        ...state,
        explorerProps: {
          ...state.explorerProps,
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
        searchProps: {
          ...state.searchProps,
          file: data
        }
      };
    }
    case ActionType.setsearchFiles: {
      const data = action.data as File[] | undefined;
      return {
        ...state,
        searchProps: {
          ...state.searchProps,
          results: data
        }
      };
    }
    case ActionType.setSearchQuery: {
      const data = action.data as string | undefined;
      return {
        ...state,
        searchProps: {
          ...state.searchProps,
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
    case ActionType.setTabLoading: {
      const data = action.data as boolean | undefined;
      return {
        ...state,
        tabProps: {
          ...state.tabProps,
          loading: data ?? false
        }
      };
    }
    case ActionType.setTabOpen: {
      const data = action.data as boolean | undefined;
      storage.setTabOpen(data);
      return {
        ...state,
        tabProps: {
          ...state.tabProps,
          open: data
        }
      };
    }
    case ActionType.setTabType: {
      const data = action.data as TabType | undefined;
      storage.setTabType(data);
      return {
        ...state,
        tabProps: {
          ...state.tabProps,
          type: data
        }
      };
    }
    case ActionType.updateExploreFile: {
      const data = action.data as File | undefined;
      if (data == null) {
        return state;
      }
      if (state.explorerProps?.folder == null) {
        return state;
      }
      return {
        ...state,
        explorerProps: {
          ...state.explorerProps,
          folder: {
            ...state.explorerProps?.folder,
            files: state.explorerProps?.folder?.files ? (
              state.explorerProps?.folder?.files
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
      if (state.explorerProps?.folder == null) {
        return state;
      }
      return {
        ...state,
        explorerProps: {
          ...state.explorerProps,
          folder: {
            ...state.explorerProps?.folder,
            folders: state.explorerProps?.folder?.folders ? (
              state.explorerProps?.folder?.folders
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
