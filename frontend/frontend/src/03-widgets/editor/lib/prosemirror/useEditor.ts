import type { EditorState, Transaction } from "prosemirror-state";

import { useState } from "react";
import { createDocFromMarkdown, createEditorState } from "./createEditorState";
import { schema } from "./config/constants";

export const useEditor = () => {
  const [editorState, setEditorState] = useState(() =>
    createEditorState(schema),
  );
  const [isReadOnly, setReadOnly] = useState(false);

  const setEditorContent = (content: string) => {
    setEditorState((state) => {
      const doc = createDocFromMarkdown(schema, content);
      const tr = state.tr
        .replaceWith(0, state.doc.content.size, doc.content)
        .setMeta("addToHistory", false);

      return state.apply(tr);
    });
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
