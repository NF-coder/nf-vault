import { useEffect } from "react";
import type { EditorState } from "prosemirror-state";
import { useDebounce } from "@/06-shared/lib/useDebounce";
import { saveDocument } from "@/06-shared/api";
import { getDocAsJsonString } from "./getDocAsJsonString";
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
          content: JSON.stringify(getDocAsJsonString(editorState)),
          docId: documentId,
        });
      } catch (error) {
        showError(error);
      }
    };

    saveDoc();
  }, [debouncedEditorState, documentId]);
};
