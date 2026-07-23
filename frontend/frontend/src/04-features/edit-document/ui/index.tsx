import CodeMirror from "@uiw/react-codemirror";
import { markdown } from "@codemirror/lang-markdown";
import styles from "./index.module.css";
import { useAutoSaveDocument } from "../lib/useAutoSaveDocument";

const extensions = [markdown()];

type Props = {
  documentId: number;
  content: string;
  onChange: (content: string) => void;
  readOnly?: boolean;
  autoSaveEnabled?: boolean;
};

export const MarkdownEditor = ({
  documentId,
  content,
  onChange,
  readOnly = false,
  autoSaveEnabled = true,
}: Props) => {
  useAutoSaveDocument({ content, documentId, enabled: autoSaveEnabled });

  return (
    <CodeMirror
      className={styles.editorTextarea}
      value={content}
      extensions={extensions}
      onChange={onChange}
      readOnly={readOnly}
      editable={!readOnly}
      theme="dark"
      placeholder="Your text"
      basicSetup={{
        lineNumbers: false,
        foldGutter: false,
        highlightActiveLineGutter: false,
      }}
    />
  );
};
