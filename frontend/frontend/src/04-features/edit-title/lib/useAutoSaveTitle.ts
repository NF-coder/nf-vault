import { useEffect } from "react";
import { useDebounce } from "@/06-shared/lib/useDebounce";
import { saveDocumentTitle } from "@/06-shared/api";
import { useNotifyError } from "@/06-shared/lib/useNotifyError";


type props = {
  title: string;
  documentId: number;
  debounceMs?: number;
}

export const useAutoSaveTitle = ({
  title,
  documentId,
  debounceMs = 1000,
}: props) => {
  const debouncedEditorState = useDebounce(title, debounceMs);
  const showError = useNotifyError()

  useEffect(() => {
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
  }, [debouncedEditorState, documentId]);
};
