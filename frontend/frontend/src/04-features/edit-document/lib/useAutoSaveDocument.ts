import { useEffect } from "react";
import type { EditorState } from "prosemirror-state";
import { useDebounce } from "@/06-shared/lib/useDebounce";
import { saveDocument } from "@/06-shared/api";
import { getDocAsJsonString } from "./getDocAsJsonString";

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

  useEffect(() => {
    const saveDoc = async () => {
      try {
        await saveDocument({
          content: JSON.stringify(getDocAsJsonString(editorState)),
          docId: documentId,
        });
      } catch (error) {}
    };

    saveDoc();
  }, [debouncedEditorState, documentId]);
};
