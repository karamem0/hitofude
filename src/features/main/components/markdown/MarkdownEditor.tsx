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
import { EventHandler } from '../../../../types/Event';

import Presenter from './MarkdownEditor.presenter';

interface MarkdownEditorProps {
  value?: string,
  onChange?: EventHandler<string>
}

function MarkdownEditor(props: MarkdownEditorProps) {

  const {
    value,
    onChange
  } = props;

  const {
    state: {
      tabMode
    }
  } = useStore();

  const editorRef = React.useRef<HTMLDivElement>(null);
  const monacoRef = React.useRef<monaco.editor.IStandaloneCodeEditor>();

  const handleResize = React.useCallback(() => {
    monacoRef.current?.layout({} as monaco.editor.IDimension);
  }, []);

  useEvent('resize', handleResize, window);

  React.useEffect(() => {
    if (!editorRef.current) {
      return;
    }
    monacoRef.current = monaco.editor.create(
      editorRef.current,
      {
        automaticLayout: true,
        contextmenu: false,
        fontFamily: 'Consolas, Menlo, Monaco, Meiryo, monospace',
        language: 'markdown',
        minimap: {
          enabled: false
        },
        value
      });
    monacoRef.current.onDidChangeModelContent(() => {
      onChange?.({}, monacoRef.current?.getValue());
    });
    return () => {
      monacoRef.current?.dispose();
    };
  }, [
    value,
    onChange
  ]);

  React.useEffect(() => {
    if (window.innerWidth >= 960) {
      handleResize();
    }
  }, [
    handleResize,
    tabMode?.open
  ]);

  return (
    <Presenter ref={editorRef} />
  );

}

export default MarkdownEditor;
