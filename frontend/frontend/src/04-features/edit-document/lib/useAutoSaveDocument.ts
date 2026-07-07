import { useEffect, useRef } from "react";
import type { EditorState } from "prosemirror-state";
import { useDebounce } from "@/06-shared/lib/useDebounce";
import { saveDocument } from "@/06-shared/api";
import { getDocAsMarkdown } from "./getDocAsMarkdown";
import { useNotifyError } from "@/06-shared/lib/useNotifyError";

type props = {
  editorState: EditorState;
  documentId: number;
  debounceMs?: number;
  enabled?: boolean;
}

export const useAutoSaveDocument = (
  {
    editorState,
    documentId,
    debounceMs = 1000,
    enabled = true,
  }: props 
) => {
  const mdContent = getDocAsMarkdown(editorState)
  const debouncedEditorState = useDebounce(mdContent, debounceMs);
  const isInitialSaveSkipped = useRef(false);
  const showError = useNotifyError()

  useEffect(() => {
    if (!enabled) {
      isInitialSaveSkipped.current = false;
      return;
    }

    if (!isInitialSaveSkipped.current) {
      isInitialSaveSkipped.current = true;
      return;
    }

    const saveDoc = async () => {
      try {
        await saveDocument({
          content: mdContent,
          docId: documentId,
        });
      } catch (error) {
        showError(error);
      }
    };

    saveDoc();
  }, [debouncedEditorState, documentId, enabled]);
};
