import { useEffect, useRef } from "react";
import { useDebounce } from "@/06-shared/lib/useDebounce";
import { saveDocumentTitle } from "@/06-shared/api";
import { useNotifyError } from "@/06-shared/lib/useNotifyError";


type props = {
  title: string;
  documentId: number;
  debounceMs?: number;
  enabled?: boolean;
}

export const useAutoSaveTitle = ({
  title,
  documentId,
  debounceMs = 1000,
  enabled = true,
}: props) => {
  const debouncedEditorState = useDebounce(title, debounceMs);
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

    const saveTitle = async () => {
      try {
        await saveDocumentTitle({
          title: title,
          docId: documentId,
        });
      } catch (error) {
        showError(error)
      }
    };

    saveTitle();
  }, [debouncedEditorState, documentId, enabled]);
};
