//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import { File, Folder } from '../types/Model';
import {
  Action,
  ActionType,
  State
} from '../types/Store';
import { compare } from '../utils/String';

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.appendFile: {
      const payload = action.payload as File | undefined;
      if (!payload) {
        return state;
      }
      if (!state.workFolder) {
        return state;
      }
      return {
        ...state,
        workFolder: {
          ...state.workFolder,
          files: state.workFolder.files ? (
            [ ...state.workFolder.files, payload ].sort((a, b) => compare(a.name, b.name))
          ) : (
            [ payload ]
          )
        }
      };
    }
    case ActionType.appendFolder: {
      const payload = action.payload as Folder | undefined;
      if (!payload) {
        return state;
      }
      if (!state.workFolder) {
        return state;
      }
      return {
        ...state,
        workFolder: {
          ...state.workFolder,
          folders: state.workFolder.folders ? (
            [ ...state.workFolder.folders, payload ].sort((a, b) => compare(a.name, b.name))
          ) : (
            [ payload ]
          )
        }
      };
    }
    case ActionType.deleteFile: {
      const payload = action.payload as File | undefined;
      if (!payload) {
        return state;
      }
      if (!state.workFolder) {
        return state;
      }
      return {
        ...state,
        workFolder: {
          ...state.workFolder,
          files: state.workFolder.files?.filter((item) => item.id !== payload.id)
        }
      };
    }
    case ActionType.deleteFolder: {
      const payload = action.payload as Folder | undefined;
      if (!payload) {
        return state;
      }
      if (!state.workFolder) {
        return state;
      }
      return {
        ...state,
        workFolder: {
          ...state.workFolder,
          folders: state.workFolder.folders?.filter((item) => item.id !== payload.id)
        }
      };
    }
    case ActionType.setEditMode: {
      const payload = action.payload as boolean | undefined;
      if (!state.workFile) {
        return state;
      }
      return {
        ...state,
        workFile: {
          ...state.workFile,
          editMode: payload
        }
      };
    }
    case ActionType.setTabMode: {
      const payload = action.payload as boolean | undefined;
      return {
        ...state,
        tabMode: payload
      };
    }
    case ActionType.setWorkFile: {
      const payload = action.payload as File | undefined;
      return {
        ...state,
        workFile: payload
      };
    }
    case ActionType.setWorkFolder: {
      const payload = action.payload as Folder | undefined;
      return {
        ...state,
        workFolder: payload
      };
    }
    case ActionType.updateFile: {
      const payload = action.payload as File | undefined;
      if (!payload) {
        return state;
      }
      if (!state.workFolder) {
        return state;
      }
      return {
        ...state,
        workFolder: {
          ...state.workFolder,
          files: state.workFolder.files ? (
            state.workFolder.files
              .map((item) => item.id === payload.id ? payload : item)
              .sort((a, b) => compare(a.name, b.name))
          ) : []
        }
      };
    }
    case ActionType.updateFolder: {
      const payload = action.payload as Folder | undefined;
      if (!payload) {
        return state;
      }
      if (!state.workFolder) {
        return state;
      }
      return {
        ...state,
        workFolder: {
          ...state.workFolder,
          folders: state.workFolder.folders ? (
            state.workFolder.folders
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
