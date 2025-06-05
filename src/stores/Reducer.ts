//
// Copyright (c) 2023-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import {
  Action,
  InitialState,
  State
} from '../types/Store';
import {
  DialogAction,
  File,
  FileConflict,
  Folder,
  ScrollPosition,
  SidePanelAction,
  TabType
} from '../types/Model';
import { StorageService } from '../services/StorageService';
import { compare } from '../utils/String';

const actions = (storage: StorageService) => ({
  appendExplorerFile: (state: State, payload: unknown) => {
    const data = payload as File | undefined;
    if (data == null) {
      return state;
    }
    if (state.explorerProps?.selectedFolder == null) {
      return state;
    }
    return {
      ...state,
      explorerProps: {
        ...state.explorerProps,
        selectedFile: data,
        selectedFolder: {
          ...state.explorerProps.selectedFolder,
          files: state.explorerProps.selectedFolder.files ? (
            [ ...state.explorerProps.selectedFolder.files, data ].sort((a, b) => compare(a.baseName, b.baseName))
          ) : (
            [ data ]
          )
        }
      }
    };
  },
  appendExplorerFileConflict: (state: State, payload: unknown) => {
    const data = payload as FileConflict | undefined;
    if (data == null) {
      return state;
    }
    return {
      ...state,
      explorerProps: {
        ...state.explorerProps,
        fileConflicts: state.explorerProps?.fileConflicts ? (
          [ ...state.explorerProps.fileConflicts, data ]
        ) : (
          [ data ]
        )
      }
    };
  },
  appendExplorerFolder: (state: State, payload: unknown) => {
    const data = payload as Folder | undefined;
    if (data == null) {
      return state;
    }
    if (state.explorerProps?.selectedFolder == null) {
      return state;
    }
    return {
      ...state,
      explorerProps: {
        ...state.explorerProps,
        selectedFolder: {
          ...state.explorerProps.selectedFolder,
          folders: state.explorerProps.selectedFolder.folders ? (
            [ ...state.explorerProps.selectedFolder.folders, data ].sort((a, b) => compare(a.name, b.name))
          ) : (
            [ data ]
          )
        }
      }
    };
  },
  removeExplorerFile: (state: State, payload: unknown) => {
    const data = payload as File | undefined;
    if (data == null) {
      return state;
    }
    if (state.explorerProps?.selectedFolder == null) {
      return state;
    }
    return {
      ...state,
      explorerProps: {
        ...state.explorerProps,
        selectedFolder: {
          ...state.explorerProps.selectedFolder,
          files: state.explorerProps.selectedFolder.files?.filter((item) => item.id !== data.id)
        }
      }
    };
  },
  removeExplorerFileConflict: (state: State, payload: unknown) => {
    const data = payload as FileConflict | undefined;
    if (data == null) {
      return state;
    }
    return {
      ...state,
      explorerProps: {
        ...state.explorerProps,
        fileConflicts: state.explorerProps?.fileConflicts?.filter((item) => item.id !== data.id)
      }
    };
  },
  removeExplorerFolder: (state: State, payload: unknown) => {
    const data = payload as Folder | undefined;
    if (data == null) {
      return state;
    }
    if (state.explorerProps?.selectedFolder == null) {
      return state;
    }
    return {
      ...state,
      explorerProps: {
        ...state.explorerProps,
        selectedFolder: {
          ...state.explorerProps.selectedFolder,
          folders: state.explorerProps.selectedFolder.folders?.filter((item) => item.id !== data.id)
        }
      }
    };
  },
  setContentEditing: (state: State, payload: unknown) => {
    const data = payload as boolean | undefined;
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
  },
  setContentFile: (state: State, payload: unknown) => {
    const data = payload as File | undefined;
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
  },
  setContentLoading: (state: State, payload: unknown) => {
    const data = payload as boolean | undefined;
    return {
      ...state,
      contentProps: {
        ...state.contentProps,
        loading: data ?? false
      }
    };
  },
  setContentPreviewUrl: (state: State, payload: unknown) => {
    const data = payload as string | undefined;
    return {
      ...state,
      contentProps: {
        ...state.contentProps,
        previewUrl: data
      }
    };
  },
  setContentScrollPosition: (state: State, payload: unknown) => {
    const data = payload as ScrollPosition | undefined;
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
  },
  setContentShowMinimap: (state: State, payload: unknown) => {
    const data = payload as boolean | undefined;
    storage.setContentShowMinimap(data);
    return {
      ...state,
      contentProps: {
        ...state.contentProps,
        showMinimap: data ?? false
      }
    };
  },
  setContentShowPreview: (state: State, payload: unknown) => {
    const data = payload as boolean | undefined;
    storage.setContentShowPreview(data);
    return {
      ...state,
      contentProps: {
        ...state.contentProps,
        showPreview: data ?? false
      }
    };
  },
  setContentSyncScroll: (state: State, payload: unknown) => {
    const data = payload as boolean | undefined;
    storage.setContentSyncScroll(data);
    return {
      ...state,
      contentProps: {
        ...state.contentProps,
        syncScroll: data ?? false
      }
    };
  },
  setContentText: (state: State, payload: unknown) => {
    const data = payload as string | undefined;
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
  },
  setContentWordWrap: (state: State, payload: unknown) => {
    const data = payload as boolean | undefined;
    storage.setContentWordWrap(data);
    return {
      ...state,
      contentProps: {
        ...state.contentProps,
        wordWrap: data ?? false
      }
    };
  },
  setDialogAction: (state: State, payload: unknown) => {
    const data = payload as DialogAction | undefined;
    return {
      ...state,
      dialogAction: data
    };
  },
  setError: (state: State, payload: unknown) => {
    const data = payload as Error | undefined;
    return {
      ...state,
      error: data
    };
  },
  setExplorerAllFiles: (state: State, payload: unknown) => {
    const data = payload as boolean | undefined;
    storage.setExplorerAllFiles(data);
    return {
      ...state,
      explorerProps: {
        ...state.explorerProps,
        allFiles: data ?? false
      }
    };
  },
  setExplorerSelectedFile: (state: State, payload: unknown) => {
    const data = payload as File | undefined;
    storage.setExplorerFileId(data?.id);
    return {
      ...state,
      explorerProps: {
        ...state.explorerProps,
        selectedFile: data
      }
    };
  },
  setExplorerSelectedFolder: (state: State, payload: unknown) => {
    const data = payload as Folder | undefined;
    storage.setExplorerFolderId(data?.id);
    return {
      ...state,
      explorerProps: {
        ...state.explorerProps,
        selectedFolder: data
      }
    };
  },
  setInitialState: (state: State, payload: unknown) => {
    const data = payload as InitialState | undefined;
    return {
      ...state,
      ...data
    };
  },
  setMarkdownChanged: (state: State, payload: unknown) => {
    const data = payload as boolean | undefined;
    return {
      ...state,
      markdownProps: {
        ...state.markdownProps,
        changed: data ?? false
      }
    };
  },
  setMarkdownDefaultText: (state: State, payload: unknown) => {
    const data = payload as string | undefined;
    return {
      ...state,
      markdownProps: {
        ...state.markdownProps,
        defaultText: data ?? ''
      }
    };
  },
  setMarkdownScrollPosition: (state: State, payload: unknown) => {
    const data = payload as ScrollPosition | undefined;
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
  },
  setMarkdownText: (state: State, payload: unknown) => {
    const data = payload as string | undefined;
    return {
      ...state,
      markdownProps: {
        ...state.markdownProps,
        text: data ?? ''
      }
    };
  },
  setSearchQuery: (state: State, payload: unknown) => {
    const data = payload as string | undefined;
    return {
      ...state,
      searchProps: {
        ...state.searchProps,
        query: data ?? ''
      }
    };
  },
  setSearchResultFiles: (state: State, payload: unknown) => {
    const data = payload as File[] | undefined;
    return {
      ...state,
      searchProps: {
        ...state.searchProps,
        resultFiles: data
      }
    };
  },
  setSearchSelectedFile: (state: State, payload: unknown) => {
    const data = payload as File | undefined;
    return {
      ...state,
      searchProps: {
        ...state.searchProps,
        selectedFile: data
      }
    };
  },
  setSidePanelAction: (state: State, payload: unknown) => {
    const data = payload as SidePanelAction | undefined;
    return {
      ...state,
      sidePanelAction: data
    };
  },
  setTabLoading: (state: State, payload: unknown) => {
    const data = payload as boolean | undefined;
    return {
      ...state,
      tabProps: {
        ...state.tabProps,
        loading: data ?? false
      }
    };
  },
  setTabOpen: (state: State, payload: unknown) => {
    const data = payload as boolean | undefined;
    storage.setTabOpen(data);
    return {
      ...state,
      tabProps: {
        ...state.tabProps,
        open: data
      }
    };
  },
  setTabType: (state: State, payload: unknown) => {
    const data = payload as TabType | undefined;
    storage.setTabType(data);
    return {
      ...state,
      tabProps: {
        ...state.tabProps,
        type: data
      }
    };
  },
  updateExplorerFile: (state: State, payload: unknown) => {
    const data = payload as File | undefined;
    if (data == null) {
      return state;
    }
    if (state.explorerProps?.selectedFolder == null) {
      return state;
    }
    return {
      ...state,
      explorerProps: {
        ...state.explorerProps,
        selectedFolder: {
          ...state.explorerProps.selectedFolder,
          files: state.explorerProps.selectedFolder.files ? (
            state.explorerProps.selectedFolder.files
              .map((item) => item.id === data.id ? data : item)
              .sort((a, b) => compare(a.baseName, b.baseName))
          ) : []
        }
      }
    };
  },
  updateExplorerFolder: (state: State, payload: unknown) => {
    const data = payload as Folder | undefined;
    if (data == null) {
      return state;
    }
    if (state.explorerProps?.selectedFolder == null) {
      return state;
    }
    return {
      ...state,
      explorerProps: {
        ...state.explorerProps,
        selectedFolder: {
          ...state.explorerProps.selectedFolder,
          folders: state.explorerProps.selectedFolder.folders ? (
            state.explorerProps.selectedFolder.folders
              .map((item) => item.id === data.id ? data : item)
              .sort((a, b) => compare(a.name, b.name))
          ) : []
        }
      }
    };
  }
});

export const reducer = (storage: StorageService) => (state: State, action: Action): State => actions(storage)[action.type]?.(state, action.data) ?? state;
