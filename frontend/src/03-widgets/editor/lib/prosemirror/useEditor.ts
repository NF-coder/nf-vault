import type { EditorState, Transaction } from "prosemirror-state";

import { useState } from "react";
import { createEditorState } from "./createEditorState";
import { schema } from "./config/constants";

export const useEditor = () => {
  const [editorState, setEditorState] = useState(() =>
    createEditorState(schema),
  );
  const [isReadOnly, setReadOnly] = useState(false);

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
    executeCommand,
    isReadOnly, 
    setReadOnly
  }
}