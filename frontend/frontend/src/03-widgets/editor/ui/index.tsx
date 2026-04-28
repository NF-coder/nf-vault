import styles from "./index.module.css";

import type { Transaction } from "prosemirror-state";
import { useEditor } from "../lib/prosemirror/useEditor";

import { topbarButtons } from "../config/topbar/Topbar";
import { EditorTitle } from "@/04-features/edit-title";
import EditorTopbar from "@/04-features/editor-toolbar/ui";
import { ProsemirrorEditor } from "@/04-features/edit-document";

type props = {
  readonly documentId: number
}

const Editor = (
  {
    documentId
  }: props
) => {
  const {editorState, isReadOnly, setReadOnly, executeCommand} = useEditor()
  const dispatchTransaction = (tr: Transaction) => executeCommand((state, dispatch) => dispatch(tr));
  
  return (
    <div className={styles.editorWrapper}>
      <EditorTitle documentId={documentId} readOnly={isReadOnly} />
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
      />
    </div>
  )
}

export default Editor;
