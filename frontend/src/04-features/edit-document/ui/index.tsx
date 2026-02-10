import "prosemirror-view/style/prosemirror.css";
import styles from "./index.module.css";
import type { EditorState, Transaction } from "prosemirror-state";
import { ProseMirror, ProseMirrorDoc } from "@handlewithcare/react-prosemirror";

type Props = {
  editorState: EditorState;
  dispatchTransaction: (tr: Transaction) => void;
  readOnly?: boolean;
};

const ProsemirrorEditor = ({
  editorState,
  dispatchTransaction,
  readOnly = false,
}: Props) => {
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
