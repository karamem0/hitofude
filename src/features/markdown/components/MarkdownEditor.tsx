//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { useEvent } from 'react-use';

import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

import { useStore } from '../../../providers/StoreProvider';
import { useTheme } from '../../../providers/ThemeProvider';
import { EventHandler } from '../../../types/Event';
import {
  CursorPosition,
  CursorSelection,
  ScrollPosition,
  ScrollSize,
  ThemeName
} from '../../../types/Model';

import Presenter from './MarkdownEditor.presenter';

interface MarkdownEditorProps {
  cursorPosition?: CursorPosition,
  cursorSelection?: CursorSelection,
  minimap?: boolean,
  scrollPosition?: ScrollPosition,
  text?: string,
  wordWrap?: boolean,
  onCursorPositionChange?: EventHandler<CursorPosition>,
  onCursorSelectionChange?: EventHandler<CursorSelection>,
  onMouseEnter?: EventHandler,
  onMouseLeave?: EventHandler,
  onResize?: EventHandler<ScrollSize>,
  onSave?: EventHandler,
  onScrollPositonChange?: EventHandler<ScrollPosition>,
  onTextChange?: EventHandler<string>
}

function MarkdownEditor(props: Readonly<MarkdownEditorProps>) {

  const {
    cursorPosition,
    cursorSelection,
    minimap,
    scrollPosition,
    text,
    wordWrap,
    onCursorPositionChange,
    onMouseEnter,
    onMouseLeave,
    onResize,
    onSave,
    onScrollPositonChange,
    onCursorSelectionChange,
    onTextChange
  } = props;

  const {
    state: {
      tabProps
    }
  } = useStore();
  const { theme, themeName } = useTheme();

  const editorRef = React.useRef<HTMLDivElement>(null);
  const monacoRef = React.useRef<monaco.editor.IStandaloneCodeEditor>();

  const handleResize = React.useCallback(() => {
    const { current: monacoEl } = monacoRef;
    if (monacoEl == null) {
      return;
    }
    monacoEl.layout({} as monaco.editor.IDimension);
  }, []);

  React.useEffect(() => {
    if (editorRef.current == null) {
      return;
    }
    monacoRef.current = monaco.editor.create(
      editorRef.current,
      {
        automaticLayout: true,
        contextmenu: false,
        fontFamily: 'SFMono-Regular, Consolas, Menlo, Monaco, Meiryo, monospace',
        language: 'markdown'
      });
    return () => monacoRef.current?.dispose();
  }, []);

  React.useEffect(() => {
    const { current: monacoEl } = monacoRef;
    if (monacoEl == null) {
      return;
    }
    monacoEl.onDidChangeCursorPosition((e) =>
      onCursorPositionChange?.({}, {
        cursorX: e.position.column,
        cursorY: e.position.lineNumber
      }));
  }, [
    onCursorPositionChange
  ]);

  React.useEffect(() => {
    const { current: monacoEl } = monacoRef;
    if (monacoEl == null) {
      return;
    }
    monacoEl.onDidChangeCursorSelection((e) =>
      onCursorSelectionChange?.({}, {
        endX: e.selection.endColumn,
        endY: e.selection.endLineNumber,
        startX: e.selection.startColumn,
        startY: e.selection.startLineNumber
      }));
  }, [
    onCursorSelectionChange
  ]);

  React.useEffect(() => {
    if (onMouseEnter == null) {
      return;
    }
    const { current: editorEl } = editorRef;
    if (editorEl == null) {
      return;
    }
    editorEl.addEventListener('mouseenter', onMouseEnter);
    return () => editorEl.removeEventListener('mouseenter', onMouseEnter);
  }, [
    onMouseEnter
  ]);

  React.useEffect(() => {
    if (onMouseLeave == null) {
      return;
    }
    const { current: editorEl } = editorRef;
    if (editorEl == null) {
      return;
    }
    editorEl.addEventListener('mouseleave', onMouseLeave);
    return () => editorEl.removeEventListener('mouseleave', onMouseLeave);
  }, [
    onMouseLeave
  ]);

  React.useEffect(() => {
    const { current: monacoEl } = monacoRef;
    if (monacoEl == null) {
      return;
    }
    const { current: editorEl } = editorRef;
    if (editorEl == null) {
      return;
    }
    monacoEl.onDidContentSizeChange(() =>
      onResize?.({}, {
        clientHeight: editorEl.clientHeight,
        clientWidth: editorEl.clientWidth,
        scrollHeight: monacoEl.getScrollHeight() - editorEl.clientHeight,
        scrollWidth: monacoEl.getScrollWidth()
      }));
    monacoEl.onDidLayoutChange(() =>
      onResize?.({}, {
        clientHeight: editorEl.clientHeight,
        clientWidth: editorEl.clientWidth,
        scrollHeight: monacoEl.getScrollHeight() - editorEl.clientHeight,
        scrollWidth: monacoEl.getScrollWidth()
      }));
  }, [
    onResize
  ]);

  React.useEffect(() => {
    const { current: monacoEl } = monacoRef;
    if (monacoEl == null) {
      return;
    }
    monacoEl.addCommand(
      monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS,
      () => onSave?.({})
    );
  }, [
    onSave
  ]);

  React.useEffect(() => {
    const { current: monacoEl } = monacoRef;
    if (monacoEl == null) {
      return;
    }
    monacoEl.onDidScrollChange((e) =>
      onScrollPositonChange?.({}, {
        scrollX: e.scrollLeft,
        scrollY: e.scrollTop
      }));
  }, [
    onScrollPositonChange
  ]);

  React.useEffect(() => {
    const { current: monacoEl } = monacoRef;
    if (monacoEl == null) {
      return;
    }
    monacoEl.onDidChangeModelContent(() =>
      onTextChange?.({}, monacoEl.getValue()));
  }, [
    onTextChange
  ]);

  React.useEffect(() => {
    const { current: monacoEl } = monacoRef;
    if (monacoEl == null) {
      return;
    }
    monacoEl.setPosition({
      column: cursorPosition?.cursorX ?? 1,
      lineNumber: cursorPosition?.cursorY ?? 1
    });
  }, [
    cursorPosition
  ]);

  React.useEffect(() => {
    const { current: monacoEl } = monacoRef;
    if (monacoEl == null) {
      return;
    }
    monacoEl.setSelection({
      endColumn: cursorSelection?.endX ?? 1,
      endLineNumber: cursorSelection?.endY ?? 1,
      startColumn: cursorSelection?.startX ?? 1,
      startLineNumber: cursorSelection?.startY ?? 1
    });
  }, [
    cursorSelection
  ]);

  React.useEffect(() => {
    const { current: monacoEl } = monacoRef;
    if (monacoEl == null) {
      return;
    }
    monacoEl.updateOptions({
      minimap: {
        enabled: minimap
      }
    });
  }, [
    minimap
  ]);

  React.useEffect(() => {
    const { current: monacoEl } = monacoRef;
    if (monacoEl == null) {
      return;
    }
    monacoEl.setScrollPosition({
      scrollLeft: scrollPosition?.scrollX ?? 0,
      scrollTop: scrollPosition?.scrollY ?? 0
    });
  }, [
    scrollPosition
  ]);

  React.useEffect(() => {
    const { current: monacoEl } = monacoRef;
    if (monacoEl == null) {
      return;
    }
    monacoEl.setValue(text ?? '');
  }, [
    text
  ]);

  React.useEffect(() => {
    const { current: monacoEl } = monacoRef;
    if (monacoEl == null) {
      return;
    }
    monacoEl.updateOptions({
      wordWrap: wordWrap ? 'on' : 'off'
    });
  }, [
    wordWrap
  ]);

  React.useEffect(() => {
    switch (themeName) {
      case ThemeName.light:
        monaco.editor.defineTheme('hitofude-light', {
          base: 'vs',
          inherit: true,
          rules: [],
          colors: {
            'editor.foreground': theme.colorNeutralForeground1,
            'editor.background': theme.colorNeutralBackground1,
            'editor.selectionBackground': theme.colorBrandBackground2Pressed,
            'editor.lineHighlightBackground': theme.colorBrandBackground2Hover,
            'editorCursor.foreground': theme.colorNeutralForeground2,
            'editorWhitespace.foreground': theme.colorNeutralBackground2
          }
        });
        monaco.editor.setTheme('hitofude-light');
        break;
      case ThemeName.dark:
        monaco.editor.defineTheme('hitofude-dark', {
          base: 'vs-dark',
          inherit: true,
          rules: [],
          colors: {
            'editor.foreground': theme.colorNeutralForeground1,
            'editor.background': theme.colorNeutralBackground1,
            'editor.selectionBackground': theme.colorBrandBackground2Pressed,
            'editor.lineHighlightBackground': theme.colorBrandBackground2Hover,
            'editorCursor.foreground': theme.colorNeutralForeground2,
            'editorWhitespace.foreground': theme.colorNeutralBackground2
          }
        });
        monaco.editor.setTheme('hitofude-dark');
        break;
      default:
        break;
    }
  }, [
    theme,
    themeName
  ]);

  React.useEffect(() => {
    if (window.innerWidth >= 960) {
      handleResize();
    }
  }, [
    tabProps?.open,
    handleResize
  ]);

  useEvent('resize', handleResize, window);

  return (
    <Presenter ref={editorRef} />
  );

}

export default MarkdownEditor;
