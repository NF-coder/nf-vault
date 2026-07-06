import type { EditorState, Transaction } from "prosemirror-state";

import { useState } from "react";
import { createEditorState } from "./createEditorState";
import { schema } from "./config/constants";

export const useEditor = () => {
  const [editorState, setEditorState] = useState(() =>
    createEditorState(schema),
  );
  const [isReadOnly, setReadOnly] = useState(false);

  const setEditorContent = (content: string) => {
    setEditorState(createEditorState(schema, content));
  };

  const executeCommand = (
    cmd: (
      state: EditorState,
      dispatch: (tr: Transaction) => void
    ) => void
  ) => {
    if (isReadOnly) return;
    cmd(
      editorState,
      (tr: Transaction) => setEditorState((state) => state.apply(tr))
    );
  };

  return {
    editorState,
    setEditorContent,
    executeCommand,
    isReadOnly, 
    setReadOnly
  }
}