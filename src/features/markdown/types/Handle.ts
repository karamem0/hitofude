//
// Copyright (c) 2023-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

export type MarkdownEditorCommand = () => void;

export interface MarkdownEditorHandle {
  bold: MarkdownEditorCommand,
  italic: MarkdownEditorCommand,
  underline: MarkdownEditorCommand
}
