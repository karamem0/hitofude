//
// Copyright (c) 2023-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import {
  ScrollPosition,
  ScrollSize,
  ThemeName
} from '../../../types/Model';
import { EventHandler } from '../../../types/Event';
import { MarkdownEditorHandle } from '../types/Handle';
import Presenter from './MarkdownEditor.presenter';
import { useEvent } from 'react-use';
import { useStore } from '../../../providers/StoreProvider';
import { useTheme } from '../../../providers/ThemeProvider';

interface MarkdownEditorProps {
  className?: string,
  scrollPosition?: ScrollPosition,
  showMinimap?: boolean,
  showPreview?: boolean,
  text?: string,
  wordWrap?: boolean,
  onMouseEnter?: EventHandler,
  onMouseLeave?: EventHandler,
  onResize?: EventHandler<ScrollSize>,
  onSave?: EventHandler,
  onScrollPositonChange?: EventHandler<ScrollPosition>,
  onTextChange?: EventHandler<string>
}

function MarkdownEditor(props: Readonly<MarkdownEditorProps>, ref: React.Ref<MarkdownEditorHandle>) {

  const {
    className,
    scrollPosition,
    showMinimap,
    showPreview,
    text,
    wordWrap,
    onMouseEnter,
    onMouseLeave,
    onResize,
    onSave,
    onScrollPositonChange,
    onTextChange
  } = props;

  const {
    state: {
      tabProps
    }
  } = useStore();
  const {
    theme,
    themeName
  } = useTheme();
  const editorRef = React.useRef<HTMLDivElement>(null);
  const monacoRef = React.useRef<monaco.editor.IStandaloneCodeEditor>();

  const handleEditBold = React.useCallback(() => {
    const { current: monacoEl } = monacoRef;
    if (monacoEl == null) {
      return;
    }
    const model = monacoEl.getModel();
    if (model == null) {
      return;
    }
    const selection = monacoEl.getSelection();
    if (selection == null) {
      return;
    }
    const text = model.getValueInRange(selection);
    monacoEl.executeEdits('', [
      {
        range: selection,
        text: `**${text}**`
      }
    ]);
  }, []);

  const handleEditItalic = React.useCallback(() => {
    const { current: monacoEl } = monacoRef;
    if (monacoEl == null) {
      return;
    }
    const model = monacoEl.getModel();
    if (model == null) {
      return;
    }
    const selection = monacoEl.getSelection();
    if (selection == null) {
      return;
    }
    const text = model.getValueInRange(selection);
    monacoEl.executeEdits('', [
      {
        range: selection,
        text: `*${text}*`
      }
    ]);
  }, []);

  const handleEditUnderline = React.useCallback(() => {
    const { current: monacoEl } = monacoRef;
    if (monacoEl == null) {
      return;
    }
    const model = monacoEl.getModel();
    if (model == null) {
      return;
    }
    const selection = monacoEl.getSelection();
    if (selection == null) {
      return;
    }
    const text = model.getValueInRange(selection);
    monacoEl.executeEdits('', [
      {
        range: selection,
        text: `<u>${text}</u>`
      }
    ]);
  }, []);

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
    monacoEl.onDidScrollChange((event) =>
      onScrollPositonChange?.({}, {
        scrollX: event.scrollLeft,
        scrollY: event.scrollTop
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
    monacoEl.updateOptions({
      minimap: {
        enabled: showMinimap
      }
    });
  }, [
    showMinimap
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
        monaco.editor.setTheme('vs');
        break;
      case ThemeName.dark:
        monaco.editor.setTheme('vs-dark');
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

  React.useImperativeHandle(ref, () => {
    return {
      bold: handleEditBold,
      italic: handleEditItalic,
      underline: handleEditUnderline
    };
  }, [
    handleEditBold,
    handleEditItalic,
    handleEditUnderline
  ]);

  useEvent('resize', handleResize, window);

  return (
    <Presenter
      ref={editorRef}
      className={className}
      preview={showPreview}
      tabOpen={tabProps?.open} />
  );

}

export default React.forwardRef(MarkdownEditor);
