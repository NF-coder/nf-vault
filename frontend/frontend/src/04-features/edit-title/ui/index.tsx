import { useAutoSaveDocument } from "@/04-features/edit-document/lib/useAutoSaveDocument"
import styles from "./index.module.css"
import { useAutoSaveTitle } from "../lib/useAutoSaveTitle"
import { useState } from "react"

type props = {
  documentId: number
  readOnly?: boolean
}

const EditorTitle = (
  {
    documentId,
    readOnly = false
  }: props
) => {
  const [title, setTitle] = useState<string>("");
  useAutoSaveTitle({title, documentId});

  return (
    <input
      placeholder="Title"
      className={styles.title}
      readOnly={readOnly}
      disabled={readOnly}
      onChange={(e) => setTitle(e.target.value)}
    ></input>
  );
}

export default EditorTitle;
