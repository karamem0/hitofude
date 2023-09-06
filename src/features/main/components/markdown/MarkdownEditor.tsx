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
import { Position, ThemeName } from '../../../../types/Model';

import Presenter from './MarkdownEditor.presenter';

interface MarkdownEditorProps {
  minimap?: boolean,
  position?: Position,
  text?: string,
  wordWrap?: boolean,
  onChangePosition?: EventHandler<Position>,
  onChangeText?: EventHandler<string>,
  onSave?: EventHandler
}

function MarkdownEditor(props: MarkdownEditorProps) {

  const {
    minimap,
    position,
    text,
    wordWrap,
    onChangePosition,
    onChangeText,
    onSave
  } = props;

  const {
    state: {
      tabMode
    }
  } = useStore();
  const { themeName } = useTheme();

  const editorRef = React.useRef<HTMLDivElement>(null);
  const monacoRef = React.useRef<monaco.editor.IStandaloneCodeEditor>();

  const handleResize = React.useCallback(() => {
    monacoRef.current?.layout({} as monaco.editor.IDimension);
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
        fontFamily: 'Consolas, Menlo, Monaco, Meiryo, monospace',
        language: 'markdown'
      });
    return () => {
      monacoRef.current?.dispose();
    };
  }, []);

  React.useEffect(() => {
    if (monacoRef.current == null) {
      return;
    }
    monacoRef.current.onDidScrollChange((e) => {
      onChangePosition?.({}, {
        left: e.scrollLeft,
        top: e.scrollTop
      });
    });
  }, [
    onChangePosition
  ]);

  React.useEffect(() => {
    if (monacoRef.current == null) {
      return;
    }
    monacoRef.current.onDidChangeModelContent(() => {
      onChangeText?.({}, monacoRef.current?.getValue());
    });
  }, [
    onChangeText
  ]);

  React.useEffect(() => {
    if (monacoRef.current == null) {
      return;
    }
    monacoRef.current.addCommand(
      monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS,
      () => onSave?.({})
    );
  }, [
    onSave
  ]);

  React.useEffect(() => {
    if (monacoRef.current == null) {
      return;
    }
    monacoRef.current.updateOptions({
      minimap: {
        enabled: minimap
      }
    });
  }, [
    minimap
  ]);

  React.useEffect(() => {
    if (monacoRef.current == null) {
      return;
    }
    monacoRef.current.setScrollPosition({
      scrollLeft: position?.left ?? 1,
      scrollTop: position?.top ?? 1
    });
  }, [
    position
  ]);

  React.useEffect(() => {
    if (monacoRef.current == null) {
      return;
    }
    monacoRef.current.setValue(text ?? '');
  }, [
    text
  ]);

  React.useEffect(() => {
    if (monacoRef.current == null) {
      return;
    }
    monacoRef.current.updateOptions({
      wordWrap: wordWrap ? 'on' : 'off'
    });
  }, [
    wordWrap
  ]);

  React.useEffect(() => {
    if (monacoRef.current == null) {
      return;
    }
    switch (themeName) {
      case ThemeName.light:
        monaco.editor.setTheme('vs');
        break;
      case ThemeName.dark:
        monaco.editor.setTheme('vs-dark');
        break;
      default:
        break;
    }
  }, [
    themeName
  ]);

  React.useEffect(() => {
    if (window.innerWidth >= 960) {
      handleResize();
    }
  }, [
    tabMode?.open,
    handleResize
  ]);

  useEvent('resize', handleResize, window);

  return (
    <Presenter ref={editorRef} />
  );

}

export default MarkdownEditor;
