import styles from "./index.module.css";

import { useEffect, useState } from "react";

import { EditorTitle } from "@/04-features/edit-title";
import { MarkdownEditor } from "@/04-features/edit-document";
import { getDocument } from "@/06-shared/api";
import { useNotifyError } from "@/06-shared/lib/useNotifyError";
import { editorConfig } from "../lib/codemirror/config";

type props = {
  readonly documentId: number
}

const Editor = (
  {
    documentId
  }: props
) => {
  const [content, setContent] = useState("");
  const isReadOnly = false;
  const [title, setTitle] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const showError = useNotifyError();

  useEffect(() => {
    let isActive = true;

    const loadDocument = async () => {
      setIsLoaded(false);

      try {
        const document = await getDocument({ docId: documentId });
        if (!isActive) return;

        setContent(document.content);
        setTitle(document.title);
      } catch (error) {
        if (!isActive) return;

        showError(error);
      } finally {
        if (!isActive) return;

        setIsLoaded(true);
      }
    };

    loadDocument();

    return () => {
      isActive = false;
    };
  }, [documentId]);

  return (
    <div className={styles.editorWrapper}>
      <EditorTitle
        documentId={documentId}
        title={title}
        onChange={setTitle}
        readOnly={isReadOnly}
        autoSaveEnabled={isLoaded}
      />
      <MarkdownEditor
        documentId={documentId}
        content={content}
        onChange={setContent}
        config={editorConfig}
        readOnly={isReadOnly}
        autoSaveEnabled={isLoaded}
      />
    </div>
  )
}

export default Editor;
