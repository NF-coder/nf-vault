import styles from "./index.module.css";

import type { Transaction } from "prosemirror-state";
import { useEditor } from "../lib/prosemirror/useEditor";

import { topbarButtons } from "../config/topbar/Topbar";
import { EditorTitle } from "@/04-features/edit-title";
import EditorTopbar from "@/04-features/editor-toolbar/ui";
import { ProsemirrorEditor } from "@/04-features/edit-document";

const Editor = () => {
  const {editorState, isReadOnly, setReadOnly, executeCommand} = useEditor()
  const dispatchTransaction = (tr: Transaction) => executeCommand((state, dispatch) => dispatch(tr));

  return (
    <div className={styles.editorWrapper}>
      <EditorTitle readOnly={isReadOnly} />
      <EditorTopbar 
        state={editorState} 
        runCommand={executeCommand} 
        topbarButtons={topbarButtons}
        isReadOnly={isReadOnly}
        onToggleReadOnly={() => setReadOnly(!isReadOnly)}
      />
      <ProsemirrorEditor
        editorState={editorState} 
        dispatchTransaction={dispatchTransaction}
        readOnly={isReadOnly}
      />
    </div>
  )
}

export default Editor;
