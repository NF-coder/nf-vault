import "prosemirror-view/style/prosemirror.css";
import styles from "./index.module.css";
import type { EditorState, Transaction } from "prosemirror-state";
import { ProseMirror, ProseMirrorDoc } from "@handlewithcare/react-prosemirror";
import { useAutoSaveDocument } from "../lib/useAutoSaveDocument";

type Props = {
  documentId: number
  editorState: EditorState;
  dispatchTransaction: (tr: Transaction) => void;
  readOnly?: boolean;
};

const ProsemirrorEditor = ({
  documentId,
  editorState,
  dispatchTransaction,
  readOnly = false,
}: Props) => {
  useAutoSaveDocument({editorState, documentId});

  return (
    <ProseMirror
      className={styles.editorTextarea}
      defaultState={editorState}
      dispatchTransaction={(tr) => dispatchTransaction(tr)}
      editable={() => !readOnly}
    >
      <ProseMirrorDoc />
    </ProseMirror>
  );
};

export default ProsemirrorEditor;
