//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { useEvent } from 'react-use';

import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

import { useStore } from '../../../../providers/StoreProvider';
import { useTheme } from '../../../../providers/ThemeProvider';
import { EventHandler } from '../../../../types/Event';
import {
  ScrollPosition,
  ScrollSize,
  ThemeName
} from '../../../../types/Model';

import Presenter from './MarkdownEditor.presenter';

interface MarkdownEditorProps {
  minimap?: boolean,
  position?: ScrollPosition,
  text?: string,
  wordWrap?: boolean,
  onChangeText?: EventHandler<string>,
  onMouseEnter?: EventHandler,
  onMouseLeave?: EventHandler,
  onResize?: EventHandler<ScrollSize>,
  onSave?: EventHandler,
  onScroll?: EventHandler<ScrollPosition>
}

function MarkdownEditor(props: Readonly<MarkdownEditorProps>) {

  const {
    minimap,
    position,
    text,
    wordWrap,
    onChangeText,
    onMouseEnter,
    onMouseLeave,
    onResize,
    onSave,
    onScroll
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
    monacoEl.onDidScrollChange((e) =>
      onScroll?.({}, {
        scrollLeft: e.scrollLeft,
        scrollTop: e.scrollTop
      }));
  }, [
    onScroll
  ]);

  React.useEffect(() => {
    const { current: monacoEl } = monacoRef;
    if (monacoEl == null) {
      return;
    }
    monacoEl.onDidChangeModelContent(() =>
      onChangeText?.({}, monacoEl.getValue()));
  }, [
    onChangeText
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
      scrollLeft: position?.scrollLeft ?? 0,
      scrollTop: position?.scrollTop ?? 0
    });
  }, [
    position
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
            'editor.selectionBackground': theme.colorNeutralBackground1Selected,
            'editor.lineHighlightBackground': theme.colorNeutralBackground1Hover,
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
            'editor.selectionBackground': theme.colorNeutralBackground1Selected,
            'editor.lineHighlightBackground': theme.colorNeutralBackground1Hover,
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
