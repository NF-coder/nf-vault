import styles from "./index.module.css";

import type { Transaction } from "prosemirror-state";
import { useEffect, useState } from "react";
import { useEditor } from "../lib/prosemirror/useEditor";

import { topbarButtons } from "../config/topbar/Topbar";
import { EditorTitle } from "@/04-features/edit-title";
import EditorTopbar from "@/04-features/editor-toolbar/ui";
import { ProsemirrorEditor } from "@/04-features/edit-document";
import { getDocument } from "@/06-shared/api";
import { useNotifyError } from "@/06-shared/lib/useNotifyError";

type props = {
  readonly documentId: number
}

const Editor = (
  {
    documentId
  }: props
) => {
  const {editorState, setEditorContent, isReadOnly, setReadOnly, executeCommand} = useEditor()
  const [title, setTitle] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const showError = useNotifyError();

  useEffect(() => {
    const loadDocument = async () => {
      setIsLoaded(false);

      try {
        const document = await getDocument({ docId: documentId });
        setEditorContent(document.content);
        setTitle(document.title);
      } catch (error) {
        showError(error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadDocument();
  }, [documentId]);

  const dispatchTransaction = (tr: Transaction) => executeCommand((state, dispatch) => dispatch(tr));
  
  return (
    <div className={styles.editorWrapper}>
      <EditorTitle
        documentId={documentId}
        title={title}
        onChange={setTitle}
        readOnly={isReadOnly}
        autoSaveEnabled={isLoaded}
      />
      <EditorTopbar 
        state={editorState} 
        runCommand={executeCommand} 
        topbarButtons={topbarButtons}
        isReadOnly={isReadOnly}
        onToggleReadOnly={() => setReadOnly(!isReadOnly)}
      />
      <ProsemirrorEditor
        documentId={documentId}
        editorState={editorState} 
        dispatchTransaction={dispatchTransaction}
        readOnly={isReadOnly}
        autoSaveEnabled={isLoaded}
      />
    </div>
  )
}

export default Editor;
