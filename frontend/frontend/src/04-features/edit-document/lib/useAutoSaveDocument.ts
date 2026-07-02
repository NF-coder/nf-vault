import { useEffect } from "react";
import type { EditorState } from "prosemirror-state";
import { useDebounce } from "@/06-shared/lib/useDebounce";
import { saveDocument } from "@/06-shared/api";
import { getDocAsMarkdown } from "./getDocAsMarkdown";
import { useNotifyError } from "@/06-shared/lib/useNotifyError";

type props = {
  editorState: EditorState;
  documentId: number;
  debounceMs?: number;
}

export const useAutoSaveDocument = (
  {
    editorState,
    documentId,
    debounceMs = 1000,
  }: props 
) => {
  const debouncedEditorState = useDebounce(editorState, debounceMs);
  const showError = useNotifyError()

  useEffect(() => {
    const saveDoc = async () => {
      try {
        await saveDocument({
          content: getDocAsMarkdown(editorState),
          docId: documentId,
        });
      } catch (error) {
        showError(error);
      }
    };

    saveDoc();
  }, [debouncedEditorState, documentId]);
};
